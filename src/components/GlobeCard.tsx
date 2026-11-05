import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "../data";
import type { Theme } from "./Navbar";

type Visitor = { city: string; lat: number; lng: number };
type Place = Visitor & { count: number };
type Marker = Visitor & { kind: "home" | "you" | "visit" };
const keyOf = (m: Marker) => `${m.kind}-${m.city.toLowerCase()}`;

// Land/ocean mask (white = water), from NASA imagery via three-globe, served by jsDelivr with CORS.
const WATER_MASK = "https://cdn.jsdelivr.net/npm/three-globe@2.31.0/example/img/earth-water.png";
const RADIUS = 0.86;
const LABEL_EVERY_MS = 2400; // the city label hops to the next pin facing us

const GRADIENTS = [
  ["#f59e0b", "#ef4444"],
  ["#8b5cf6", "#ec4899"],
  ["#06b6d4", "#3b82f6"],
  ["#10b981", "#84cc16"],
  ["#f43f5e", "#c2185b"],
];
const gradientFor = (city: string) => {
  const [a, b] = GRADIENTS[[...city].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % GRADIENTS.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
}; // sphere radius as a share of the canvas half-width; the rest is the soft halo

const weatherWords = (code: number) =>
  code === 0 ? "clear" :
  code <= 3 ? "partly cloudy" :
  code <= 48 ? "foggy" :
  code <= 57 ? "drizzling" :
  code <= 67 ? "raining" :
  code <= 77 ? "snowing" :
  code <= 82 ? "showery" :
  code <= 86 ? "snowy" :
  "stormy";

/** Great-circle distance in km. */
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lng - a.lng) * r) / 2) ** 2;
  return Math.round(6371 * 2 * Math.asin(Math.sqrt(h)));
}

const VERTEX = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

// Ray-casts an orthographic sphere per pixel and draws land as a grid of dots (light: ink on a white
// sphere, dark: white on a black one). The view is n = Rx(tilt) * Ry(phi) * g; we undo it per pixel.
const FRAGMENT = `
precision highp float;
uniform sampler2D tex;
uniform vec2 res;
uniform float phi, tilt, dark;
const float PI = 3.14159265;
const float STEP = 0.028; // ~1.6 degrees between dots
void main() {
  vec2 q = ((gl_FragCoord.xy / res) * 2.0 - 1.0) / ${RADIUS.toFixed(2)};
  float r = length(q);
  float aa = 2.5 / (res.x * ${RADIUS.toFixed(2)});
  vec3 haloCol = vec3(dark);
  float halo = pow(smoothstep(1.12, 1.0, r), 2.0) * mix(0.07, 0.14, dark);
  if (r > 1.0 + aa) { gl_FragColor = vec4(haloCol * halo, halo); return; }
  vec3 n = vec3(q, sqrt(max(0.0, 1.0 - r * r)));
  float y = n.y * cos(tilt) + n.z * sin(tilt);
  float z = -n.y * sin(tilt) + n.z * cos(tilt);
  float x = n.x * cos(phi) - z * sin(phi);
  z = n.x * sin(phi) + z * cos(phi);
  float lat = asin(clamp(y, -1.0, 1.0));
  float lng = atan(x, z);

  // Nearest dot: rows of equal latitude, fewer dots per row towards the poles.
  float rlat = floor(lat / STEP + 0.5) * STEP;
  float cstep = 2.0 * PI / max(1.0, floor(2.0 * PI * cos(rlat) / STEP));
  float clng = floor(lng / cstep + 0.5) * cstep;
  float dist = length(vec2((lng - clng) * cos(lat), lat - rlat)) / STEP;
  float land = step(texture2D(tex, vec2(fract(clng / (2.0 * PI) + 0.5), 0.5 - rlat / PI)).r, 0.5);
  float dotMask = smoothstep(0.34, 0.22, dist) * land * smoothstep(0.0, 0.3, n.z);

  float light = max(dot(n, normalize(vec3(-0.4, 0.5, 0.8))), 0.0);
  vec3 base = mix(vec3(0.985, 0.985, 0.975) * (0.9 + 0.1 * light) * mix(1.0, 0.9, pow(1.0 - n.z, 3.0)), vec3(0.05), dark);
  vec3 col = mix(base, mix(vec3(0.09), vec3(0.92), dark), dotMask * 0.9);
  col += vec3(pow(1.0 - n.z, 4.0) * 0.14 * dark);
  float a = smoothstep(1.0 + aa, 1.0 - aa, r);
  gl_FragColor = vec4(col * a + haloCol * halo * (1.0 - a), max(a, halo));
}`;

function compile(gl: WebGLRenderingContext) {
  const program = gl.createProgram()!;
  for (const [type, src] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  return program;
}

/** Where a lat/lng lands on screen (-1..1, y up) and how much it faces us (z). Same rotation as the shader. */
function project(lat: number, lng: number, phi: number, tilt: number) {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  const gx = Math.cos(la) * Math.sin(lo);
  const gy = Math.sin(la);
  const gz = Math.cos(la) * Math.cos(lo);
  const x = gx * Math.cos(phi) + gz * Math.sin(phi);
  const z1 = -gx * Math.sin(phi) + gz * Math.cos(phi);
  return { x, y: gy * Math.cos(tilt) - z1 * Math.sin(tilt), z: gy * Math.sin(tilt) + z1 * Math.cos(tilt) };
}

function Globe({ theme, markers, center }: { theme: Theme; markers: Marker[]; center: Visitor | null }) {
  // The visitor's own pin pulses; without one, Manas does.
  const pulseKind = markers.some((m) => m.kind === "you") ? "you" : "home";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markersRef = useRef(markers);
  markersRef.current = markers;
  const view = useRef({ phi: 0, tilt: 0.5 });
  const drag = useRef<{ x: number; y: number; phi: number; tilt: number } | null>(null);
  // Labels and facing are tracked by city key, not list index: the list reorders when the visitor's city loads.
  const facing = useRef<Record<string, boolean>>({});
  const [active, setActive] = useState<string | null>(null);
  // Pins drop in once the globe is drawn and on screen; before that they'd animate unseen.
  const boxRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const shown = loaded && inView;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((current) => {
        const keys = markersRef.current.map(keyOf);
        const from = current ? keys.indexOf(current) : -1;
        for (let k = 1; k <= keys.length; k++) {
          const key = keys[(from + k + keys.length) % keys.length];
          if (facing.current[key]) return key;
        }
        return null;
      });
    }, LABEL_EVERY_MS);
    return () => clearInterval(id);
  }, []);

  // Turn the globe to face the visitor and Manas once we know where the visitor is.
  useEffect(() => {
    const lat = center ? (center.lat + site.coords.lat) / 2 : site.coords.lat;
    const lng = center ? (center.lng + site.coords.lng) / 2 : site.coords.lng;
    view.current = { phi: (-lng * Math.PI) / 180, tilt: Math.min(Math.max((lat * Math.PI) / 180, 0), 0.7) };
  }, [center]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: true });
    if (!canvas || !gl) return;
    const program = compile(gl);
    const u = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform1f(u("dark"), theme === "dark" ? 1 : 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const texture = gl.createTexture();
    let ready = false;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      // NPOT textures in WebGL1 need clamping and no mipmaps.
      for (const [k, v] of [
        [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
        [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE],
        [gl.TEXTURE_MIN_FILTER, gl.LINEAR],
        [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
      ])
        gl.texParameteri(gl.TEXTURE_2D, k, v);
      ready = true;
      canvas.style.opacity = "1";
      setLoaded(true);
    };
    image.src = WATER_MASK;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      const size = canvas.offsetWidth;
      const px = Math.round(size * Math.min(window.devicePixelRatio || 1, 2));
      if (canvas.width !== px) canvas.width = canvas.height = px;
      const v = view.current;
      if (!drag.current && !reduceMotion) v.phi += 0.0015;

      if (ready) {
        gl.viewport(0, 0, px, px);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(u("res"), px, px);
        gl.uniform1f(u("phi"), v.phi);
        gl.uniform1f(u("tilt"), v.tilt);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      const half = size / 2;
      markersRef.current.forEach((m, i) => {
        const el = pinRefs.current[i];
        if (!el) return;
        const p = project(m.lat, m.lng, v.phi, v.tilt);
        facing.current[keyOf(m)] = p.z > 0.3;
        el.style.transform = `translate(${half + p.x * RADIUS * half}px, ${half - p.y * RADIUS * half}px)`;
        el.style.opacity = ready ? String(Math.min(Math.max((p.z - 0.05) * 6, 0), 1)) : "0";
      });
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      image.onload = null;
      // No loseContext(): getContext() hands back the same (dead) context when the effect re-runs.
    };
  }, [theme]);

  return (
    <div ref={boxRef} className="relative w-full max-w-[340px] aspect-square mx-auto">
      <canvas
        ref={canvasRef}
        aria-label="Globe showing the cities people have viewed this portfolio from"
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none opacity-0 transition-opacity duration-700"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, ...view.current };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          view.current.phi = d.phi + (e.clientX - d.x) / 150;
          view.current.tilt = Math.min(Math.max(d.tilt + (e.clientY - d.y) / 150, -0.6), 1.1);
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      />
      {markers.map((m, i) => (
        <div
          key={keyOf(m)}
          ref={(el) => {
            pinRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 opacity-0 transition-opacity duration-300"
          style={{ zIndex: keyOf(m) === active ? 30 : m.kind === "home" ? 20 : 10 }}
        >
          {/* Teardrop pin with its tip on the city; its label shows in turn, or on hover. */}
          <div
            className={`group relative -translate-x-1/2 -translate-y-full pointer-events-auto ${shown ? "pin-drop" : "opacity-0"}`}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {m.kind === pulseKind && (
              <span className="absolute left-1/2 bottom-0 -ml-2 -mb-2 w-4 h-4 rounded-full bg-[#c2185b]/35 animate-ping" />
            )}
            <span
              className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#1C1C1E] py-1 pl-1 pr-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-all duration-300 ${
                keyOf(m) === active
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-1 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
              }`}
            >
              <span className="w-5 h-5 rounded-full" style={{ backgroundImage: gradientFor(m.city) }} />
              <span className="text-[11px] font-medium lowercase text-gray-900 dark:text-white">{m.city}</span>
              <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full bg-[#151515] dark:bg-white text-white dark:text-black">
                <ChevronRight size={10} strokeWidth={3} />
              </span>
            </span>
            <svg width="13" height="17" viewBox="0 0 13 17" aria-hidden="true" className="relative block drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              <path
                d="M6.5 16.5C6.5 16.5 0.5 10.6 0.5 6.5a6 6 0 0 1 12 0c0 4.1-6 10-6 10Z"
                className={m.kind === "home" ? "fill-[#c2185b]" : "fill-[#151515] dark:fill-[#F2F2F0]"}
              />
              <circle cx="6.5" cy="6.4" r="2.2" className={m.kind === "home" ? "fill-white" : "fill-[#e879a3]"} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

// Lines of text fade up one after another; the spin arrow then draws itself.
const rise = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
});
const draw = (i: number) => ({
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: i ? 0.25 : 0.7, delay: 0.75 + i * 0.7, ease: "easeInOut" as const },
});

const sameCity = (a: Visitor, b: Visitor) => a.city.toLowerCase() === b.city.toLowerCase();

export default function GlobeCard({ theme }: { theme: Theme }) {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d.latitude === "number" && d.city)
          setVisitor({ city: d.city, lat: d.latitude, lng: d.longitude });
      })
      .catch(() => {});
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${site.coords.lat}&longitude=${site.coords.lng}&current=temperature_2m,weather_code&timezone=auto`,
    )
      .then((r) => r.json())
      .then((d) => {
        const c = d?.current;
        if (!cancelled && c && typeof c.temperature_2m === "number")
          setWeather(`${Math.round(c.temperature_2m)}°C and ${weatherWords(c.weather_code)}`);
      })
      .catch(() => {});
    // Count this visit once per browser session; the server reads the city from Vercel's geo headers.
    let counted = false;
    try {
      counted = sessionStorage.getItem("globe-visit-counted") === "1";
    } catch {
      // storage blocked: just read the list
    }
    fetch("/api/visits", { method: counted ? "GET" : "POST" })
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (cancelled || !Array.isArray(list)) return;
        setPlaces(list);
        try {
          sessionStorage.setItem("globe-visit-counted", "1");
        } catch {
          // ignore
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const home: Visitor = { city: "Manas", ...site.coords };
  // Fixed pins plus live visitor cities, each city once, never doubling Manas or the visitor's own pin.
  const visits = [...site.globePins, ...places].filter(
    (p, i, all) => !sameCity(p, home) && !(visitor && sameCity(p, visitor)) && all.findIndex((q) => sameCity(q, p)) === i,
  );
  const markers: Marker[] = [
    ...visits.map((p) => ({ ...p, kind: "visit" as const })),
    // A visitor right next to Manas (e.g. Osh) would sit on top of its pin, so Manas stands in for both.
    ...(visitor && distanceKm(visitor, home) > 80 ? [{ ...visitor, kind: "you" as const }] : []),
    { ...home, kind: "home" },
  ];

  const km = visitor ? distanceKm(visitor, site.coords) : null;
  const strong = "font-semibold text-gray-900 dark:text-white";

  return (
    <div className="dashed-border-anim rounded-2xl w-full">
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 md:p-8 grid md:grid-cols-[1fr_300px] items-center gap-6 md:gap-8 transition-colors duration-150 overflow-hidden">
        <div className="space-y-4 font-instrument-sans text-base md:text-[17px] text-gray-700 dark:text-white/60 leading-relaxed">
          <motion.p {...rise(0)}>
            You are reading this from {visitor ? <>somewhere near <span className={strong}>{visitor.city}</span></> : "somewhere out there"}.
          </motion.p>
          <motion.p {...rise(1)}>
            I am in <span className={strong}>Manas</span>
            {weather ? (
              <>
                , where it is <span className={strong}>{weather}</span>
              </>
            ) : null}
            .{" "}
            {km !== null && km > 50 ? (
              <>
                That's <span className="font-semibold text-[#c2185b]">{km.toLocaleString()} km</span> apart. Small world.
              </>
            ) : (
              "Small world."
            )}
          </motion.p>
          {places.length > 0 && (
            <motion.p {...rise(2)} className="text-sm">
              People have dropped by from <span className={strong}>{places.length}</span>{" "}
              {places.length === 1 ? "city" : "cities"} so far.
            </motion.p>
          )}
          <motion.p {...rise(3)} className="flex items-center gap-2 pt-1">
            <span className="font-signature text-2xl text-[#c2185b] dark:text-[#e879a3]">give it a spin</span>
            {/* Curls right toward the globe on desktop, down toward it on phones. */}
            <svg width="56" height="28" viewBox="0 0 56 28" fill="none" className="text-[#c2185b] dark:text-[#e879a3] hidden md:block">
              <motion.path {...draw(0)} d="M2 18 C 14 4, 32 2, 52 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <motion.path {...draw(1)} d="M44 9 L 52.5 14 L 45 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-[#c2185b] dark:text-[#e879a3] md:hidden">
              <motion.path {...draw(0)} d="M4 2 C 18 8, 18 20, 12 29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <motion.path {...draw(1)} d="M6.5 23.5 L 12 29.5 L 17.5 24.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.p>
        </div>
        <Globe theme={theme} markers={markers} center={visitor} />
      </div>
    </div>
  );
}

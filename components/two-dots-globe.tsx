"use client";

import { useEffect, useRef } from "react";
import { LAND_W, LAND_H, LAND_GRID } from "@/lib/globe-land";

export type GlobePin = { lat: number; lon: number };

const BISHKEK: GlobePin = { lat: 42.8746, lon: 74.5698 };
const BISHKEK_THEME = { body: "#211d18", accent: "#b45414" };
const VISITOR_THEME = { body: "#8f1d1d", accent: "#c2502e" };

const hexA = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
};

// Precomputed unit-sphere points for every land cell.
let LAND_POINTS: Float32Array | null = null;
function getLandPoints(): Float32Array {
  if (LAND_POINTS) return LAND_POINTS;
  const pts: number[] = [];
  for (let y = 0; y < LAND_H; y++) {
    const lat = 90 - ((y + 0.5) * 180) / LAND_H;
    const la = (lat * Math.PI) / 180;
    for (let x = 0; x < LAND_W; x++) {
      if (LAND_GRID[y * LAND_W + x] !== "1") continue;
      const lon = ((x + 0.5) * 360) / LAND_W - 180;
      const lo = (lon * Math.PI) / 180;
      pts.push(
        Math.cos(la) * Math.cos(lo),
        Math.sin(la),
        Math.cos(la) * Math.sin(lo)
      );
    }
  }
  LAND_POINTS = new Float32Array(pts);
  return LAND_POINTS;
}

function pinVec(pin: GlobePin): [number, number, number] {
  const la = (pin.lat * Math.PI) / 180;
  const lo = (pin.lon * Math.PI) / 180;
  return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
}

export function TwoDotsGlobe({
  visitor,
  visitorCity,
}: {
  visitor: GlobePin | null;
  visitorCity: string | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visitorRef = useRef<GlobePin | null>(visitor);
  visitorRef.current = visitor;
  const visitorCityRef = useRef<string | null>(visitorCity);
  visitorCityRef.current = visitorCity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = getLandPoints();
    const bishkek = pinVec(BISHKEK);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let rotY = 6.0; // start with Bishkek facing front
    let tilt = 0.42;
    let velY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastInteract = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const R = Math.min(w, h) / 2;
      rotY += (dx / R) * 1.4;
      tilt = Math.max(-1.1, Math.min(1.1, tilt + (dy / R) * 1.4));
      velY = (dx / R) * 1.4;
      lastInteract = performance.now();
    };
    const onUp = () => {
      dragging = false;
      lastInteract = performance.now();
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "pan-y";

    // Rotate a unit vector: first around Y by rotY, then tilt around X.
    const project = (
      x: number,
      y: number,
      z: number,
      out: { sx: number; sy: number; depth: number }
    ) => {
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const cx = Math.cos(tilt);
      const sx2 = Math.sin(tilt);
      const y2 = y * cx - z1 * sx2;
      const z2 = y * sx2 + z1 * cx;
      const R = Math.min(w, h) / 2;
      out.sx = w / 2 + x1 * R;
      out.sy = h / 2 - y2 * R;
      out.depth = z2;
    };

    const p = { sx: 0, sy: 0, depth: 0 };

    const drawLabel = (
      text: string,
      x: number,
      y: number,
      s: number,
      accent: string
    ) => {
      const fs = Math.max(10, 12 * s);
      ctx.font = `600 ${fs}px "DM Sans", system-ui, sans-serif`;
      const tw = ctx.measureText(text).width;
      const dotR = 3.2 * s;
      const gap = 6 * s;
      const padX = 10 * s;
      const lh = 22 * s;
      const contentW = dotR * 2 + gap + tw;
      const bx = x - contentW / 2 - padX;
      const by = y - lh;
      ctx.beginPath();
      ctx.roundRect(bx, by, contentW + padX * 2, lh, lh / 2);
      ctx.fillStyle = "rgba(255,255,255,0.94)";
      ctx.fill();
      ctx.strokeStyle = "rgba(60,55,45,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bx + padX + dotR, by + lh / 2, dotR, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
      ctx.fillStyle = "#2b2721";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(text, bx + padX + dotR * 2 + gap, by + lh / 2 + 1);
    };

    const drawPin = (
      pin: [number, number, number],
      t: number,
      label: string | null,
      phase: number,
      theme: { body: string; accent: string }
    ) => {
      project(pin[0], pin[1], pin[2], p);
      // smooth fade near the limb: invisible at the edge, solid once in frame
      const a = Math.max(0, Math.min(1, (p.depth - 0.02) / 0.3));
      if (a <= 0.01) return;
      const R = Math.min(w, h) / 2;
      const s = R / 260; // global scale
      const bob = Math.sin(t / 550 + phase) * 3 * s;

      ctx.save();
      ctx.globalAlpha = a;

      // expanding pulse rings on the surface
      for (let k = 0; k < 2; k++) {
        const pulse = (((t / 1900 + phase * 0.13 + k * 0.5) % 1) + 1) % 1;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, (4 + pulse * 15) * s, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(theme.accent, 0.45 * (1 - pulse));
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // anchor dot
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 3.2 * s, 0, Math.PI * 2);
      ctx.fillStyle = theme.accent;
      ctx.fill();

      // teardrop pin, gently bobbing above the anchor
      const ph = 20 * s;
      const pw = 13 * s;
      const topY = p.sy - ph + bob;
      ctx.save();
      ctx.shadowColor = "rgba(30,25,20,0.28)";
      ctx.shadowBlur = 8 * s;
      ctx.shadowOffsetY = 3 * s;
      ctx.beginPath();
      ctx.moveTo(p.sx, p.sy);
      ctx.bezierCurveTo(p.sx - pw, topY + ph * 0.45, p.sx - pw * 0.72, topY, p.sx, topY);
      ctx.bezierCurveTo(p.sx + pw * 0.72, topY, p.sx + pw, topY + ph * 0.45, p.sx, p.sy);
      ctx.closePath();
      ctx.fillStyle = theme.body;
      ctx.fill();
      ctx.restore();
      // pin hole
      ctx.beginPath();
      ctx.arc(p.sx, topY + pw * 0.52, 3.4 * s, 0, Math.PI * 2);
      ctx.fillStyle = "#f5f2ec";
      ctx.fill();

      // label fades in and drifts up as the pin comes into frame
      if (label) drawLabel(label, p.sx, topY - 8 * s + (1 - a) * 10 * s, s, theme.accent);

      ctx.restore();
    };

    const frame = (t: number) => {
      if (!dragging) {
        if (Math.abs(velY) > 0.0004) {
          rotY += velY;
          velY *= 0.95;
          lastInteract = t;
        } else if (!reduceMotion && t - lastInteract > 2500) {
          rotY += 0.0022; // idle auto-spin
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) / 2;
      const dotR = Math.max(1, R / 300);

      // soft sphere shading
      const g = ctx.createRadialGradient(
        w / 2 - R * 0.25,
        h / 2 - R * 0.3,
        R * 0.1,
        w / 2,
        h / 2,
        R
      );
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.68, "#f6f4ee");
      g.addColorStop(1, "#e2ddd0");
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, R * 0.995, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // dotted landmasses
      const n = points.length / 3;
      for (let i = 0; i < n; i++) {
        project(points[i * 3], points[i * 3 + 1], points[i * 3 + 2], p);
        if (p.depth < -0.12) continue;
        const zn = (p.depth + 1) / 2; // 0 back … 1 front
        const alpha = 0.16 + 0.84 * Math.pow(zn, 1.4);
        const r = dotR * (0.55 + 0.6 * zn);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(32, 29, 25, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // curved rim shadow so the sphere bends into the page
      const rim = ctx.createRadialGradient(
        w / 2,
        h / 2,
        R * 0.72,
        w / 2,
        h / 2,
        R * 0.995
      );
      rim.addColorStop(0, "rgba(70,63,50,0)");
      rim.addColorStop(1, "rgba(70,63,50,0.18)");
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, R * 0.995, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      // pins
      drawPin(bishkek, t, "bishkek", 0, BISHKEK_THEME);
      const v = visitorRef.current;
      if (v) drawPin(pinVec(v), t, visitorCityRef.current, 2.4, VISITOR_THEME);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="relative mx-auto my-6 aspect-square w-full max-w-[420px] select-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full [filter:drop-shadow(0_24px_48px_rgba(60,55,45,0.14))]"
        aria-label="Spinning dotted globe showing Bishkek and your location"
        role="img"
      />
    </div>
  );
}

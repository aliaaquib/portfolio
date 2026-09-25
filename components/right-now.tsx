"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { TwoDotsGlobe, type GlobePin } from "@/components/two-dots-globe";

const BISHKEK = { lat: 42.8746, lon: 74.5698 };

type Visitor = { city: string; pin: GlobePin; temp: number | null };

async function fetchJSON(url: string, ms = 8000): Promise<any> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function fetchTemp(lat: number, lon: number): Promise<number | null> {
  try {
    const w = await fetchJSON(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2`
    );
    const t = w?.current?.temperature_2;
    return typeof t === "number" ? Math.round(t) : null;
  } catch {
    return null;
  }
}

async function locateVisitor(): Promise<Visitor | null> {
  let city: string | null = null;
  let lat: number | null = null;
  let lon: number | null = null;
  try {
    const loc = await fetchJSON("https://ipapi.co/json/");
    if (loc?.city && typeof loc.latitude === "number") {
      city = loc.city;
      lat = loc.latitude;
      lon = loc.longitude;
    }
  } catch {
    /* fall through to backup */
  }
  if (!city) {
    try {
      const loc = await fetchJSON("https://ipwho.is/");
      if (loc?.success && loc?.city && typeof loc.latitude === "number") {
        city = loc.city;
        lat = loc.latitude;
        lon = loc.longitude;
      }
    } catch {
      /* give up quietly */
    }
  }
  if (!city || lat == null || lon == null) return null;
  const temp = await fetchTemp(lat, lon);
  return { city: city.toLowerCase(), pin: { lat, lon }, temp };
}

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-strong">{children}</strong>
  );
}

function LoadingDots() {
  return <span className="animate-pulse text-muted">…</span>;
}

export function RightNow() {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [visitorDone, setVisitorDone] = useState(false);
  const [bishkekTemp, setBishkekTemp] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetchTemp(BISHKEK.lat, BISHKEK.lon).then((t) => {
      if (alive) setBishkekTemp(t);
    });
    locateVisitor().then((v) => {
      if (!alive) return;
      setVisitor(v);
      setVisitorDone(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="pb-24">
      <Reveal>
        <h2 className="font-display text-4xl tracking-tight text-strong sm:text-[44px]">
          <span aria-hidden="true" className="section-tick" />
          Two dots on a globe
        </h2>
      </Reveal>
      <div className="mt-8 grid items-center gap-12 md:grid-cols-2 md:gap-12">
        <Reveal>
          <div className="max-w-md space-y-6 text-[17px] leading-relaxed text-muted">
            <p>
              you are reading this from{" "}
              {visitor ? (
                <>
                  somewhere near <Strong>{visitor.city}</Strong>
                </>
              ) : visitorDone ? (
                "somewhere on earth"
              ) : (
                <LoadingDots />
              )}
              {visitor && visitor.temp != null ? (
                <>
                  , where it is <Strong>{visitor.temp}°C</Strong> right now.
                </>
              ) : visitorDone ? (
                "."
              ) : null}
            </p>
            <p>
              I am in <Strong>bishkek</Strong>, where it is{" "}
              {bishkekTemp != null ? (
                <Strong>{bishkekTemp}°C</Strong>
              ) : (
                <LoadingDots />
              )}
              . small world.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-2">
            <span className="font-signature text-[32px] leading-none text-[#a3611c]">
              give it a spin
            </span>
            <svg
              width="120"
              height="80"
              viewBox="0 0 140 92"
              fill="none"
              aria-hidden="true"
              className="mt-5 -ml-1"
            >
              <path
                d="M28 4 C 32 36, 96 48, 126 80"
                stroke="#a3611c"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M126 80 C 114 78, 104 76, 95 72"
                stroke="#a3611c"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M126 80 C 124 72, 122 64, 119 56"
                stroke="#a3611c"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <TwoDotsGlobe
            visitor={visitor?.pin ?? null}
            visitorCity={visitor?.city ?? null}
          />
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { TwoDotsGlobe } from "@/components/two-dots-globe";

/* ── hand-drawn icons, same 1.5-stroke language as the tab bar ─────── */
function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7.5 12 13l8.5-5.5" />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function UpArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function PlaneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function BookmarkIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 3h12v18l-6-4.5L6 21V3z" />
    </svg>
  );
}

function BoardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M12 16v3" />
      <path d="M8 21l1.5-2h5L16 21" />
    </svg>
  );
}

/* ── live Manas weather (Open-Meteo, no key) ───────────────────────── */
const WEATHER_LABEL: Record<number, string> = {
  0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast",
  45: "foggy", 48: "foggy", 51: "drizzle", 53: "drizzle", 55: "drizzle",
  61: "rain", 63: "rain", 65: "rain", 71: "snow", 73: "snow", 75: "snow",
  80: "showers", 81: "showers", 82: "showers", 95: "storm",
};

function useManasWeather() {
  const [weather, setWeather] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.945&longitude=72.9931&current=temperature_2m,weather_code&timezone=auto"
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d?.current) return;
        const temp = Math.round(d.current.temperature_2m);
        const label = WEATHER_LABEL[d.current.weather_code] ?? "";
        setWeather(`${temp}°${label ? ` ${label}` : ""}`);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  return weather;
}

/* ── shared card shell ─────────────────────────────────────────────── */
function Card({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <div
        className="group relative h-full overflow-hidden rounded-[24px] border border-strong/10 bg-surface p-5 transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(63,58,52,0.14)]
          dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
      >
        {children}
      </div>
    </Reveal>
  );
}

const EMAIL = "imaaquibali@gmail.com";

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
];
const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/aliaaquib", label: "LinkedIn" },
  { href: "https://x.com/imaaquibali", label: "X" },
  { href: "https://github.com/aliaaquib", label: "GitHub" },
];

/* ── bio tile (reference: menu + avatar top, text bottom) ──────────── */
function BioTile({ delay, className = "" }: { delay: number; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card delay={delay} className={className}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Open menu"
              className="rounded-full p-1.5 text-muted transition hover:bg-strong/5 hover:text-strong active:scale-95"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            {open && (
              <nav
                aria-label="Site menu"
                className="absolute left-0 top-11 z-10 w-44 overflow-hidden rounded-2xl border border-strong/10 bg-surface shadow-[0_16px_40px_rgba(63,58,52,0.18)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
              >
                {MENU_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-[14px] text-strong/90 transition hover:bg-strong/5"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="border-t border-strong/10" />
                {SOCIAL_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-[14px] text-muted transition hover:bg-strong/5 hover:text-strong"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
          <img
            src="/portrait.jpg"
            alt="Aaquib Ali"
            className="h-9 w-9 rounded-full border border-strong/10 object-cover"
          />
        </div>
        <p className="mt-auto pt-8 text-[14px] leading-6 text-strong/90">
          aaquib ali — computer science teacher and builder based in manas,
          kyrgyzstan.
        </p>
      </div>
    </Card>
  );
}

/* ── hello tile (reference: mail + copy top, "hello" bottom) ───────── */
function HelloTile({ delay, className = "" }: { delay: number; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <Card delay={delay} className={className}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between text-muted">
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email Aaquib"
            className="rounded-full p-1.5 transition hover:bg-strong/5 hover:text-strong active:scale-95"
          >
            <MailIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className="rounded-full p-1.5 transition hover:bg-strong/5 hover:text-strong active:scale-95"
          >
            <CopyIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-auto pt-8">
          <p className="font-display text-[22px] italic leading-none text-strong">
            {copied ? "copied!" : "hello"}
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-2 block break-all text-[14px] text-muted underline decoration-strong/20 underline-offset-4 transition hover:text-brandred hover:decoration-brandred"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </Card>
  );
}

/* ── location tile (reference: big globe cropped at bottom, ──────────
   plane top-left, flag top-right, city + weather bottom-left) ───────── */
function LocationTile({ delay, className = "" }: { delay: number; className?: string }) {
  const weather = useManasWeather();
  return (
    <Card delay={delay} className={className}>
      <div className="relative h-full">
        <div className="relative z-10 flex items-start justify-between">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Manas%2C+Kyrgyzstan"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Manas in Google Maps"
            className="rounded-full p-1.5 text-muted transition hover:bg-strong/5 hover:text-strong active:scale-95"
          >
            <PlaneIcon className="h-5 w-5" />
          </a>
          <img
            src="https://flagcdn.com/w80/kg.png"
            alt="Kyrgyzstan flag"
            width={44}
            height={30}
            className="h-[22px] w-auto rounded-[4px]"
          />
        </div>
        <div className="absolute left-1/2 top-[25%] w-[220px] max-w-none -translate-x-1/2 sm:w-[260px]">
          <TwoDotsGlobe visitor={null} visitorCity={null} pinLabel={false} />
        </div>
        <div className="absolute bottom-0 left-0 z-10">
          <p className="whitespace-nowrap text-[16px] font-medium leading-tight text-strong">
            manas, kyrgyzstan
          </p>
          <p
            className={`mt-0.5 text-[13px] text-muted transition-opacity duration-700 ${
              weather ? "opacity-100" : "opacity-0"
            }`}
          >
            {weather ?? "···"}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ── whiteboard tile (reference's spotify slot: icon, titles, visual)  */
function WhiteboardTile({ delay, className = "" }: { delay: number; className?: string }) {
  return (
    <Card delay={delay} className={className}>
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3">
          <BoardIcon className="h-5 w-5 shrink-0 text-muted" />
          <p className="font-display text-[16px] italic leading-snug text-strong">
            cs &amp; math, igcse / a-level
          </p>
        </div>
        <div className="mt-auto pt-3">
          <div className="flex h-[108px] flex-col justify-center rounded-2xl bg-white p-3 shadow-[0_8px_24px_rgba(63,58,52,0.10)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:h-auto sm:p-4">
            <p className="-rotate-1 font-signature text-[15px] leading-snug text-[#1c1a17] sm:text-[18px]">
              recursion = a function that calls itself
            </p>
            <svg viewBox="0 0 200 10" preserveAspectRatio="none" className="mt-1 h-[8px] w-3/4" aria-hidden="true">
              <path d="M3 7 C 30 3, 60 9, 90 6 S 160 3, 197 6" fill="none" stroke="#e0632f" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function BentoAbout() {
  return (
    <section
      aria-label="About Aaquib"
      className="grid grid-cols-2 gap-3 pt-10 md:grid-cols-2 lg:grid-cols-12"
    >
      <BioTile delay={0} className="md:col-span-2 lg:col-span-3" />

      <LocationTile delay={80} className="lg:col-span-3" />

      {/* photo tile — full-bleed, like the reference */}
      <Reveal delay={160} className="lg:col-span-3">
        <div className="group relative h-full min-h-[200px] overflow-hidden rounded-[24px] border border-strong/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(63,58,52,0.14)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
          <img
            src="/images/about/teaching-1.jpg"
            alt="Aaquib teaching"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Reveal>

      <HelloTile delay={240} className="lg:col-span-3" />

      {/* portrait — tall, like the reference */}
      <Reveal delay={320} className="col-span-2 md:col-span-1 md:row-span-2 lg:col-span-6 lg:row-span-2 lg:col-start-7 lg:row-start-1">
        <div className="group relative h-full min-h-[380px] overflow-hidden rounded-[24px] border border-strong/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(63,58,52,0.14)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
          <img
            src="/images/about/portrait-new.jpg"
            alt="Aaquib Ali"
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Reveal>

      <WhiteboardTile delay={400} className="lg:col-span-3" />

      {/* thread academy — reference's youtube slot */}
      <Reveal delay={480} className="lg:col-span-3">
        <a
          href="https://threadacademy.aaquibali.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Thread Academy — open the live site"
          className="group relative block h-full min-h-[200px] overflow-hidden rounded-[24px] border border-strong/10 bg-surface transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(63,58,52,0.14)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
        >
          <img
            src="/images/work/thread-academy.png"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandred text-white">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            15,422 pages
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent p-5 pt-12">
            <span className="font-display text-[18px] italic text-white">thread academy</span>
          </span>
        </a>
      </Reveal>

      {/* weekly roundup — reference's newsletter slot */}
      <Card delay={560} className="col-span-2 md:col-span-1 lg:col-span-6">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between">
            <BookmarkIcon className="h-5 w-5 text-brandred" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              weekly
            </span>
          </div>
          <p className="mt-4 font-display text-[20px] italic leading-tight text-strong">
            the weekly roundup
          </p>
          <p className="mt-1 text-[14px] text-muted">
            the week&apos;s noise, in five minutes.
          </p>
          <div className="mt-auto pt-6">
            <a
              href={`mailto:${EMAIL}?subject=Subscribe%20me%20to%20the%20Weekly%20Roundup`}
              className="flex items-center justify-between gap-3 rounded-full border border-strong/15 py-1.5 pl-5 pr-1.5 transition hover:-translate-y-0.5 hover:border-strong/30 active:translate-y-0"
              aria-label="Subscribe to the Weekly Roundup via email"
            >
              <span className="flex min-w-0 items-center gap-2.5 text-[14px] text-strong/90">
                <MailIcon className="h-4 w-4 shrink-0 text-muted" />
                <span className="truncate">subscribe via email</span>
              </span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-strong text-white dark:text-black">
                <UpArrowIcon className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </Card>
    </section>
  );
}

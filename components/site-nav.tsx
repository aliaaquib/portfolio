"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileTabBar } from "@/components/mobile-tab-bar";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function BishkekClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const label = now
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Bishkek",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now)
    : "";

  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted">
      <ClockIcon className="h-4 w-4" />
      <span className="min-w-[78px] tabular-nums">{label}</span>
    </span>
  );
}

function GlassesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <rect x="2.5" y="9.5" width="7.5" height="6" rx="3" />
      <rect x="14" y="9.5" width="7.5" height="6" rx="3" />
      <path d="M10 11.5 C 11.2 10.2, 12.8 10.2, 14 11.5" />
      <path d="M2.5 11 L1 9.8 M21.5 11 L23 9.8" />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [wearing, setWearing] = useState(false);
  const pathname = usePathname();

  function setWhiteboard(on: boolean) {
    const el = document.documentElement as HTMLElement & {
      __wbPrevDark?: boolean;
    };
    if (on) {
      el.__wbPrevDark = el.classList.contains("dark");
      el.classList.remove("dark");
      el.classList.add("whiteboard");
    } else {
      el.classList.remove("whiteboard");
      if (el.__wbPrevDark) el.classList.add("dark");
      el.__wbPrevDark = false;
    }
    setWearing(on);
    window.dispatchEvent(
      new CustomEvent("toggle-glasses", { detail: { whiteboard: on } })
    );
  }

  // The theme toggle exits whiteboard mode before flipping the theme.
  useEffect(() => {
    function onExit() {
      if (document.documentElement.classList.contains("whiteboard")) {
        setWhiteboard(false);
      }
    }
    window.addEventListener("exit-whiteboard", onExit);
    return () => window.removeEventListener("exit-whiteboard", onExit);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <nav
      className={`sticky top-0 z-40 mt-4 transition-all duration-300 ${
        scrolled
          ? "border-b border-strong/10 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-5 px-5 py-2.5 sm:px-6">
        <Link
          href="/"
          className="shrink-0 transition-colors hover:text-strong"
          aria-label="Aaquib Ali — home"
        >
          <span className="hidden sm:inline-flex">
            <BishkekClock />
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted sm:hidden">
            <GlobeIcon className="h-4 w-4" />
            Bishkek, Kyrgyzstan
          </span>
        </Link>
        <div className="flex min-w-0 items-center gap-3 text-sm text-strong sm:gap-4 sm:text-[15px]">
          <span className="hidden items-center gap-1.5 text-sm text-muted sm:inline-flex">
            <GlobeIcon className="h-4 w-4" />
            Bishkek, Kyrgyzstan
          </span>
          <span aria-hidden="true" className="hidden h-5 w-px shrink-0 bg-strong/15 sm:block" />
          <ThemeToggle />
          <button
            type="button"
            id="glasses-toggle"
            onClick={() => setWhiteboard(!wearing)}
            aria-label={wearing ? "Erase the whiteboard" : "Wear the glasses — whiteboard mode"}
            title={wearing ? "Erase the whiteboard" : "Wear the glasses"}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:text-brandred ${
              wearing ? "rotate-[-8deg] text-brandred" : "text-strong"
            }`}
          >
            <GlassesIcon className="h-[19px] w-[19px]" />
          </button>
        </div>
      </div>
    </nav>
    <MobileTabBar />
    </>
  );
}

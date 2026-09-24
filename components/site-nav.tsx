"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sound";

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12Z" strokeLinejoin="round" />
    </svg>
  );
}

function ThinkingDots({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`thinking-dots font-bold leading-none ${className ?? ""}`}>
      <span>·</span>
      <span>·</span>
      <span>·</span>
    </span>
  );
}

function SpeakerIcon({ muted, className }: { muted: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" strokeLinejoin="round" />
      {muted ? (
        <path d="M16.5 9.5l5 5m0-5l-5 5" strokeLinecap="round" />
      ) : (
        <path d="M16.5 9a4.2 4.2 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function SiteNav() {
  const [muted, setMuted] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMuted(!isSoundEnabled());
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleSound() {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    setMuted(!next);
  }

  function navigate(href: string, fullReload = false) {
    const run = () => {
      if (fullReload) {
        window.location.href = href;
      } else {
        router.push(href);
      }
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(run);
    } else {
      run();
    }
  }

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-strong/10 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-5 py-2.5 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-signature text-[34px] leading-none text-strong transition-colors hover:text-brandred"
          aria-label="Aaquib Ali — home"
        >
          Aaquib Ali
        </Link>
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-[15px] text-strong sm:gap-6">
          <button
            type="button"
            onClick={() => navigate("/", true)}
            className="nav-link transition-colors hover:text-brandred"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => navigate("/labs")}
            className="nav-link transition-colors hover:text-brandred"
          >
            Labs
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-ask-ai"))}
            className="nav-link inline-flex items-center gap-1.5 transition-colors hover:text-brandred"
          >
            <ChatIcon className="h-4 w-4" />
            Ask me anything
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-agent-mode"))}
            className="nav-link inline-flex items-center gap-1.5 transition-colors hover:text-brandred"
          >
            <ThinkingDots className="text-[22px] text-[#e0632f]" />
            Agent mode
          </button>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn terminal sound on" : "Turn terminal sound off"}
            aria-pressed={!muted}
            className="text-strong transition-colors hover:text-brandred"
          >
            <SpeakerIcon muted={muted} className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </nav>
  );
}

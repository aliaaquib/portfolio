"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12Z" strokeLinejoin="round" />
    </svg>
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
  const router = useRouter();
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
          ? "border-b border-strong/10 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-5 px-5 py-2.5 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-namelogo text-[34px] leading-none text-strong transition-colors hover:text-brandred"
          aria-label="Aaquib Ali — home"
        >
          aaquib ali
        </Link>
        <div className="flex min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap text-sm text-strong sm:gap-6 sm:text-[15px]">
          <button
            type="button"
            onClick={() => navigate("/", true)}
            className="nav-link transition-colors hover:text-brandred"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => navigate("/about")}
            className="nav-link transition-colors hover:text-brandred"
          >
            About
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
            className="nav-link hidden items-center gap-1.5 transition-colors hover:text-brandred sm:inline-flex"
          >
            <ChatIcon className="h-4 w-4" />
            Ask me anything
          </button>
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
  );
}

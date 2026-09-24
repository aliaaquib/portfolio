"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12Z" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
          ? "border-b border-strong/10 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-5 px-5 py-2.5 sm:px-6">
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
        </div>
      </div>
    </nav>
  );
}

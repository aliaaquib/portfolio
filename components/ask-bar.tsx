"use client";

import { useEffect, useState } from "react";

export function AskBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-ask-ai"))}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ${
        hidden ? "pointer-events-none translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <span className="group flex items-center gap-2.5 rounded-full border border-strong/15 bg-white py-3 pl-4 pr-4 text-left shadow-[0_8px_28px_rgba(17,17,17,0.14)] transition hover:border-strong/30">
        <svg
          width="17"
          height="17"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-strong/70"
        >
          <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6" />
          <line x1="11.2" y1="11.2" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="truncate text-[15px] font-medium text-strong">
          Ask me anything
        </span>
        <span
          aria-hidden="true"
          className="ml-auto shrink-0 text-lg text-strong/70 transition group-hover:translate-x-0.5 group-hover:text-strong"
        >
          →
        </span>
      </span>
    </button>
  );
}

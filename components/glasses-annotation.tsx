"use client";

import { useEffect, useState } from "react";

/**
 * Handwritten "wear the glasses" note at the top of the hero,
 * with a small hand-drawn arrow (same size as the timeline's
 * "try this" arrow) pointing up toward the glasses icon in the
 * navbar. Fades out once scrolled.
 */
export function GlassesAnnotation() {
  const [wearing, setWearing] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function onToggle(e: Event) {
      setWearing(Boolean((e as CustomEvent).detail?.whiteboard));
    }
    window.addEventListener("toggle-glasses", onToggle);
    return () => window.removeEventListener("toggle-glasses", onToggle);
  }, []);

  useEffect(() => {
    function onScroll() {
      setHidden(window.scrollY > 90);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ink = "stroke-[#a3611c] dark:stroke-[#d09a52]";

  return (
    <div
      aria-hidden="true"
      className={`flex select-none justify-end transition-opacity duration-300 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="pointer-events-none inline-flex items-center gap-1">
        <span className="font-signature text-[20px] leading-none text-[#a3611c] dark:text-[#d09a52] lg:text-[22px]">
          {wearing ? "erase the board" : "wear the glasses"}
        </span>
        <svg width="38" height="28" viewBox="0 0 38 28" fill="none">
          <path
            d="M5 24 C 15 22, 24 16, 30 7"
            className={ink}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M30 7 C 26 8, 22 9, 18 10"
            className={ink}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M30 7 C 29 11, 28 15, 27 19"
            className={ink}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ContactMiniWindow } from "@/components/contact-mini-window";

export function ArticleActions() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="fixed inset-x-6 top-6 z-30 mx-auto flex max-w-6xl items-center justify-between gap-4 font-sans text-xs sm:top-10 sm:text-sm">
      <Link
        href="/writings"
        className="inline-flex items-center gap-2 rounded-full bg-strong px-4 py-2 text-bg transition-opacity duration-200 hover:opacity-85"
      >
        <BackIcon className="h-3.5 w-3.5" />
        <span>Return</span>
      </Link>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsContactOpen((isOpen) => !isOpen)}
          className="inline-flex select-none items-center gap-2 rounded-full bg-strong px-4 py-2 text-bg transition-opacity duration-200 hover:opacity-85"
        >
          <SendIcon className="h-3.5 w-3.5" />
          <span>Contact</span>
        </button>
        {isContactOpen ? <ContactMiniWindow onClose={() => setIsContactOpen(false)} /> : null}
      </div>
    </div>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.8 3.7c.7-.3 1.4.4 1.1 1.1l-7 16c-.3.8-1.5.7-1.8-.1l-2.2-6.3-6.3-2.2c-.8-.3-.9-1.4-.1-1.8l16.3-6.7Z" />
    </svg>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={className}
    >
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 0 12h-1" />
    </svg>
  );
}

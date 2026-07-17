"use client";

import Link from "next/link";
import { useState } from "react";
import { ContactMiniWindow } from "@/components/contact-mini-window";
import { BackIcon, SendIcon } from "@/components/icons";

export function PageActions({ returnHref = "/" }: { returnHref?: string }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="fixed inset-x-6 top-6 z-30 mx-auto flex max-w-6xl items-center justify-between gap-4 font-sans text-xs sm:top-10 sm:text-sm">
      <Link
        href={returnHref}
        className="inline-flex items-center gap-2 rounded-full bg-black/[0.05] px-4 py-2 text-strong transition-colors duration-200 hover:bg-black/[0.08]"
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

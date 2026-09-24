"use client";

import { useState } from "react";

export function AboutAccordion({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-4 py-2 text-left"
      >
        <span className="text-[17px] font-medium text-strong transition-colors group-hover:text-brandred">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-xl text-strong transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
        >
          →
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-[15px] leading-8 text-text/90">{children}</div>
        </div>
      </div>
    </div>
  );
}

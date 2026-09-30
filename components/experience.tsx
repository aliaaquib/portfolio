"use client";

import { useState } from "react";

const BULLETS = [
  "Deliver engaging Cambridge IGCSE Computer Science and ICT lessons using inquiry-based, project-based, and student-centred learning strategies to develop computational thinking, problem-solving, and digital literacy.",
  "Plan and deliver schemes of work, lesson plans, assessments, and learning resources aligned with Cambridge International curriculum standards and learning objectives.",
  "Integrate Python programming, web development, artificial intelligence tools, and educational technology into classroom instruction to prepare students with future-ready digital skills.",
  "Differentiate instruction to meet diverse learning needs by implementing targeted teaching strategies, scaffolding, and individualized support that enable every learner to achieve their potential.",
  "Monitor student progress using Assessment for Learning (AfL), formative and summative assessments, providing timely feedback and intervention to improve academic performance.",
  "Foster an inclusive, positive, and well-managed classroom environment that promotes safeguarding, student wellbeing, collaboration, creativity, and responsible digital citizenship.",
  "Organize coding activities, STEM projects, and technology-based learning experiences that encourage innovation, teamwork, and real-world problem-solving.",
  "Collaborate with teachers, school leadership, and parents to support curriculum development, student achievement, and whole-school technology initiatives while contributing to continuous school improvement.",
];

function nowFloat() {
  const n = new Date();
  return n.getFullYear() + n.getMonth() / 12;
}

function TryThisArrow({ className = "" }: { className?: string }) {
  const ink = "stroke-[#a3611c] dark:stroke-[#d09a52]";
  return (
    <svg
      width="38"
      height="28"
      viewBox="0 0 38 28"
      fill="none"
      className={className}
    >
      <path
        d="M5 4 C 15 6, 24 12, 30 21"
        className={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 21 C 26 20, 22 19, 18 18"
        className={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 21 C 29 17, 28 13, 27 9"
        className={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TryThisArrowDown({ className = "" }: { className?: string }) {
  const ink = "stroke-[#a3611c] dark:stroke-[#d09a52]";
  return (
    <svg
      width="24"
      height="30"
      viewBox="0 0 24 30"
      fill="none"
      className={className}
    >
      <path
        d="M13 2 C 10 10, 16 18, 12 23"
        className={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M6 16.5 L12 24 L18 16.5"
        className={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListView() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 py-4 text-left"
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-strong/10 bg-surface">
          <img
            src="/sapat-logo.png"
            alt="SAPAT logo"
            className="h-10 w-12 object-contain"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[17px] font-medium text-strong">
            &ldquo;SAPAT&rdquo; International Educational Institution
          </span>
          <span className="mt-0.5 block text-[15px] text-muted">
            Computer Science Teacher
          </span>
        </span>
        <span className="shrink-0 font-mono text-[12px] text-muted">
          2023 to present
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="max-w-xl list-disc space-y-3 pb-4 pl-5 text-[15px] leading-7 text-text/90 marker:text-muted">
          {BULLETS.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TimelineView() {
  const now = nowFloat();
  const t0 = 2023;
  const span = Math.max(now - t0, 0.5);
  const xp = (t: number) => `${((t - t0) / span) * 100}%`;
  const years = [2023, 2024, 2025, 2026];

  return (
    <div className="mt-6">
      <div className="relative h-[210px] select-none">
        {years.map((y, i) => (
          <div
            key={y}
            className="absolute bottom-6 top-0 border-l border-strong/10"
            style={{ left: xp(y) }}
          >
            <span
              className={`absolute bottom-0 font-mono text-[12px] text-muted ${
                i === 0 ? "" : "-translate-x-1/2"
              }`}
            >
              {y}
            </span>
          </div>
        ))}
        <div
          className="absolute bottom-6 top-0 border-l border-dashed border-[#b07a2a]/70"
          style={{ left: "100%" }}
        >
          <span className="absolute -top-0.5 right-0 font-mono text-[12px] text-[#b07a2a] dark:text-[#d09a52]">
            now
          </span>
        </div>
        <div className="absolute left-0 top-8 w-full rounded-2xl border border-strong/10 bg-[#f4f2ed] px-4 py-3 dark:bg-white/[0.07]">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface">
              <img
                src="/sapat-logo.png"
                alt="SAPAT logo"
                className="h-8 w-10 object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-medium text-strong">
                &ldquo;SAPAT&rdquo; International Educational Institution
              </span>
              <span className="block truncate text-[13px] text-muted">
                Computer Science Teacher
              </span>
            </span>
            <span className="ml-auto shrink-0 font-mono text-[12px] text-muted">
              2023 to present
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [view, setView] = useState<"list" | "timeline">("list");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <span
          aria-hidden="true"
          className="flex w-full select-none flex-col items-end sm:hidden"
        >
          <span className="font-signature text-[20px] leading-none text-[#a3611c] dark:text-[#d09a52]">
            try this
          </span>
          <TryThisArrowDown className="mr-5 mt-1" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
            Experience
          </p>
          <h2 className="mt-3 font-display text-[28px] tracking-tight text-strong sm:text-[36px] lg:text-[44px]">
            <span aria-hidden="true" className="section-tick" />
            Where I have worked
          </h2>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="hidden select-none items-center sm:inline-flex"
          >
            <span className="font-signature text-[20px] leading-none text-[#a3611c] dark:text-[#d09a52]">
              try this
            </span>
            <TryThisArrow className="-mr-2 -mt-1" />
          </span>
          <div
            role="tablist"
            aria-label="Experience view"
            className="flex rounded-full bg-[#edebe6] p-1 dark:bg-white/10"
          >
            {(["list", "timeline"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`rounded-full px-3 py-1.5 text-[12px] transition-all sm:px-4 sm:py-2 sm:text-[14px] ${
                  view === v
                    ? "bg-[#111111] text-white shadow dark:bg-white dark:text-black"
                    : "text-[#8a8478] hover:text-strong dark:text-muted dark:hover:text-strong"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "list" ? <ListView /> : <TimelineView />}
    </div>
  );
}

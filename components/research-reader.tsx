"use client";

import { useEffect, useState } from "react";
import type { ResearchNote } from "@/lib/research";
import { AcademyPipelineDiagram } from "@/components/academy-pipeline-diagram";
import { ClarioBriefingDiagram } from "@/components/clario-briefing-diagram";

function Icon({ d, circles }: { d: string[]; circles?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {d.map((path) => (
        <path key={path} d={path} />
      ))}
      {circles === "list" && (
        <>
          <circle cx={4} cy={6} r={1} fill="currentColor" stroke="none" />
          <circle cx={4} cy={12} r={1} fill="currentColor" stroke="none" />
          <circle cx={4} cy={18} r={1} fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

const ICONS: Record<string, { d: string[]; circles?: string }> = {
  shield: { d: ["M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"] },
  bulb: {
    d: [
      "M9 18h6",
      "M10 21h4",
      "M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.5 1 2.5h6c0-1 .2-1.8 1-2.5A6 6 0 0 0 12 3z",
    ],
  },
  file: { d: ["M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z", "M14 3v5h5"] },
  layers: { d: ["M12 3l9 5-9 5-9-5 9-5z", "M3 13l9 5 9-5"] },
  package: { d: ["M21 8l-9-5-9 5v8l9 5 9-5V8z", "M3 8l9 5 9-5", "M12 13v8"] },
  zap: { d: ["M13 2L4 14h6l-1 8 9-12h-6l1-8z"] },
  align: { d: ["M4 6h16", "M4 12h10", "M4 18h14"] },
  list: { d: ["M8 6h13", "M8 12h13", "M8 18h13"], circles: "list" },
  book: { d: ["M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z", "M4 19a2 2 0 0 0 2 2h13"] },
  link: {
    d: [
      "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7",
      "M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
    ],
  },
};

function Eyebrow({ icon, label }: { icon: string; label: string }) {
  const def = ICONS[icon];
  return (
    <p className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-muted">
      {def && <Icon d={def.d} circles={def.circles} />}
      {label}
    </p>
  );
}

function Diagram({ slug }: { slug: string }) {
  return slug === "academy-pipeline" ? (
    <AcademyPipelineDiagram />
  ) : (
    <ClarioBriefingDiagram />
  );
}

function Pitch({ note }: { note: ResearchNote }) {
  return (
    <div>
      <section>
        <Eyebrow icon="shield" label="The problem" />
        <p className="mt-4 text-[17px] leading-8 text-text">{note.problem}</p>
      </section>

      <section className="mt-10">
        <Eyebrow icon="bulb" label="The solution" />
        <p className="mt-4 text-[17px] leading-8 text-text">{note.solution}</p>
      </section>

      <section className="mt-10">
        <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-muted">
          Core capabilities
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {note.capabilities.map((cap) => {
            const def = ICONS[cap.icon];
            return (
              <div
                key={cap.title}
                className="rounded-2xl border border-strong/10 bg-white p-6 shadow-[0_1px_8px_rgba(17,17,17,0.06)] dark:bg-white/[0.03]"
              >
                <p className="flex items-center gap-2.5 text-[17px] font-semibold text-strong">
                  {def && (
                    <span className="text-muted">
                      <Icon d={def.d} circles={def.circles} />
                    </span>
                  )}
                  {cap.title}
                </p>
                <p className="mt-2.5 text-[15px] leading-7 text-muted">{cap.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-strong/[0.04] p-6 dark:bg-white/[0.05] sm:p-8">
        <Eyebrow icon="zap" label="Why this matters" />
        <p className="mt-4 text-[17px] leading-8 text-strong">{note.whyMatters}</p>
      </section>
    </div>
  );
}

function DecisionLog({ note }: { note: ResearchNote }) {
  return (
    <div className="divide-y divide-strong/10">
      {note.decisions.map((decision, i) => (
        <section key={decision.title} className="py-7 first:pt-1">
          <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-muted">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-[19px] font-semibold text-strong">
            {decision.title}
          </h3>
          <p className="mt-2 text-[16px] leading-8 text-muted">{decision.text}</p>
        </section>
      ))}
    </div>
  );
}

const TABS = [
  { id: "pitch", label: "30 Second Pitch" },
  { id: "log", label: "Decision Log" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Research reading experience — after the tinkering reference page. */
export function ResearchReader({ note }: { note: ResearchNote }) {
  const [tab, setTab] = useState<TabId>("pitch");
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <>
      <a
        href="/writing"
        className="inline-flex items-center gap-1.5 text-[15px] text-muted transition hover:text-strong"
      >
        <span aria-hidden="true">←</span> All research
      </a>

      <h1 className="mt-6 text-[32px] font-bold tracking-tight text-strong sm:text-[36px]">
        {note.title}
      </h1>
      <p className="mt-3 max-w-2xl text-[17px] leading-8 text-muted">
        {note.description}
      </p>

      <div className="relative mt-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-52 top-10 hidden w-48 -rotate-6 xl:block"
        >
          <p className="font-signature text-[30px] leading-none text-muted">
            Click to zoom
          </p>
          <svg
            width="150"
            height="70"
            viewBox="0 0 150 70"
            fill="none"
            className="ml-16 mt-1"
          >
            <path
              d="M8 8 C 60 4, 110 20, 132 52"
              stroke="#9AA0A6"
              strokeWidth="2.5"
              strokeDasharray="7 6"
              strokeLinecap="round"
            />
            <path
              d="M122 44 L134 54 L120 60"
              stroke="#9AA0A6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <button
          type="button"
          onClick={() => setZoom(true)}
          title="Click to zoom"
          className="block w-full cursor-zoom-in rounded-2xl border border-strong/10 bg-white p-4 shadow-[0_2px_18px_rgba(17,17,17,0.08)] transition hover:shadow-[0_4px_28px_rgba(17,17,17,0.12)] sm:p-8"
        >
          <Diagram slug={note.slug} />
          <span className="mt-2 block text-center text-[13px] text-muted xl:hidden">
            Tap to zoom
          </span>
        </button>
      </div>

      <div
        role="group"
        aria-label="Reading views"
        className="mt-10 inline-flex rounded-full border border-strong/10 bg-strong/[0.04] p-1.5 dark:bg-white/[0.06]"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`rounded-full px-5 py-2 text-[15px] font-medium transition sm:px-6 ${
              tab === t.id
                ? "bg-surface text-strong shadow-[0_1px_4px_rgba(17,17,17,0.12)]"
                : "text-muted hover:text-strong"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10" aria-live="polite">
        {tab === "pitch" ? <Pitch note={note} /> : <DecisionLog note={note} />}
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${note.title} diagram, zoomed`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-10"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            aria-label="Close zoom"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
          >
            ✕
          </button>
          <div
            className="max-h-full w-full max-w-6xl overflow-auto rounded-2xl bg-white p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Diagram slug={note.slug} />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { Mascot } from "@/components/mascot";

type Project = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  tags: string[];
  /** Gradient backdrop for the framed preview — each card gets its own hue. */
  frame: string;
};

// The single source of truth for "our work": Thread Academy + Clario.
const PROJECTS: Project[] = [
  {
    id: "work-academy",
    title: "Thread Academy",
    description:
      "A free learning platform covering the full school curriculum — every chapter reads like a textbook page.",
    href: "https://threadacademy.aaquibali.com",
    image: "/images/work/thread-academy.png",
    imageAlt: "Thread Academy homepage",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    frame:
      "from-[#d3e2f4] via-[#bccfe9] to-[#e2ebf7] dark:from-[#1a2540] dark:via-[#121b31] dark:to-[#0d1425]",
  },
  {
    id: "work-clario",
    title: "Clario",
    description:
      "Turns a rough question into a clear, sourced briefing. Ask loosely, get something you can actually use.",
    href: "https://clarioagent.vercel.app",
    image: "/images/work/clario-homepage.png",
    imageAlt: "Clario homepage",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    frame:
      "from-[#f7e6c9] via-[#f0d3a4] to-[#fbefdc] dark:from-[#3a2a16] dark:via-[#2b1f10] dark:to-[#21180c]",
  },
];

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4L12 2z" />
    </svg>
  );
}

type Lab = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  visual: React.ReactNode;
  /** Gradient backdrop for the framed visual — each card gets its own hue. */
  frame: string;
  actionLabel: string;
  href?: string;
  onSelect?: () => void;
};

const LABS: Lab[] = [
  {
    id: "lab-ask-ai",
    title: "Ask AI",
    description:
      "A resident expert on everything I do. Every page carries a small assistant that answers from this site's context — no account, no chat history, just answers.",
    tags: ["Next.js", "React"],
    visual: <SparkleIcon className="h-16 w-16 text-strong" />,
    frame:
      "from-[#ded7f8] via-[#c6b9f1] to-[#eae6fb] dark:from-[#2b2148] dark:via-[#1f1838] dark:to-[#181229]",
    actionLabel: "Try it",
    onSelect: () => window.dispatchEvent(new CustomEvent("open-ask-ai")),
  },
  {
    id: "lab-mascot",
    title: "Mascot",
    description:
      "A sprite-sheet companion built for this site. Move your cursor around — he watches. Click him and he reacts.",
    tags: ["Sprite sheet", "React"],
    visual: (
      <Mascot
        directions="/mascots/aaquib-directions.webp"
        reactions="/mascots/aaquib-reactions.webp"
        size={150}
        label="Mini Aaquib, following your cursor"
      />
    ),
    frame:
      "from-[#cfeeda] via-[#b1e2c5] to-[#e3f6ea] dark:from-[#14362a] dark:via-[#0f2921] dark:to-[#0b2019]",
    actionLabel: "See it",
    href: "/labs",
  },
];

const FRAME_BASE =
  "rounded-2xl border border-strong/10 bg-gradient-to-br shadow-[0_2px_18px_rgba(17,17,17,0.08)]";

function TagPill({ label }: { label: string }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-strong/10 bg-surface px-3 py-1 text-[13px] text-text">
      <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-strong" />
      {label}
    </li>
  );
}

function LivePreviewLink() {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-green-700 dark:text-green-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
      </span>
      Live preview <span aria-hidden="true">↗</span>
    </span>
  );
}

function ProjectCard({
  project,
  eager,
  compact,
}: {
  project: Project;
  eager?: boolean;
  compact?: boolean;
}) {
  return (
    <Reveal as="article" id={project.id} className="scroll-mt-24">
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group block"
      >
        {compact ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            loading={eager ? "eager" : "lazy"}
            className="aspect-[16/10] w-full rounded-xl object-cover object-top shadow-[0_24px_60px_-12px_rgba(8,18,38,0.45)] ring-1 ring-black/10 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className={`${FRAME_BASE} ${project.frame} p-6 sm:p-10`}>
            <img
              src={project.image}
              alt={project.imageAlt}
              loading={eager ? "eager" : "lazy"}
              className="aspect-[16/10] w-full rounded-xl object-cover object-top shadow-[0_24px_60px_-12px_rgba(8,18,38,0.45)] ring-1 ring-black/10 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className={`${compact ? "mt-4" : "mt-6"} px-1`}>
          <h3
            className={`font-display leading-tight text-strong ${
              compact ? "text-[19px] sm:text-[24px]" : "text-[28px]"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`mt-2 max-w-3xl text-muted ${
              compact ? "text-[14px] leading-6" : "text-[16px] leading-7"
            }`}
          >
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            {!compact && (
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TagPill key={tag} label={tag} />
                ))}
              </ul>
            )}
            <LivePreviewLink />
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function LabCard({ lab }: { lab: Lab }) {
  const actionClassName =
    "inline-flex shrink-0 items-center gap-1 text-[15px] font-medium text-strong transition hover:text-brandred";
  return (
    <Reveal as="article" id={lab.id} className="scroll-mt-24">
      <div className={`${FRAME_BASE} ${lab.frame} p-6 sm:p-10`}>
        <div className="flex aspect-[16/10] items-center justify-center">
          {lab.visual}
        </div>
      </div>
      <div className="mt-6 px-1">
        <h3 className="font-display text-[28px] leading-tight text-strong">
          {lab.title}
        </h3>
        <p className="mt-2 max-w-3xl text-[16px] leading-7 text-muted">
          {lab.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-2">
            {lab.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </ul>
          {lab.href ? (
            <a href={lab.href} className={actionClassName}>
              {lab.actionLabel} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={lab.onSelect}
              className={actionClassName}
            >
              {lab.actionLabel} <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectList() {
  return (
    <div className="space-y-14">
      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.id} project={project} eager={i === 0} />
      ))}
    </div>
  );
}

/** Compact two-up grid, homepage "Proof of shipped things" only — /work untouched. */
export function WorkGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          eager={i === 0}
          compact
        />
      ))}
    </div>
  );
}

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "labs", label: "Labs" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Full work section with the Projects | Labs toggle — used by /work. */
export function WorkTabs() {
  const [tab, setTab] = useState<TabId>("projects");
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <Reveal>
          <h1 className="font-display text-4xl tracking-tight text-strong sm:text-[44px]">
            Selected Work
          </h1>
          <p className="mt-3 max-w-xl text-[16px] leading-7 text-muted">
            A few projects that capture how I design, build, and ship products.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div
            role="group"
            aria-label="Work categories"
            className="inline-flex rounded-full border border-strong/10 bg-strong/[0.05] p-1.5 dark:bg-white/[0.07]"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`rounded-full px-5 py-2 text-[15px] font-medium transition ${
                  tab === t.id
                    ? "bg-surface text-strong shadow-[0_1px_4px_rgba(17,17,17,0.12)]"
                    : "text-muted hover:text-strong"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-10" aria-live="polite">
        {tab === "projects" ? (
          <ProjectList />
        ) : (
          <div className="space-y-14">
            {LABS.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

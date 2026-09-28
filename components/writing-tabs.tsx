"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { AcademyPipelineDiagram } from "@/components/academy-pipeline-diagram";
import { ClarioBriefingDiagram } from "@/components/clario-briefing-diagram";
import { RESEARCH_NOTES } from "@/lib/research";
import type { Post } from "@/lib/posts";

const FRAME_BASE =
  "rounded-2xl border border-strong/10 bg-gradient-to-br shadow-[0_2px_18px_rgba(17,17,17,0.08)]";

/** Backdrop hues cycle across articles — same framed-card language as /work. */
const FRAMES = [
  "from-[#d3e2f4] via-[#bccfe9] to-[#e2ebf7] dark:from-[#1a2540] dark:via-[#121b31] dark:to-[#0d1425]",
  "from-[#f7e6c9] via-[#f0d3a4] to-[#fbefdc] dark:from-[#3a2a16] dark:via-[#2b1f10] dark:to-[#21180c]",
  "from-[#ded7f8] via-[#c6b9f1] to-[#eae6fb] dark:from-[#2b2148] dark:via-[#1f1838] dark:to-[#181229]",
  "from-[#cfeeda] via-[#b1e2c5] to-[#e3f6ea] dark:from-[#14362a] dark:via-[#0f2921] dark:to-[#0b2019]",
  "from-[#f7dcdc] via-[#efc3c3] to-[#fbecec] dark:from-[#3d2020] dark:via-[#2e1818] dark:to-[#251212]",
];

function TagPill({ label }: { label: string }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-strong/10 bg-surface px-3 py-1 text-[13px] text-text">
      <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-strong" />
      {label}
    </li>
  );
}

function ArticleCard({ post, index }: { post: Post; index: number }) {
  const frame = FRAMES[index % FRAMES.length];
  const meta = [post.date, post.readingTime, post.category].filter(
    (v): v is string => Boolean(v)
  );
  return (
    <Reveal as="article" className="scroll-mt-24">
      <a href={`/articles/${post.slug}`} className="group block">
        <div className={`${FRAME_BASE} ${frame} p-6 sm:p-10`}>
          <div className="flex aspect-[16/10] items-center justify-center px-2 sm:px-6">
            <h3 className="max-w-2xl text-center font-display text-[26px] leading-snug text-strong sm:text-[34px]">
              {post.title}
            </h3>
          </div>
        </div>
        <div className="mt-6 px-1">
          <p className="max-w-3xl text-[16px] leading-7 text-muted">
            {post.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <ul className="flex flex-wrap gap-2">
              {meta.map((label) => (
                <TagPill key={label} label={label} />
              ))}
            </ul>
            <span className="inline-flex shrink-0 items-center gap-1 text-[15px] font-medium text-strong transition group-hover:text-brandred">
              Read <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function ResearchNotes() {
  return (
    <div className="space-y-14">
      {RESEARCH_NOTES.map((note) => (
        <Reveal as="article" key={note.slug} className="scroll-mt-24">
          <a href={`/research/${note.slug}`} className="group block">
            <div className="rounded-2xl border border-strong/10 bg-white p-4 shadow-[0_2px_18px_rgba(17,17,17,0.08)] sm:p-6">
              {note.slug === "academy-pipeline" ? (
                <AcademyPipelineDiagram />
              ) : (
                <ClarioBriefingDiagram />
              )}
            </div>
            <h3 className="mt-6 px-1 font-display text-[28px] leading-tight text-strong">
              {note.title}
            </h3>
            <p className="mt-2 max-w-3xl px-1 text-[16px] leading-7 text-muted">
              {note.description}
            </p>
            <div className="mt-4 px-1">
              <span className="inline-flex items-center gap-1 text-[15px] font-medium text-strong transition group-hover:text-brandred">
                Read the note <span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

const TABS = [
  { id: "writing", label: "Writing" },
  { id: "research", label: "Research" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Writing section with the Writing | Research toggle — used by /writing. */
export function WritingTabs({ posts }: { posts: Post[] }) {
  const [tab, setTab] = useState<TabId>("writing");
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <Reveal>
          <h1 className="font-display text-4xl tracking-tight text-strong sm:text-[44px]">
            {tab === "writing" ? "Writing" : "Research"}
          </h1>
          <p className="mt-3 max-w-xl text-[16px] leading-7 text-muted">
            {tab === "writing"
              ? "Essays and explainers, written the way I teach — plainly."
              : "Notes from the workbench."}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div
            role="group"
            aria-label="Writing categories"
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
        {tab === "writing" ? (
          <div className="space-y-14">
            {posts.map((post, i) => (
              <ArticleCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <ResearchNotes />
        )}
      </div>
    </>
  );
}

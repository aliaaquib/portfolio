"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { AskAIControl } from "@/components/ask-ai";
import { ContactMiniWindow } from "@/components/contact-mini-window";
import { SendIcon } from "@/components/icons";
import type { Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";

type Tab = "Work" | "About";

type HomeTabsProps = {
  recentPosts: Post[];
  projects: Project[];
  children?: ReactNode;
};

const tabs: Tab[] = ["Work", "About"];

const tabButtonClass =
  "rounded-full px-3 py-1 transition-colors duration-200 hover:bg-bg/70 sm:px-4";

const activeTabButtonClass =
  "rounded-full bg-bg px-3 py-1 shadow-sm transition-colors duration-200 sm:px-4";

export function HomeTabs({ recentPosts, projects, children }: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Work");

  return (
    <div className="space-y-10">
      <div className="space-y-10">
        <div className="flex w-full select-none flex-wrap items-center justify-between gap-3">
          <HomeTabNav activeTab={activeTab} onChange={setActiveTab} />
          <AskAIControl />
        </div>
        {children}

        <section className="border-b border-muted/20 pb-10">
          {activeTab === "Work" ? <WorkContent recentPosts={recentPosts} projects={projects} /> : null}
          {activeTab === "About" ? <AboutContent /> : null}
        </section>
      </div>
    </div>
  );
}

function HomeTabNav({
  activeTab,
  onChange,
}: {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <nav className="inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-black/[0.06] p-1 font-sans text-xs text-strong sm:text-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={activeTab === tab ? activeTabButtonClass : tabButtonClass}
        >
          {tab}
        </button>
      ))}
      <Link href="/articles" className={tabButtonClass}>
        Writing
      </Link>
    </nav>
  );
}

function WorkContent({ recentPosts, projects }: HomeTabsProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="relative flex flex-wrap items-center gap-3 font-sans text-xs sm:text-sm">
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
        <Link
          href="https://drive.google.com/file/d/1OCadGX_mn3dTkS7x58cs27twIOzd92cD/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-black/[0.05] px-4 py-2 text-strong transition-colors duration-200 hover:bg-black/[0.08]"
        >
          Resume
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm uppercase text-accent">NOW</h2>
        <NowContent />
      </section>

      <section className="space-y-10">
        <h2 className="text-sm uppercase text-accent">FEATURED WORK</h2>
        {projects.map((project) => (
          <ProjectWorkCard key={project.slug} project={project} />
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex max-w-content items-center justify-between gap-4">
          <h2 className="text-sm uppercase text-accent">LATEST ARTICLES</h2>
          <Link
            href="/articles"
            className="inline-block text-sm text-muted transition-colors duration-200 hover:text-strong sm:text-base"
          >
            Read All
          </Link>
        </div>
        <PostList recentPosts={recentPosts} />
      </section>
    </div>
  );
}

function ProjectWorkCard({ project }: { project: Project }) {
  const isResearchCard = project.cardKind === "research";
  const cardHref = `/work/${project.slug}`;
  const pillItems = isResearchCard ? ["ict", "math", "research"] : ["research", "sources", "notes"];
  const leftItems = isResearchCard
    ? ["plan", "teach", "reflect"]
    : ["question", "sources", "summary"];
  const rightItems = isResearchCard
    ? ["ICT tools", "math concepts", "teacher reflection"]
    : ["source cards", "brief draft", "review"];

  return (
    <article className="group w-full max-w-3xl space-y-4">
      <Link
        href={cardHref}
        className="block overflow-hidden rounded-[2rem] bg-black/[0.05] p-6 transition duration-300 hover:bg-black/[0.07] sm:p-10"
      >
        <div className="relative mx-auto aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 bg-bg shadow-sm">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 font-sans text-[10px] text-muted sm:text-xs">
            <div className="flex items-center gap-2 text-strong">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-strong text-[10px] text-bg">
                {project.title.charAt(0)}
              </span>
              <span>{project.eyebrow.toLowerCase()}</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              {pillItems.map((item) => (
                <span key={item} className="rounded-full bg-black/[0.05] px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className={`grid h-full gap-4 p-4 sm:p-5 ${isResearchCard ? "sm:grid-cols-[1.1fr_0.9fr]" : "sm:grid-cols-[0.8fr_1.2fr]"}`}>
            <div className={isResearchCard ? "relative overflow-hidden rounded-2xl border border-black/10 bg-white/45 p-4" : "space-y-3"}>
              {isResearchCard ? (
                <>
                  <div className="mb-4 flex items-center justify-between font-sans text-[10px] text-muted sm:text-xs">
                    <span>{project.type.toLowerCase()}</span>
                    <span>{project.status.toLowerCase()}</span>
                  </div>
                  <div className="space-y-3">
                    <span className="block h-3 w-5/6 rounded-full bg-strong/80" />
                    <span className="block h-2 rounded-full bg-black/12" />
                    <span className="block h-2 w-11/12 rounded-full bg-black/12" />
                    <span className="block h-2 w-4/5 rounded-full bg-black/12" />
                  </div>
                </>
              ) : (
                leftItems.map((item, index) => (
                  <MiniCard key={item} label={item} short={index === 1} />
                ))
              )}
              {isResearchCard ? (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {leftItems.map((item) => (
                    <div key={item} className="rounded-2xl bg-black/[0.04] p-3">
                      <span className="mb-4 block h-2 rounded-full bg-black/18" />
                      <span className="font-sans text-[10px] text-muted">{item}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {isResearchCard ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
              ) : null}
            </div>

            <div className={isResearchCard ? "space-y-3" : "relative overflow-hidden rounded-2xl border border-black/10 bg-white/45 p-4"}>
              {isResearchCard ? (
                rightItems.map((item, index) => <MiniCard key={item} label={item} short={index === 2} />)
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between font-sans text-[10px] text-muted sm:text-xs">
                    <span>ai research brief</span>
                    <span>draft ready</span>
                  </div>
                  <div className="space-y-3">
                    <span className="block h-3 w-3/4 rounded-full bg-strong/80" />
                    <span className="block h-2 rounded-full bg-black/12" />
                    <span className="block h-2 w-11/12 rounded-full bg-black/12" />
                    <span className="block h-2 w-4/5 rounded-full bg-black/12" />
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-black/[0.04] p-3">
                      <span className="mb-3 block h-2 w-1/2 rounded-full bg-black/20" />
                      <span className="block h-16 rounded-xl bg-black/[0.06]" />
                    </div>
                    <div className="rounded-2xl bg-black/[0.04] p-3">
                      <span className="mb-3 block h-2 w-1/2 rounded-full bg-black/20" />
                      <span className="block h-16 rounded-xl bg-black/[0.06]" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="grid gap-1 font-sans text-sm sm:grid-cols-[1fr_auto] sm:items-start sm:gap-3 sm:text-base">
        <Link href={cardHref} className="min-w-0">
          <h3 className="text-strong">{project.title}</h3>
          <p className="text-muted">{project.summary}</p>
        </Link>
        {project.projectUrl ? (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted transition-colors duration-200 hover:text-strong"
          >
            {project.projectUrlLabel || "View site"}
          </a>
        ) : (
          <Link href={cardHref} className="text-muted transition-colors duration-200 hover:text-strong">
            View research
          </Link>
        )}
      </div>
    </article>
  );
}

function MiniCard({ label, short = false }: { label: string; short?: boolean }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/45 p-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span className="h-2 w-2 rounded-full bg-red-700/80" />
      </div>
      <div className="space-y-2">
        <span className="block h-2 rounded-full bg-black/15" />
        <span className={`block h-2 rounded-full bg-black/10 ${short ? "w-2/3" : "w-5/6"}`} />
      </div>
    </div>
  );
}

function NowContent() {
  return (
    <div className="max-w-content space-y-3 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
      <p>
        <span className="text-xl leading-none text-strong sm:text-2xl">⤔</span> teaching and experimenting with better ways to
        explain complex ideas.
      </p>
      <p>
        <span className="text-xl leading-none text-strong sm:text-2xl">⤔</span> building{" "}
        <a
          href="https://clarioagent.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
        >
          clario
        </a>{" "}
        - ai research agent x{" "}
        <a
          href="https://theweeklyroundup.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
        >
          the weekly roundup
        </a>{" "}
        - ai powered newsletter.
      </p>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="max-w-content space-y-3 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
      <p>i like quiet interfaces, useful systems, and internet corners that feel intentional.</p>
      <p>
        most days, i’m somewhere between teaching, writing, and thinking about how work is
        shifting toward agents.
      </p>
    </div>
  );
}

function PostList({ recentPosts }: { recentPosts: Post[] }) {
  return (
    <>
      {recentPosts.map((post) => (
        <article key={post.slug} className="group">
          <Link
            href={`/articles/${post.slug}`}
            className="flex max-w-content items-baseline justify-between gap-4 text-sm text-strong transition-colors duration-200 hover:text-accent sm:text-base"
          >
            <span>{post.title}.</span>
            <span className="shrink-0 text-muted">{post.date}</span>
          </Link>
        </article>
      ))}
    </>
  );
}

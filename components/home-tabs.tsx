"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { AskAIControl } from "@/components/ask-ai";
import { ContactMiniWindow } from "@/components/contact-mini-window";
import { SendIcon } from "@/components/icons";
import type { Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";

type Tab = "Home" | "About";

type HomeTabsProps = {
  recentPosts: Post[];
  projects: Project[];
  children?: ReactNode;
};

const tabs: Tab[] = ["Home", "About"];

const tabButtonClass =
  "rounded-full px-3 py-1 transition-colors duration-200 hover:bg-bg/70 sm:px-4";

const activeTabButtonClass =
  "rounded-full bg-bg px-3 py-1 shadow-sm transition-colors duration-200 sm:px-4";

export function HomeTabs({ recentPosts, projects, children }: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  return (
    <div className="space-y-10">
      <div className="space-y-10">
        <div className="flex w-full select-none flex-wrap items-center justify-between gap-3">
          <HomeTabNav activeTab={activeTab} onChange={setActiveTab} />
          <AskAIControl />
        </div>
        {children}

        <section className="border-b border-muted/20 pb-10">
          {activeTab === "Home" ? <WorkContent recentPosts={recentPosts} projects={projects} /> : null}
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
        <div className="flex max-w-content items-center justify-between gap-4">
          <h2 className="text-sm uppercase text-accent">FEATURED WORK</h2>
          <Link
            href="/work"
            className="inline-block text-sm text-muted transition-colors duration-200 hover:text-strong sm:text-base"
          >
            View All
          </Link>
        </div>
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
  const cardHref = `/work/${project.slug}`;

  return (
    <article className="group w-full max-w-2xl space-y-3">
      <Link
        href={cardHref}
        className="block overflow-hidden rounded-[1.5rem] border border-black/10 bg-black/[0.05] transition duration-300 hover:bg-black/[0.07]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-bg shadow-sm">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 576px, calc(100vw - 56px)"
            unoptimized={!project.image.src.includes("cdn.sanity.io")}
          />
        </div>
      </Link>

      <div className="grid gap-1 font-sans text-xs sm:grid-cols-[1fr_auto] sm:items-start sm:gap-3 sm:text-sm">
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

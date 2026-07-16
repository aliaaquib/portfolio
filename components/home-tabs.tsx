"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { AskAIControl } from "@/components/ask-ai";
import { ContactMiniWindow } from "@/components/contact-mini-window";
import type { Post } from "@/lib/posts";

type Tab = "Work" | "About";

type HomeTabsProps = {
  recentPosts: Post[];
  children?: ReactNode;
};

const tabs: Tab[] = ["Work", "About"];

const tabButtonClass =
  "rounded-full px-3 py-1 transition-colors duration-200 hover:bg-bg/70 sm:px-4";

const activeTabButtonClass =
  "rounded-full bg-bg px-3 py-1 shadow-sm transition-colors duration-200 sm:px-4";

export function HomeTabs({ recentPosts, children }: HomeTabsProps) {
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
          {activeTab === "Work" ? <WorkContent recentPosts={recentPosts} /> : null}
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
      <Link href="/writings" className={tabButtonClass}>
        Writing
      </Link>
    </nav>
  );
}

function WorkContent({ recentPosts }: HomeTabsProps) {
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
          href="#resume"
          className="inline-flex items-center rounded-full bg-black/[0.05] px-4 py-2 text-strong transition-colors duration-200 hover:bg-black/[0.08]"
        >
          Resume
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm uppercase text-accent">NOW</h2>
        <div className="border-l border-accent/40 pl-5">
          <NowContent />
        </div>
      </section>

      <section className="space-y-10">
        <ClarioWorkCard />
        <ResearchWorkCard />
      </section>

      <section className="space-y-5">
        <div className="flex max-w-content items-center justify-between gap-4">
          <h2 className="text-sm uppercase text-accent">WRITINGS</h2>
          <span className="inline-block text-sm text-muted sm:text-base">
            latest notes
          </span>
        </div>
        <PostList recentPosts={recentPosts} />
      </section>
    </div>
  );
}

function ClarioWorkCard() {
  return (
    <article className="group w-full max-w-3xl space-y-4">
      <Link
        href="/work/clario"
        className="block overflow-hidden rounded-[2rem] bg-black/[0.05] p-6 transition duration-300 hover:bg-black/[0.07] sm:p-10"
      >
        <div className="relative mx-auto aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 bg-bg shadow-sm">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 font-sans text-[10px] text-muted sm:text-xs">
            <div className="flex items-center gap-2 text-strong">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-strong text-[10px] text-bg">
                C
              </span>
              <span>clario</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full bg-black/[0.05] px-3 py-1">research</span>
              <span className="rounded-full bg-black/[0.05] px-3 py-1">sources</span>
              <span className="rounded-full bg-black/[0.05] px-3 py-1">notes</span>
            </div>
          </div>

          <div className="grid h-full gap-4 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:p-5">
            <div className="space-y-3">
              {["question", "sources", "summary"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-black/10 bg-white/45 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                      {item}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-red-700/80" />
                  </div>
                  <div className="space-y-2">
                    <span className="block h-2 rounded-full bg-black/15" />
                    <span
                      className={`block h-2 rounded-full bg-black/10 ${
                        index === 1 ? "w-2/3" : "w-5/6"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/45 p-4">
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
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 font-sans text-sm sm:text-base">
        <Link href="/work/clario" className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-strong">Clario</h3>
          <p className="text-muted">an ai research agent</p>
        </Link>
        <a
          href="https://clarioagent.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-muted transition-colors duration-200 hover:text-strong"
        >
          <span>View site</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function ResearchWorkCard() {
  return (
    <article className="group w-full max-w-3xl space-y-4">
      <Link
        href="/work/lesson-study"
        className="block overflow-hidden rounded-[2rem] bg-black/[0.05] p-6 transition duration-300 hover:bg-black/[0.07] sm:p-10"
      >
        <div className="relative mx-auto aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 bg-bg shadow-sm">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 font-sans text-[10px] text-muted sm:text-xs">
            <div className="flex items-center gap-2 text-strong">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-strong text-[10px] text-bg">
                R
              </span>
              <span>lesson study</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full bg-black/[0.05] px-3 py-1">ict</span>
              <span className="rounded-full bg-black/[0.05] px-3 py-1">math</span>
              <span className="rounded-full bg-black/[0.05] px-3 py-1">research</span>
            </div>
          </div>

          <div className="grid h-full gap-4 p-4 sm:grid-cols-[1.1fr_0.9fr] sm:p-5">
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/45 p-4">
              <div className="mb-4 flex items-center justify-between font-sans text-[10px] text-muted sm:text-xs">
                <span>qualitative case study</span>
                <span>kyrgyzstan</span>
              </div>
              <div className="space-y-3">
                <span className="block h-3 w-5/6 rounded-full bg-strong/80" />
                <span className="block h-2 rounded-full bg-black/12" />
                <span className="block h-2 w-11/12 rounded-full bg-black/12" />
                <span className="block h-2 w-4/5 rounded-full bg-black/12" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {["plan", "teach", "reflect"].map((item) => (
                  <div key={item} className="rounded-2xl bg-black/[0.04] p-3">
                    <span className="mb-4 block h-2 rounded-full bg-black/18" />
                    <span className="font-sans text-[10px] text-muted">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
            </div>

            <div className="space-y-3">
              {["ICT tools", "math concepts", "teacher reflection"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-black/10 bg-white/45 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                      {item}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-red-700/80" />
                  </div>
                  <span className="block h-2 rounded-full bg-black/15" />
                  <span
                    className={`mt-2 block h-2 rounded-full bg-black/10 ${
                      index === 2 ? "w-3/5" : "w-5/6"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 font-sans text-sm sm:text-base">
        <Link href="/work/lesson-study" className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-strong">Lesson Study Research</h3>
          <p className="text-muted">digital technology in ICT and mathematics instruction</p>
        </Link>
        <Link
          href="/work/lesson-study"
          className="inline-flex items-center gap-1 text-muted transition-colors duration-200 hover:text-strong"
        >
          <span>View research</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

function NowContent() {
  return (
    <div className="max-w-content space-y-3 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
      <p>teaching and experimenting with better ways to explain complex ideas.</p>
      <p>
        building{" "}
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
      <p>writing poetry and slowly working on a book - "pata hai aaj kya hua".</p>
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

function PostList({ recentPosts }: HomeTabsProps) {
  return (
    <>
      {recentPosts.map((post) => (
        <article key={post.slug} className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm uppercase tracking-[0.18em] text-muted sm:text-base">
              {post.date}
            </p>
          </div>
          <Link
            href={`/writings/${post.slug}`}
            className="inline-block text-sm text-strong transition-colors duration-200 hover:text-accent sm:text-base"
          >
            {post.title}
          </Link>
          <p className="max-w-content text-sm leading-7 text-muted sm:text-base sm:leading-8">
            {post.summary}
          </p>
        </article>
      ))}
    </>
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

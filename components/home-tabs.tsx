"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Post } from "@/lib/posts";

type Tab = "Work" | "About" | "Writing";

type HomeTabsProps = {
  recentPosts: Post[];
  children?: ReactNode;
};

const tabs: Tab[] = ["Work", "About", "Writing"];

const tabButtonClass =
  "rounded-full px-3 py-1 transition-colors duration-200 hover:bg-bg/70 sm:px-4";

const activeTabButtonClass =
  "rounded-full bg-bg px-3 py-1 shadow-sm transition-colors duration-200 sm:px-4";

export function HomeTabs({ recentPosts, children }: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Work");
  const [isAskOpen, setIsAskOpen] = useState(false);

  return (
    <div
      className={
        isAskOpen
          ? "space-y-10 lg:pr-[24rem]"
          : "space-y-10"
      }
    >
      <div className="space-y-10">
        <div className="flex w-full select-none flex-wrap items-center justify-between gap-3">
          <HomeTabNav activeTab={activeTab} onChange={setActiveTab} />
          <button
            type="button"
            onClick={() => setIsAskOpen(true)}
            className="inline-flex items-center gap-2 rounded-full px-1 py-1 font-sans text-xs text-muted transition-colors duration-200 hover:text-strong sm:text-sm"
          >
            <SparkleIcon className="h-4 w-4 text-muted" />
            <span>Ask AI</span>
          </button>
        </div>
        {children}

        <section className="border-b border-muted/20 pb-10">
          {activeTab === "Work" ? <WorkContent recentPosts={recentPosts} /> : null}
          {activeTab === "About" ? <AboutContent /> : null}
          {activeTab === "Writing" ? <WritingContent recentPosts={recentPosts} /> : null}
        </section>
      </div>
      {isAskOpen ? <AskAIPanel onClose={() => setIsAskOpen(false)} /> : null}
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

      <section className="space-y-5">
        <div className="flex max-w-content items-center justify-between gap-4">
          <h2 className="text-sm uppercase text-accent">STREAM</h2>
          <span className="inline-block text-sm text-muted sm:text-base">
            latest notes
          </span>
        </div>
        <PostList recentPosts={recentPosts} />
      </section>
    </div>
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

function WritingContent({ recentPosts }: HomeTabsProps) {
  return (
    <div className="space-y-5">
      <div className="flex max-w-content items-center justify-between gap-4">
        <h2 className="text-sm uppercase text-accent">writing</h2>
        <Link
          href="/feed"
          className="inline-block text-sm text-muted transition-colors duration-200 hover:text-accent sm:text-base"
        >
          view full feed
        </Link>
      </div>
      <PostList recentPosts={recentPosts} />
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
            <Link
              href={`/${post.category}`}
              className="text-sm uppercase tracking-[0.18em] text-accent/70 transition-colors duration-200 hover:text-accent sm:text-base"
            >
              {post.category}
            </Link>
          </div>
          <Link
            href={`/${post.category}/${post.slug}`}
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

function AskAIPanel({ onClose }: { onClose: () => void }) {
  const prompts = [
    "What's Aaquib working on?",
    "Tell me about Clario",
    "Can you tell me more about Aaquib?",
    "What's his teaching + AI background?",
  ];

  return (
    <aside className="fixed inset-y-0 right-9 z-40 flex h-screen min-h-screen w-full max-w-[22rem] select-none flex-col bg-black/[0.04] py-4 pl-4 pr-7 font-sans text-strong shadow-sm supports-[height:100dvh]:h-dvh">
      <header className="flex items-center justify-between border-b border-black/10 pb-4">
        <div className="flex items-center gap-2">
          <SparkleIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-medium sm:text-base">Ask Aaquib</h2>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-black/30 text-[10px] text-white">
              i
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-2xl leading-none text-black/50 transition-colors hover:text-black"
          aria-label="Close Ask AI"
        >
          ×
        </button>
      </header>

      <div className="flex-1 py-6">
        <h3 className="mb-6 text-2xl leading-tight tracking-tight">Ask me anything.</h3>
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="group flex items-start gap-3 text-left text-sm leading-6 text-black/65 transition-colors hover:text-black sm:text-base"
            >
              <span className="text-lg leading-6 text-blue-600 transition-transform group-hover:translate-x-1">
                  ↳
              </span>
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      <form className="mb-10 rounded-3xl bg-bg p-4 shadow-sm">
        <label htmlFor="ask-ai-input" className="sr-only">
          Ask about Aaquib
        </label>
        <input
          id="ask-ai-input"
          type="text"
          disabled
          placeholder="Ask about Aaquib..."
          className="mb-6 w-full bg-transparent text-sm text-black/70 outline-none placeholder:text-black/45 sm:text-base"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-black/55"
            >
              <SparkleIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-sm text-black/55"
            >
              ▰
            </button>
          </div>
          <button
            type="submit"
            disabled
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-200 text-xl text-white"
          >
            ↑
          </button>
        </div>
      </form>
    </aside>
  );
}

function ContactMiniWindow({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 top-0 z-50 select-none origin-top-left animate-contact-pop font-sans">
      <section className="w-[min(18rem,calc(100vw-2rem))] rounded-[1.5rem] border border-muted/20 bg-bg px-5 py-5 text-strong shadow-2xl">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-xs text-muted sm:text-sm">Get in touch</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xl leading-none text-muted transition-colors hover:text-strong"
            aria-label="Close contact window"
          >
            ×
          </button>
        </header>

        <div className="space-y-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="mb-1.5 text-xs text-muted">Email</p>
              <a
                href="mailto:imaaquibali@gmail.com"
                className="text-sm leading-tight text-strong transition-opacity hover:opacity-80 sm:text-base"
              >
                imaaquibali@gmail.com
              </a>
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText("imaaquibali@gmail.com")}
              className="text-muted transition-colors hover:text-strong"
              aria-label="Copy email"
            >
              <CopyIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="mb-1.5 text-xs text-muted">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/aliaaquib"
                target="_blank"
                rel="noreferrer"
                className="text-sm leading-tight text-strong transition-opacity hover:opacity-80 sm:text-base"
              >
                @aliaaquib
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/aliaaquib"
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-strong"
              aria-label="Open LinkedIn"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M11.2 2.4c.3-.8 1.4-.8 1.7 0l1.5 4a4.5 4.5 0 0 0 2.6 2.6l4 1.5c.8.3.8 1.4 0 1.7l-4 1.5a4.5 4.5 0 0 0-2.6 2.6l-1.5 4c-.3.8-1.4.8-1.7 0l-1.5-4a4.5 4.5 0 0 0-2.6-2.6l-4-1.5c-.8-.3-.8-1.4 0-1.7l4-1.5a4.5 4.5 0 0 0 2.6-2.6l1.5-4Z" />
      <path d="M19 1.8c.2-.5.9-.5 1.1 0l.5 1.4c.2.5.6.9 1.1 1.1l1.4.5c.5.2.5.9 0 1.1l-1.4.5c-.5.2-.9.6-1.1 1.1l-.5 1.4c-.2.5-.9.5-1.1 0l-.5-1.4c-.2-.5-.6-.9-1.1-1.1L16 5.9c-.5-.2-.5-.9 0-1.1l1.4-.5c.5-.2.9-.6 1.1-1.1l.5-1.4Z" />
    </svg>
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

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <rect x="4" y="4" width="11" height="11" rx="2" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

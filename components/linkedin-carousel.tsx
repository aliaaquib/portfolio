"use client";

import { useRef, useState } from "react";

type Post = {
  date: string;
  headline: string;
  excerpt: string;
  url: string;
};

const POSTS: Post[] = [
  {
    date: "23 Sep 2026",
    headline: "Computer Science Teacher | CS concepts, explained simply",
    excerpt:
      "I'm a computer science teacher.\n\nMost of my day goes into turning things students find confusing into things they don't. Recursion, Big-O, pointers, how the internet actually works — the usual suspects. Explaining clearly is basically my whole job, so I figured I'd start doing it here too.\n\nHere's what I'll be posting about: CS concepts explained simply, how AI actually works (no hype, no jargon), and the occasional classroom story.",
    url: "https://www.linkedin.com/in/aliaaquib",
  },
];

function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex w-[86%] shrink-0 snap-start flex-col rounded-xl border border-strong/10 bg-white p-4 sm:w-[330px]">
      <header className="flex items-start gap-2.5">
        <img
          src="/portrait.jpg"
          alt="Aaquib Ali"
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-strong">
            Aaquib Ali{" "}
            <span className="ml-0.5 inline-block rounded bg-[#0a66c2] px-1 text-[10px] font-bold leading-4 text-white">
              in
            </span>
          </p>
          <p className="truncate text-xs text-muted">{post.headline}</p>
          <p className="text-xs text-muted">{post.date}</p>
        </div>
      </header>
      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text/90 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] overflow-hidden">
        {post.excerpt}{" "}
        <a href={post.url} target="_blank" rel="noreferrer" className="text-[#0a66c2] hover:underline">
          …more
        </a>
      </p>
      <a
        href={post.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brandred underline decoration-brandred/40 underline-offset-4 transition hover:decoration-brandred"
      >
        View post ↗
      </a>
    </article>
  );
}

export function LinkedInCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function scrollTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(POSTS.length - 1, i));
    const card = track.children[next] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft - 16, behavior: "smooth" });
    }
    setIndex(next);
  }

  return (
    <div>
      <div className="rounded-2xl bg-[#efefec] p-4 sm:p-5">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
        >
          {POSTS.map((post) => (
            <PostCard key={post.date} post={post} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-muted">
          {index + 1} / {POSTS.length}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          {POSTS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-[#0a66c2]" : "bg-strong/20"}`}
            />
          ))}
        </span>
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous post"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-strong/15 text-strong transition enabled:hover:border-strong/40 disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollTo(index + 1)}
            disabled={index === POSTS.length - 1}
            aria-label="Next post"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-strong/15 text-strong transition enabled:hover:border-strong/40 disabled:opacity-30"
          >
            →
          </button>
        </span>
      </div>
    </div>
  );
}

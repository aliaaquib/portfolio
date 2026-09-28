"use client";

import { Reveal } from "@/components/reveal";
import { ProjectPreviewZone } from "@/components/project-preview";

function ProjectCard({
  id,
  title,
  label,
  previewMetric,
  description,
  href,
  image,
  imageAlt,
}: {
  id: string;
  title: string;
  label: string;
  previewMetric?: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <Reveal
      as="article"
      id={id}
      className="scroll-mt-24"
      data-preview-title={title}
      data-preview-url={href}
      data-preview-metric={previewMetric}
      data-preview-status="Live"
      data-preview-image={image}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group block overflow-hidden rounded-2xl border border-strong/10 bg-surface shadow-[0_1px_4px_rgba(17,17,17,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(17,17,17,0.10)]"
      >
        {/* visual */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-strong/10 bg-[#f4f1ea] dark:bg-[#2b241e]">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-strong/10 bg-surface/90 px-2.5 py-1 text-xs font-medium text-green-800 backdrop-blur-sm dark:text-green-400">
            <i className="block h-1.5 w-1.5 rounded-full bg-green-700" />
            Live
          </span>
        </div>
        {/* body */}
        <div className="p-6">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">
            {label}
          </p>
          <h4 className="mt-2 font-display text-[24px] leading-tight text-strong">
            {title}
          </h4>
          <p className="mt-2 text-[14px] leading-6 text-text/80">{description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[15px] font-medium text-brandred underline decoration-brandred/50 underline-offset-4 transition group-hover:decoration-brandred">
            View live <span aria-hidden="true">↗</span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}

// The single source of truth for "our work": Thread Academy + Clario.
export function WorkGrid() {
  return (
    <ProjectPreviewZone>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ProjectCard
          id="work-academy"
          title="Thread Academy"
          label="Education platform"
          previewMetric="15,422 pages across 28 subjects"
          description="A free learning platform covering the full school curriculum — every chapter reads like a textbook page."
          href="https://threadlearning.vercel.app"
          image="/images/work/thread-academy.png"
          imageAlt="Thread Academy homepage"
        />
        <ProjectCard
          id="work-clario"
          title="Clario"
          label="AI research agent"
          previewMetric="AI research agent"
          description="Turns a rough question into a clear, sourced briefing. Ask loosely, get something you can actually use."
          href="https://clarioagent.vercel.app"
          image="/images/work/clario-homepage.png"
          imageAlt="Clario homepage"
        />
      </div>
    </ProjectPreviewZone>
  );
}

import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Pill } from "@/components/pill";
import { LinkedInCarousel } from "@/components/linkedin-carousel";
import { WritingList } from "@/components/writing-list";
import { FindMeGrid } from "@/components/find-me-grid";
import { RightNow } from "@/components/right-now";
import { WhiteboardNote } from "@/components/whiteboard-note";
import { GlassesAnnotation } from "@/components/glasses-annotation";
import { ExperienceSection } from "@/components/experience";
import { getSortedPosts } from "@/lib/posts";
import { Reveal } from "@/components/reveal";
import { ContactButton } from "@/components/contact-modal";
import { ProjectPreviewZone } from "@/components/project-preview";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export const revalidate = 60;

const RESUME_URL =
  "https://drive.google.com/file/d/1OCadGX_mn3dTkS7x58cs27twIOzd92cD/view?usp=sharing";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-4xl tracking-tight text-strong sm:text-[44px]">
      <span aria-hidden="true" className="section-tick" />
      {children}
    </h2>
  );
}

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

export default async function Home() {
  const articles = await getSortedPosts();

  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6">
        {/* ── hero ─────────────────────────────────────────── */}
        <header className="animate-fade-in pb-16 pt-10 sm:pt-14 lg:pt-5">
          <GlassesAnnotation />
          <div className="flex items-center gap-5 sm:gap-8">
            <img
              src="/portrait.jpg"
              alt="Aaquib Ali"
              width={104}
              height={104}
              className="h-20 w-20 shrink-0 rounded-full border border-strong/10 object-cover shadow-[0_2px_12px_rgba(17,17,17,0.08)] sm:h-[104px] sm:w-[104px]"
            />
            <h1 className="font-display text-[30px] leading-[1.12] tracking-tight text-strong sm:text-[44px]">
              Teacher by day,
              <br />
              builder the rest of the time.
            </h1>
          </div>
          <WhiteboardNote className="mt-4 text-[26px] text-[#c82828]">
            ↓ teacher mode: on — ask me anything
          </WhiteboardNote>
          <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-8 text-text/90 sm:text-base">
            <p>
              I&apos;m Aaquib Ali, a computer science teacher and builder in Bishkek,
              Kyrgyzstan. I spend my days turning{" "}
              <Pill dotted tooltip="My go-to first lesson.">
                Recursion
              </Pill>{" "}
              <Pill dotted tooltip="Why your loop is slow, explained on one whiteboard.">
                Big-O
              </Pill>{" "}
              and{" "}
              <Pill dotted tooltip="Next-word prediction, no hype. The lesson students quote back to me.">
                how AI actually works
              </Pill>{" "}
              into things my students find obvious.
            </p>
            <p>
              I take ideas all the way to working products — lately{" "}
              <Pill dotted href="#work-clario" tooltip="An AI research agent that turns a rough question into a clear, sourced briefing.">
                Clario
              </Pill>
              , an AI research agent, and{" "}
              <Pill dotted href="#work-roundup" tooltip="An AI-powered newsletter that compresses the week's noise into a five-minute read.">
                The Weekly Roundup
              </Pill>
              , an AI newsletter. I&apos;m also building{" "}
              <Pill dotted href="#work-academy" tooltip="A free learning platform covering the full school curriculum.">
                Thread Academy
              </Pill>
              , and writing a book of raw thoughts,{" "}
              <em className="font-display">
                <Pill dotted href="/articles" tooltip="A book of raw thoughts.">
                  pata hai aaj kya hua
                </Pill>
              </em>
              . Away from the classroom, I write the occasional{" "}
              <em className="font-display">
                <Pill dotted href="/articles" tooltip="Poems, occasionally.">
                  poem
                </Pill>
              </em>
              .
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <ContactButton className="rounded-full bg-strong px-6 py-2.5 text-[15px] font-medium text-bg transition hover:bg-brandred" />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[15px] text-strong underline decoration-strong/30 underline-offset-4 transition hover:decoration-brandred hover:text-brandred"
            >
              Download resume
            </a>
          </div>
        </header>

        {/* ── work ───────────────────────────────────────────── */}
        <section id="work" className="scroll-mt-20 pb-20">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
              selected work
            </p>
            <div className="mt-3">
              <SectionHeading>Proof of shipped things</SectionHeading>
            </div>
            <WhiteboardNote className="mt-2 text-[24px] text-[#2f6fd0]">
              homework: click a project
            </WhiteboardNote>
          </Reveal>
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
        </section>

        {/* ── career / experience ──────────────────────────────── */}
        <section id="career" className="scroll-mt-20 pb-20">
          <Reveal>
            <ExperienceSection />
            <WhiteboardNote className="mt-2 text-[24px] text-[#2e7d46]">
              this is the day job
            </WhiteboardNote>
          </Reveal>
        </section>

        {/* ── on linkedin ──────────────────────────────────── */}
        <section className="pb-24">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
              on the timeline
            </p>
            <div className="mt-3">
              <SectionHeading>On LinkedIn</SectionHeading>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="text-[15px] text-text/80">Latest original posts</p>
              <a
                href="https://www.linkedin.com/in/aliaaquib"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-[15px] text-strong underline decoration-strong/30 underline-offset-4 transition hover:decoration-brandred hover:text-brandred"
              >
                View LinkedIn ↗
              </a>
            </div>
            <WhiteboardNote className="mt-2 text-[24px] text-[#c14e22]">
              field notes from the classroom
            </WhiteboardNote>
          </Reveal>
          <Reveal delay={120} className="mt-5">
            <LinkedInCarousel />
          </Reveal>
        </section>

        {/* ── right now: two dots on a globe ─────────────── */}
        <RightNow />

        {/* ── writing ──────────────────────────────────────── */}
        <section className="pb-24">
          <Reveal>
            <SectionHeading>Writing</SectionHeading>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="text-[15px] text-text/80">CS and AI, explained simply.</p>
              <a
                href="/articles"
                className="shrink-0 text-[15px] text-strong underline decoration-strong/30 underline-offset-4 transition hover:decoration-brandred hover:text-brandred"
              >
                View all ↗
              </a>
            </div>
            <WhiteboardNote className="mt-2 text-[24px] text-[#2f6fd0]">
              required reading* (*not really)
            </WhiteboardNote>
          </Reveal>
          <Reveal delay={120} className="mt-5">
            <WritingList posts={articles} />
          </Reveal>
        </section>

        {/* ── find me ────────────────────────────────────── */}
        <section className="pb-24">
          <Reveal>
            <SectionHeading>You can usually find me</SectionHeading>
            <p className="mt-4 text-[15px] text-text/80">
              teaching, building, or writing — usually all three.
            </p>
            <WhiteboardNote className="mt-2 text-[24px] text-[#c82828]">
              see? told you
            </WhiteboardNote>
          </Reveal>
          <FindMeGrid />
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

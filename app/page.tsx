import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Pill } from "@/components/pill";
import { LinkedInCarousel } from "@/components/linkedin-carousel";
import { WritingList } from "@/components/writing-list";
import { FindMeGrid } from "@/components/find-me-grid";
import { RightNow } from "@/components/right-now";
import { WhiteboardNote } from "@/components/whiteboard-note";
import { ExperienceSection } from "@/components/experience";
import { getSortedPosts } from "@/lib/posts";
import { Reveal } from "@/components/reveal";
import { ContactButton } from "@/components/contact-modal";
import { WorkGrid } from "@/components/work-grid";
import { Ventures } from "@/components/ventures";

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

export default async function Home() {
  const articles = await getSortedPosts();

  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6">
        {/* ── hero ─────────────────────────────────────────── */}
        <header className="animate-fade-in pb-16 pt-10 sm:pt-14 lg:pt-5">
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
              I&apos;m Aaquib Ali, a computer science teacher and builder in Manas,
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

        {/* ── career / experience ──────────────────────────────── */}
        <section id="career" className="scroll-mt-20 pb-20">
          <Reveal>
            <ExperienceSection />
            <WhiteboardNote className="mt-2 text-[24px] text-[#2e7d46]">
              this is the day job
            </WhiteboardNote>
          </Reveal>
        </section>

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
          <WorkGrid />
        </section>

        {/* ── ventures ───────────────────────────────────────── */}
        <section className="scroll-mt-20 pb-20 md:w-[calc(100%+3rem)]">
          <Ventures />
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

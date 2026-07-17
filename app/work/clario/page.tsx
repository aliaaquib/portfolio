import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { PageActions } from "@/components/page-actions";
import { SectionNav } from "@/components/section-nav";

const sections = [
  {
    title: "Overview",
    paragraphs: [
      "Clario is an AI research agent built around a simple idea: research should feel less like opening fifteen tabs and more like moving through a clear thinking loop.",
      "The product takes a rough question, breaks it into useful research angles, gathers source-backed notes, and turns the result into a concise brief that can be reviewed, edited, and reused.",
      "I wanted the experience to stay calm. No dashboard noise, no fake certainty, no giant interface pretending to be a command center. Just a focused place to ask, inspect, and shape the answer.",
    ],
  },
  {
    title: "Research loop",
    paragraphs: [
      "The first challenge was deciding where the agent should be helpful and where it should stay out of the way. A research tool can easily become too automatic: it finds things, summarizes them, and leaves the user wondering what actually happened.",
      "Clario is designed around visible steps. The question becomes a small plan. The plan becomes source cards. The source cards become a brief. Each stage gives the user enough context to trust, change, or reject the output.",
      "That structure matters because research is not only about getting an answer. It is about knowing why the answer is reasonable, what it depends on, and where it might still be weak.",
    ],
  },
  {
    title: "Interface system",
    paragraphs: [
      "The interface uses a narrow visual language: soft surfaces, clear cards, small labels, and a strong reading column. It avoids the feeling of a heavy productivity app.",
      "Most of the UI is built around three repeatable objects: questions, sources, and briefs. Keeping those objects consistent made the product easier to understand and easier to extend.",
      "The goal was not to make the agent look magical. The goal was to make the process inspectable. A good research interface should make the machine’s work easier to question.",
    ],
  },
  {
    title: "What it does",
    paragraphs: [
      "Clario can turn a rough topic into a research brief, organize findings into source-aware notes, and help users move from scattered context to a cleaner point of view.",
      "A typical flow starts with a question. The agent suggests research directions, collects supporting material, highlights useful details, and drafts a brief with enough structure to edit quickly.",
      "The important part is that the output is not treated as final truth. It is treated as a working draft: something to read, challenge, revise, and build from.",
    ],
  },
  {
    title: "What I learned",
    paragraphs: [
      "The biggest lesson was that AI products need strong containers. If the surrounding product is vague, the model has to guess too much. If the container is clear, the model feels more useful because the user understands the shape of the work.",
      "I also learned that trust is mostly designed in the quiet details: status labels, source visibility, clear empty states, and simple ways to return to the previous step.",
      "Clario is still a small system, but that is exactly why it feels useful. It does not try to replace thinking. It gives thinking a calmer place to happen.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Clario",
  description: "A project case study for Clario, an AI research agent by Aaquib Ali.",
  alternates: {
    canonical: "/work/clario",
  },
};

export default function ClarioPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <article className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-14">
        <PageActions />

        <header className="mx-auto max-w-3xl space-y-6 pb-10 pt-24 text-center sm:pt-28">
          <p className="font-sans text-xs text-muted sm:text-sm">Clario</p>
          <h1 className="mx-auto max-w-3xl text-3xl leading-tight tracking-tight text-strong sm:text-5xl">
            building a calmer way to research with ai
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            an AI research agent for turning scattered questions into source-aware briefs.
          </p>
          <div className="mx-auto max-w-2xl border-t border-muted/20" />
          <dl className="mx-auto grid max-w-2xl grid-cols-2 gap-5 pt-4 font-sans text-xs sm:grid-cols-4 sm:text-sm">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-2 text-strong">Design + build</dd>
            </div>
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="mt-2 text-strong">2026</dd>
            </div>
            <div>
              <dt className="text-muted">Type</dt>
              <dd className="mt-2 text-strong">AI research</dd>
            </div>
            <div>
              <dt className="text-muted">Live</dt>
              <dd className="mt-2">
                <a
                  href="https://clarioagent.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-strong underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  View site
                </a>
              </dd>
            </div>
          </dl>
          <figure className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-muted/15 bg-black/[0.03]">
            <img
              src="/images/work/clario-hero.svg"
              alt="Clario AI research agent interface preview"
              className="aspect-[16/10] w-full object-cover"
            />
          </figure>
        </header>

        <div className="relative mx-auto grid max-w-5xl gap-10 pb-8 pt-16 lg:grid-cols-[minmax(0,38rem)] lg:justify-center">
          <SectionNav
            items={sections.map((section, index) => ({
              id: `section-${index}`,
              title: section.title,
            }))}
          />

          <div className="space-y-12 border-b border-muted/20 pb-6">
            {sections.map((section, index) => (
              <section key={section.title} id={`section-${index}`} className="scroll-mt-24 space-y-5">
                <h2 className="text-xl leading-tight text-strong sm:text-2xl">{section.title}</h2>
                <div className="space-y-6 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {index === 1 ? (
                  <figure className="overflow-hidden rounded-[1.75rem] border border-muted/15 bg-black/[0.03]">
                    <img
                      src="/images/work/clario-flow.svg"
                      alt="Clario research flow from question to sources to brief"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </figure>
                ) : null}
                {index === 3 ? (
                  <figure className="overflow-hidden rounded-[1.75rem] border border-muted/15 bg-black/[0.03]">
                    <img
                      src="/images/work/clario-brief.svg"
                      alt="Clario source-aware brief interface detail"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </figure>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <SiteFooter />
        </div>
      </article>
    </main>
  );
}

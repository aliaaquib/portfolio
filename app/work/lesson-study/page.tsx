import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { PageActions } from "@/components/page-actions";
import { SectionNav } from "@/components/section-nav";

const sections = [
  {
    title: "Overview",
    paragraphs: [
      "This research explores how digital technology can be integrated into ICT and mathematics instruction through lesson study in a Kyrgyzstani secondary school.",
      "The focus is not technology as decoration. The study looks at how teachers plan together, test a lesson, observe student learning, and refine instruction when digital tools are part of the classroom design.",
      "As a qualitative case study, the project pays attention to context: teacher collaboration, available devices, classroom routines, student response, and the practical realities of school life in Kyrgyzstan.",
    ],
  },
  {
    title: "Research focus",
    paragraphs: [
      "The central question is how lesson study can support teachers in making digital technology meaningful in ICT and mathematics lessons.",
      "In many schools, technology is introduced as a tool before teachers have enough time to redesign the learning experience around it. Lesson study offers a slower and more reflective structure: plan, teach, observe, discuss, revise.",
      "This matters for ICT and mathematics because both subjects can benefit from visualisation, simulation, collaboration, and immediate feedback, but only when the tool serves the concept being taught.",
    ],
  },
  {
    title: "Methodology",
    paragraphs: [
      "The study uses a qualitative case-study approach because the aim is to understand process, experience, and classroom meaning rather than measure a single outcome.",
      "Data can include lesson plans, observation notes, teacher reflections, student work, interview responses, and artefacts from digital activities. Together, these materials show how the lesson changed and why those changes mattered.",
      "The lesson study cycle becomes both the professional-development model and the research lens. Each stage reveals something different: planning shows teacher intention, observation shows student response, and reflection shows how teachers interpret what happened.",
    ],
  },
  {
    title: "Classroom design",
    paragraphs: [
      "A strong digitally supported lesson starts with the learning goal, not the device. In mathematics, that might mean using a graphing tool to make a function visible. In ICT, it might mean using collaborative documents or code environments to make thinking shareable.",
      "The design challenge is to keep the technology close to the concept. Students should not spend most of the lesson learning where to click. They should use the tool to notice patterns, test ideas, explain reasoning, or compare strategies.",
      "Lesson study helps because teachers can observe where students struggle: the mathematical concept, the digital interface, the instruction wording, or the transition between tasks.",
    ],
  },
  {
    title: "Findings",
    paragraphs: [
      "The expected findings point toward a practical pattern: digital technology becomes more effective when teachers have structured time to collaboratively design, observe, and revise lessons.",
      "Teachers may gain confidence not simply because they use more tools, but because they see how students respond and can adjust the next lesson with evidence from the classroom.",
      "The study also highlights constraints: uneven access to devices, limited time for collaboration, different teacher comfort levels, and the need for school-level support.",
    ],
  },
  {
    title: "Why it matters",
    paragraphs: [
      "For Kyrgyzstani schools, the question is not only whether digital tools are available. It is whether teachers are supported in using them thoughtfully.",
      "Lesson study gives technology integration a human structure. It treats teachers as designers of learning, not just users of platforms.",
      "The broader value of the research is its reminder that meaningful digital transformation in education is slow, local, collaborative, and deeply tied to the realities of the classroom.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Lesson Study Research",
  description:
    "A qualitative case study on integrating digital technology into ICT and mathematics instruction through lesson study in a Kyrgyzstani secondary school.",
  alternates: {
    canonical: "/work/lesson-study",
  },
};

export default function LessonStudyPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <article className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-14">
        <PageActions />

        <header className="mx-auto max-w-3xl space-y-6 pb-10 pt-24 text-center sm:pt-28">
          <p className="font-sans text-xs text-muted sm:text-sm">Research</p>
          <h1 className="mx-auto max-w-3xl text-3xl leading-tight tracking-tight text-strong sm:text-5xl">
            integrating digital technology into ICT and mathematics instruction
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            a qualitative case study through lesson study in a Kyrgyzstani secondary school.
          </p>
          <div className="mx-auto max-w-2xl border-t border-muted/20" />
          <dl className="mx-auto grid max-w-2xl grid-cols-2 gap-5 pt-4 font-sans text-xs sm:grid-cols-4 sm:text-sm">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-2 text-strong">Researcher</dd>
            </div>
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="mt-2 text-strong">2026</dd>
            </div>
            <div>
              <dt className="text-muted">Type</dt>
              <dd className="mt-2 text-strong">Case study</dd>
            </div>
            <div>
              <dt className="text-muted">Focus</dt>
              <dd className="mt-2 text-strong">ICT + math</dd>
            </div>
          </dl>
          <figure className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-muted/15 bg-black/[0.03]">
            <img
              src="/images/work/lesson-study-hero.svg"
              alt="Lesson study research interface with classroom planning cards"
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
                {index === 2 ? (
                  <figure className="overflow-hidden rounded-[1.75rem] border border-muted/15 bg-black/[0.03]">
                    <img
                      src="/images/work/lesson-study-cycle.svg"
                      alt="Lesson study cycle showing plan teach observe reflect revise"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </figure>
                ) : null}
                {index === 3 ? (
                  <figure className="overflow-hidden rounded-[1.75rem] border border-muted/15 bg-black/[0.03]">
                    <img
                      src="/images/work/digital-classroom.svg"
                      alt="Digital classroom layout for ICT and mathematics instruction"
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

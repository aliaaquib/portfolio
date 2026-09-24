import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Pill } from "@/components/pill";
import { LinkedInCarousel } from "@/components/linkedin-carousel";
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

function LivePill() {
  return (
    <span className="inline-flex -translate-y-0.5 items-center rounded-full border border-green-700/50 px-2.5 py-0.5 text-xs font-medium text-green-800">
      Live
    </span>
  );
}

function ViewLive({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-flex items-center gap-1 text-[15px] font-medium text-brandred underline decoration-brandred/50 underline-offset-4 transition hover:decoration-brandred"
    >
      View live ↗
    </a>
  );
}

function GradCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M12 4L2 9l10 5 10-5-10-5Z" strokeLinejoin="round" />
      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" />
      <path d="M22 9v5" strokeLinecap="round" />
    </svg>
  );
}

type Role = { title: string; dates: string; dot: string };

function EmployerBlock({
  id,
  icon,
  name,
  sub,
  roles,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  name: string;
  sub: string;
  roles: Role[];
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div id={id} className="grid scroll-mt-24 gap-8 border-t border-strong/10 py-10 sm:grid-cols-[220px_1fr] sm:gap-6">
        <div className="sm:sticky sm:top-20 sm:self-start">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-strong text-bg">
              {icon}
            </span>
            <h3 className="text-[17px] font-semibold leading-snug text-strong">{name}</h3>
          </div>
          <p className="mt-3 text-sm text-muted">{sub}</p>
          <ul className="mt-5 space-y-4">
            {roles.map((role) => (
              <li key={role.title} className="relative pl-4">
                <span aria-hidden="true" className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full" style={{ backgroundColor: role.dot }} />
                <p className="text-[15px] font-medium text-strong">{role.title}</p>
                <p className="mt-0.5 text-sm text-muted">{role.dates}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="divide-y divide-strong/10 border-strong/10 sm:border-l sm:pl-8">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({
  id,
  title,
  metric,
  previewMetric,
  description,
  href,
}: {
  id: string;
  title: string;
  metric?: React.ReactNode;
  previewMetric?: string;
  description: string;
  href: string;
}) {
  return (
    <Reveal
      as="article"
      id={id}
      className="scroll-mt-24 rounded-2xl border border-strong/10 bg-white p-6 shadow-[0_1px_4px_rgba(17,17,17,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(17,17,17,0.10)] sm:p-7"
      data-preview-title={title}
      data-preview-url={href}
      data-preview-metric={previewMetric}
      data-preview-status="Live"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h4 className="text-[17px] font-semibold text-strong">{title}</h4>
        <LivePill />
      </div>
      {metric ? (
        <p className="mt-2 font-display text-[22px] leading-snug text-strong">{metric}</p>
      ) : null}
      <p className="mt-2 max-w-xl text-[15px] leading-7 text-text/90">{description}</p>
      <ViewLive href={href} />
    </Reveal>
  );
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6">
        {/* ── hero ─────────────────────────────────────────── */}
        <header className="animate-fade-in pb-16 pt-10 sm:pt-14">
          <img
            src="/portrait.jpg"
            alt="Aaquib Ali"
            width={140}
            height={175}
            className="h-[175px] w-[140px] rounded-xl border border-strong/10 object-cover shadow-[0_2px_12px_rgba(17,17,17,0.08)]"
          />
          <h1 className="mt-7 font-display text-[44px] leading-[1.08] tracking-tight text-strong sm:text-[58px]">
            Teacher by day,
            <br />
            builder the rest of the time.
          </h1>
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
            <SectionHeading>Work</SectionHeading>
          </Reveal>
          <ProjectPreviewZone>
            <div className="mt-6 grid gap-5">
              <ProjectCard
                id="work-academy"
                title="Thread Academy"
                metric={<><mark className="highlight">15,422 pages</mark> across 28 subjects</>}
                previewMetric="15,422 pages across 28 subjects"
                description="A free learning platform covering the full school curriculum — every chapter reads like a textbook page. Built with Next.js and exported as a fully static site."
                href="https://threadlearning.vercel.app"
              />
              <ProjectCard
                id="work-clario"
                title="Clario"
                previewMetric="AI research agent"
                description="An AI research agent that turns a rough question into a clear, sourced briefing. Ask loosely, get something you can actually use."
                href="https://clarioagent.vercel.app"
              />
              <ProjectCard
                id="work-roundup"
                title="The Weekly Roundup"
                previewMetric="AI-powered newsletter"
                description="An AI-powered newsletter that compresses the week's noise into a five-minute read."
                href="https://theweeklyroundup.vercel.app"
              />
            </div>
          </ProjectPreviewZone>
        </section>

        {/* ── career ───────────────────────────────────────── */}
        <section id="career" className="scroll-mt-20 pb-20">
          <Reveal>
            <SectionHeading>Career</SectionHeading>
          </Reveal>

          <div className="mt-6">
            <EmployerBlock
              id="career-sapat"
              icon={<GradCapIcon />}
              name={'"SAPAT" International Educational Institution — Kurmanbek Baatyr Branch'}
              sub="Manas, Kyrgyzstan"
              roles={[{ title: "Computer Science Teacher", dates: "2023 – Present", dot: "#2e7d46" }]}
            >
              <Reveal as="article" className="py-7 first:pt-0 last:pb-0 sm:first:pt-1">
                <ul className="max-w-xl list-disc space-y-3 pl-5 text-[15px] leading-7 text-text/90 marker:text-muted">
                  <li>Deliver engaging Cambridge IGCSE Computer Science and ICT lessons using inquiry-based, project-based, and student-centred learning strategies to develop computational thinking, problem-solving, and digital literacy.</li>
                  <li>Plan and deliver schemes of work, lesson plans, assessments, and learning resources aligned with Cambridge International curriculum standards and learning objectives.</li>
                  <li>Integrate Python programming, web development, artificial intelligence tools, and educational technology into classroom instruction to prepare students with future-ready digital skills.</li>
                  <li>Differentiate instruction to meet diverse learning needs by implementing targeted teaching strategies, scaffolding, and individualized support that enable every learner to achieve their potential.</li>
                  <li>Monitor student progress using Assessment for Learning (AfL), formative and summative assessments, providing timely feedback and intervention to improve academic performance.</li>
                  <li>Foster an inclusive, positive, and well-managed classroom environment that promotes safeguarding, student wellbeing, collaboration, creativity, and responsible digital citizenship.</li>
                  <li>Organize coding activities, STEM projects, and technology-based learning experiences that encourage innovation, teamwork, and real-world problem-solving.</li>
                  <li>Collaborate with teachers, school leadership, and parents to support curriculum development, student achievement, and whole-school technology initiatives while contributing to continuous school improvement.</li>
                </ul>
              </Reveal>
            </EmployerBlock>
          </div>
        </section>

        {/* ── on linkedin ──────────────────────────────────── */}
        <section className="pb-24">
          <Reveal>
            <SectionHeading>On LinkedIn</SectionHeading>
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
          </Reveal>
          <Reveal delay={120} className="mt-5">
            <LinkedInCarousel />
          </Reveal>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

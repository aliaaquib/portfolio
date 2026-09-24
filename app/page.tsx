import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Pill } from "@/components/pill";
import { LinkedInCarousel } from "@/components/linkedin-carousel";
import { WritingList } from "@/components/writing-list";
import { FindMeGrid } from "@/components/find-me-grid";
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

function GradCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
      <path d="M12 4.2 2.6 8.8 12 13.4 21.4 8.8 12 4.2Z" strokeLinejoin="round" />
      <path d="M6.8 12.4v3.2c0 1.4 2.3 2.6 5.2 2.6s5.2-1.2 5.2-2.6v-3.2" strokeLinecap="round" />
      <path d="M21.4 10.6v3.8" strokeLinecap="round" />
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
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-strong text-bg">
              {icon}
            </span>
            <h3 className="text-[17px] font-semibold leading-snug text-strong">{name}</h3>
          </div>
          <p className="mt-3 text-sm text-muted">{sub}</p>
          <ul className="mt-5 space-y-4">
            {roles.map((role) => (
              <li key={role.title} className="relative pl-5">
                <span aria-hidden="true" className="absolute bottom-0 left-[4px] top-[6px] flex flex-col items-center">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: role.dot }} />
                  <span className="mt-1 w-px flex-1 opacity-50" style={{ backgroundColor: role.dot }} />
                </span>
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
        className="group block overflow-hidden rounded-2xl border border-strong/10 bg-white shadow-[0_1px_4px_rgba(17,17,17,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(17,17,17,0.10)]"
      >
        {/* visual */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-strong/10 bg-[#f4f1ea]">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-strong/10 bg-white/90 px-2.5 py-1 text-xs font-medium text-green-800 backdrop-blur-sm">
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
          </Reveal>
          <FindMeGrid />
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

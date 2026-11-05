import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, ImageOff, Users } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import Marquee from "react-fast-marquee";
import { SiGithub, SiMdx, SiNextdotjs, SiOpenai, SiPython, SiReact, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";
import { projects, techStack, type IconType, type Project } from "../data";

const techIcons: Record<string, { Icon: IconType; color?: string }> = {
  React: { Icon: SiReact },
  "Tailwind CSS": { Icon: SiTailwindcss },
  "Next.js": { Icon: SiNextdotjs },
  MDX: { Icon: SiMdx },
  Vercel: { Icon: SiVercel },
  Python: { Icon: SiPython },
  TypeScript: { Icon: SiTypescript },
  GitHub: { Icon: SiGithub },
  OpenAI: { Icon: SiOpenai },
};
techStack.forEach(({ name, Icon, color }) => (techIcons[name] = { Icon, color }));

/** The moving tech strip from the original project card. */
function TechMarquee({ tech }: { tech: string[] }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
      }}
    >
      <Marquee speed={28} gradient={false} className="py-1">
        {tech.map((t, i) => {
          const icon = techIcons[t];
          return (
            <div key={i} className="flex items-center gap-1.5 mx-3 text-xs font-medium text-gray-700 dark:text-white/60 whitespace-nowrap">
              {icon && <icon.Icon size={14} color={icon.color} />}
              {t}
              <div className="w-1 h-1 rounded-full bg-black/15 dark:bg-white/20 ml-3" />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}

function Sparkle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block font-semibold ${className}`}>
      <span className="sparkle-text">{children}</span>
      <span className="sparkle-star -top-1.5 -right-3" />
      <span className="sparkle-star -bottom-1 left-1/3 !w-[6px] !h-[6px]" style={{ animationDelay: "0.8s" }} />
      <span className="sparkle-star -top-2 left-0 !w-[5px] !h-[5px]" style={{ animationDelay: "1.6s" }} />
    </span>
  );
}

function Cover({ src, name, className }: { src?: string; name?: string; className: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken)
    return name ? (
      // No screenshot: the project's name in script on black, like the Imageory cover.
      <div className={`flex items-center justify-center bg-black ${className}`}>
        <span className="font-signature text-3xl md:text-4xl text-white px-4 text-center">{name}</span>
      </div>
    ) : (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#FCE7EC] to-[#F3B9C8]/40 dark:from-dark-surface2 dark:to-dark-surface3 ${className}`}
      >
        <ImageOff size={20} className="text-black/20 dark:text-white/20" />
      </div>
    );
  return <img src={src} alt="" loading="lazy" onError={() => setBroken(true)} className={`object-cover object-left-top ${className}`} />;
}

const tag = "text-xs font-medium text-gray-700 dark:text-white/70 bg-[#FCE7EC]/60 dark:bg-white/10 rounded-full px-2.5 py-0.5";
const solidButton =
  "glare-button relative flex items-center gap-1.5 text-xs font-medium rounded-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity duration-150";
const outlineButton =
  "relative flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-white/70 rounded-full px-4 py-2 bg-transparent border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150";

/** "Live site" link for live projects, a non-link "In progress" pill for ones still being built. */
function LiveButton({ project, label = "Live site", className = "" }: { project: Project; label?: ReactNode; className?: string }) {
  if (project.status === "building" || !project.liveUrl)
    return (
      <span className={`${solidButton} ${className} cursor-default`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        In progress
      </span>
    );
  return (
    <a href={project.liveUrl} target="_blank" rel="noreferrer" className={`${solidButton} ${className}`}>
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
        <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-green-400" />
      </span>
      {label}
      <ExternalLink size={13} />
    </a>
  );
}

function ProjectList({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.category.forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, []);
  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category.includes(filter))), [filter]);

  const pill = (name: string, count: number) => (
    <button
      key={name}
      onClick={() => setFilter(name)}
      className={`glare-button shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
        filter === name
          ? "bg-black dark:bg-white text-white dark:text-black"
          : "bg-white dark:bg-dark-surface2 border border-black/10 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10"
      }`}
    >
      {name}
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === name ? "bg-white/20" : "bg-black/5 dark:bg-white/10"}`}>{count}</span>
    </button>
  );

  return (
    <motion.div
      key="project-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-[880px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-24"
    >
      <div className="mb-10">
        <h1 className="font-instrument font-semibold text-4xl md:text-5xl text-gray-800 dark:text-white tracking-tight mb-3">Projects</h1>
        <p className="font-sans text-cherry-textSecondary dark:text-white/50 text-sm md:text-base">
          Proof of shipped things — and the thinking behind them.
        </p>
      </div>

      {/* Filters only help once there's more than one project. */}
      {projects.length > 1 && (
        <div className="flex items-center gap-2.5 mb-10 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
          {pill("All", projects.length)}
          {categories.map((c) => pill(c.name, c.count))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {visible.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            className="dashed-border-anim rounded-2xl w-full text-left"
          >
            <div className="flex flex-col sm:flex-row bg-white dark:bg-dark-surface rounded-[14px] overflow-hidden transition-colors duration-150">
              {p.caseStudy ? (
                <button
                  onClick={() => onOpen(p)}
                  aria-label={`Open ${p.title} case study`}
                  className="block shrink-0 w-full sm:w-64 md:w-80 overflow-hidden"
                >
                  <Cover src={p.image} name={p.title} className="w-full aspect-video sm:aspect-auto sm:h-full" />
                </button>
              ) : (
                <div className="block shrink-0 w-full sm:w-64 md:w-80 overflow-hidden">
                  <Cover src={p.image} name={p.title} className="w-full aspect-video sm:aspect-auto sm:h-full" />
                </div>
              )}
              <div className="flex flex-col flex-1 min-w-0 p-5 md:p-6 justify-center">
                <h3 className="font-instrument font-semibold text-xl md:text-2xl text-gray-800 dark:text-white mb-1.5">{p.title}</h3>
                <p className="font-sans text-sm text-gray-600 dark:text-white/50 leading-relaxed mb-3">{p.description}</p>
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  {p.category.map((c) => (
                    <span key={c} className={tag}>
                      {c}
                    </span>
                  ))}
                  {p.stat && (
                    <span className="flex items-center gap-1 text-xs text-cherry-textSecondary dark:text-white/40">
                      <Users size={12} />
                      <Sparkle>{p.stat}</Sparkle>
                    </span>
                  )}
                </div>
                <div className="flex items-center flex-wrap gap-3 mb-4">
                  <LiveButton project={p} />
                  {p.caseStudy && (
                    <button onClick={() => onOpen(p)} className={outlineButton}>
                      Case study
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
                <div className="-mx-1">
                  <TechMarquee tech={p.tech} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid md:grid-cols-[150px_1fr] gap-3 md:gap-10 py-10 border-t border-black/10 dark:border-white/10">
      <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-cherry-textSecondary dark:text-white/50 md:pt-1.5">{label}</h2>
      <div className="font-sans text-[15px] leading-[1.75] text-gray-700 dark:text-white/80">{children}</div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="block text-xs text-cherry-textSecondary dark:text-white/40 mb-1.5">{label}</span>
      {children}
    </div>
  );
}

const factText = "font-sans text-sm font-medium text-gray-800 dark:text-white leading-snug";

function CaseStudyView({ project, onBack, onOpen }: { project: Project; onBack: () => void; onOpen: (p: Project) => void }) {
  const cs = project.caseStudy!;
  const withStudies = projects.filter((p) => p.caseStudy);
  const next = withStudies[(withStudies.findIndex((p) => p.id === project.id) + 1) % withStudies.length];

  return (
    <motion.div
      key={`case-study-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-[880px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-24"
    >
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-sm font-medium text-cherry-textSecondary dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-150 mb-10"
      >
        <ArrowLeft size={16} className="transition-transform duration-150 group-hover:-translate-x-1" />
        All projects
      </button>

      <div className="flex items-center flex-wrap gap-2 mb-5">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cherry-textSecondary dark:text-white/50 mr-1">Case study</span>
        {project.category.map((c) => (
          <span key={c} className={tag}>
            {c}
          </span>
        ))}
      </div>
      <h1 className="font-instrument font-semibold text-4xl md:text-6xl text-gray-800 dark:text-white tracking-tight mb-4">{project.title}</h1>
      <p className="font-sans text-lg md:text-xl text-cherry-textSecondary dark:text-white/60 max-w-xl leading-snug mb-8">{project.tagline}</p>
      <LiveButton project={project} className="w-fit mb-12" />

      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#F9D3DD] via-[#F7E8EC] to-white pt-8 md:pt-12 px-6 md:px-14 mb-12">
        <div className="rounded-t-xl overflow-hidden bg-white/15 border border-white/50 shadow-lg">
          <Cover src={project.image} name={project.title} className={`w-full block ${project.image ? "h-auto" : "aspect-video"}`} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Fact label="Reach">
          {project.stat ? <Sparkle className="font-instrument text-2xl leading-none">{project.stat}</Sparkle> : <span className={factText}>—</span>}
        </Fact>
        <Fact label="Role">
          <span className={factText}>{cs.role}</span>
        </Fact>
        <Fact label="Timeline">
          <span className={factText}>{cs.timeline}</span>
        </Fact>
        <Fact label="Stack">
          <span className={factText}>{project.tech.join(", ")}</span>
        </Fact>
      </div>

      <Section label="Overview">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-white">{cs.overview}</p>
      </Section>
      <Section label="The problem">
        <p>{cs.problem}</p>
      </Section>
      <Section label="Goals">
        <ul className="space-y-3">
          {cs.goals.map((g) => (
            <li key={g} className="flex gap-3">
              <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-[#F3B9C8] shrink-0" />
              {g}
            </li>
          ))}
        </ul>
      </Section>
      <Section label="Process">
        <ol className="space-y-8 border-l border-black/10 dark:border-white/10 ml-1.5">
          {cs.process.map((step, i) => (
            <li key={step.title} className="pl-7 relative">
              <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[#F3B9C8] ring-4 ring-[#FFFEFD] dark:ring-dark-bg" />
              <span className="block text-xs text-cherry-textSecondary dark:text-white/40 mb-1">Step 0{i + 1}</span>
              <h3 className="font-instrument font-semibold text-xl text-gray-800 dark:text-white mb-1">{step.title}</h3>
              <p className="text-gray-600 dark:text-white/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section label="Key decisions">
        <div className="grid gap-4">
          {cs.solution.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white dark:bg-dark-surface border border-black/5 dark:border-white/10 p-5 md:p-6">
              <h3 className="font-instrument font-semibold text-lg text-gray-800 dark:text-white mb-1.5">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section label="Outcome">
        <p className="font-instrument font-semibold text-3xl text-gray-800 dark:text-white mb-6">{cs.outcome}</p>
        <LiveButton project={project} label={<>Visit {project.title}</>} className="w-fit" />
      </Section>

      {next.id !== project.id && (
        <button
          onClick={() => onOpen(next)}
          className="group w-full flex items-center justify-between gap-4 text-left rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-dark-surface p-6 mt-4 hover:border-black/25 dark:hover:border-white/30 transition-colors duration-150"
        >
          <div>
            <span className="block text-xs text-cherry-textSecondary dark:text-white/40 mb-1">Next case study</span>
            <span className="font-instrument font-semibold text-2xl text-gray-800 dark:text-white">{next.title}</span>
          </div>
          <ArrowRight size={20} className="text-gray-800 dark:text-white transition-transform duration-150 group-hover:translate-x-1" />
        </button>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const select = (p: Project | null) => {
    setOpen(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <section id="projects" className="w-full min-h-screen relative z-20 bg-[#FFFEFD] dark:bg-dark-bg transition-colors duration-150">
      <AnimatePresence mode="wait">
        {open ? (
          <CaseStudyView key={`cs-${open.id}`} project={open} onBack={() => select(null)} onOpen={select} />
        ) : (
          <ProjectList key="list" onOpen={select} />
        )}
      </AnimatePresence>
    </section>
  );
}

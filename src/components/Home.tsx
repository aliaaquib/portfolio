import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import Marquee from "react-fast-marquee";
import {
  aboutParagraphs,
  experience,
  freelanceText,
  linkedin,
  roles,
  site,
  socials,
  teachingSkills,
} from "../data";
import { formatDate, posts } from "../posts";
import { Thumbnail } from "./Blog";
import GlobeCard from "./GlobeCard";
import HeroClassroom from "./HeroClassroom";
import LinkedInCarousel from "./LinkedInCarousel";
import QuizOfTheDay from "./QuizOfTheDay";
import type { Theme, View } from "./Navbar";

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const sectionTitle = "font-instrument font-semibold text-[26px] md:text-3xl text-gray-800 dark:text-white mb-6";

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const word = roles[index];
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === "typing") {
      t =
        text.length < word.length
          ? setTimeout(() => setText(word.slice(0, text.length + 1)), 80)
          : setTimeout(() => setPhase("pausing"), 1200);
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 900);
    } else if (text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else {
      setIndex((i) => (i + 1) % roles.length);
      setPhase("typing");
    }
    return () => clearTimeout(t);
  }, [text, phase, index]);

  return (
    <span className="inline-flex items-center font-instrument-sans font-medium text-2xl md:text-3xl text-[#c2185b]">
      {text}
      <span className="ml-1 w-[2px] h-[1em] bg-[#c2185b] animate-pulse" />
    </span>
  );
}

function RevealParagraphs({ paragraphs, className }: { paragraphs: ReactNode[]; className: string }) {
  return (
    <div className={className}>
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {p}
        </motion.p>
      ))}
    </div>
  );
}

function ViewToggle({ mode, onChange }: { mode: "list" | "timeline"; onChange: (m: "list" | "timeline") => void }) {
  return (
    <div className="flex items-center rounded-lg bg-[#EAE8E3] dark:bg-white/10 p-1">
      {(["list", "timeline"] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          aria-pressed={mode === m}
          className={`relative px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
            mode === m ? "text-white dark:text-[#1a0a10]" : "text-cherry-textSecondary dark:text-white/50 hover:text-black dark:hover:text-white"
          }`}
        >
          {mode === m && (
            <motion.span
              layoutId="experience-toggle"
              transition={{ type: "spring", stiffness: 500, damping: 36 }}
              className="absolute inset-0 rounded-md bg-[#c2185b] dark:bg-[#e879a3]"
            />
          )}
          <span className="relative">{m}</span>
        </button>
      ))}
    </div>
  );
}

const mono = { fontFamily: '"Space Mono", ui-monospace, monospace' };

/** Start/end as fractional years from a period like "2023 — Present" or "2019 — 2022". */
function yearsOf(period: string, now: number) {
  const [start, end = start] = (period.match(/\d{4}/g) ?? []).map(Number);
  return { start, end: /present/i.test(period) ? now : end + 1 };
}

function Timeline() {
  const today = new Date();
  const now = today.getFullYear() + (today.getMonth() + today.getDate() / 31) / 12;
  const jobs = experience.map((job) => ({ job, ...yearsOf(job.period, now) })).filter((j) => j.start);
  const from = Math.min(...jobs.map((j) => j.start));
  const span = now - from;
  const x = (year: number) => `${((year - from) / span) * 100}%`;
  const ticks = Array.from({ length: Math.floor(now) - from + 1 }, (_, i) => from + i);

  return (
    <div className="dashed-border-anim rounded-2xl w-full h-full">
      <div className="h-full bg-white dark:bg-dark-surface rounded-2xl px-5 md:px-6 overflow-x-auto transition-colors duration-150">
        <div className="relative h-full min-w-[560px] py-6">
          {ticks.map((year) => (
            <div key={year} className="absolute top-0 bottom-0 border-l border-black/10 dark:border-white/10" style={{ left: x(year) }}>
              <span className="absolute bottom-1 left-1 text-[11px] text-cherry-textSecondary dark:text-white/40" style={mono}>
                {year}
              </span>
            </div>
          ))}
          <div className="absolute top-0 bottom-0 right-0 border-l border-dashed border-[#c2185b]/70 dark:border-[#e879a3]/70">
            <span className="absolute top-1 right-1.5 text-[11px] text-[#c2185b] dark:text-[#e879a3]" style={mono}>
              now
            </span>
          </div>

          <div className="relative h-full flex flex-col justify-center gap-3">
            {jobs.map(({ job, start, end }, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scaleX: 0.9 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                style={{ marginLeft: x(start), width: `${((end - start) / span) * 100}%`, transformOrigin: "left" }}
                className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-[#F3F1EC] dark:bg-white/5 px-3 py-2"
              >
                {job.logo && (
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-white p-0.5">
                    <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover rounded-lg" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-sans font-medium text-sm md:text-base text-gray-900 dark:text-white truncate">{job.company}</h4>
                  <p className="text-xs md:text-sm text-cherry-textSecondary dark:text-white/50 truncate">{job.role}</p>
                </div>
                <span className="hidden sm:block shrink-0 text-xs text-cherry-textSecondary dark:text-white/50" style={mono}>
                  {job.period.replace(/\s*—\s*/, " to ").toLowerCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const [open, setOpen] = useState<number | null>(null);
  const [mode, setMode] = useState<"list" | "timeline">("list");
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className={sectionTitle.replace(" mb-6", "")}>Experience</h3>
        <ViewToggle
          mode={mode}
          onChange={(m) => {
            setOpen(null);
            setMode(m);
          }}
        />
      </div>
      {/* Both views share one grid cell, so the card keeps the list card's height when switching. */}
      <div className="grid">
        <div className={`[grid-area:1/1] ${mode === "timeline" ? "" : "invisible"}`} aria-hidden={mode !== "timeline"}>
          <Timeline key={mode} />
        </div>
        <div className={`[grid-area:1/1] dashed-border-anim rounded-2xl w-full ${mode === "list" ? "" : "invisible"}`} aria-hidden={mode !== "list"}>
          <div className="bg-white dark:bg-dark-surface rounded-2xl divide-y divide-black/5 dark:divide-white/10 transition-colors duration-150">
            {experience.map((job) => {
              const isOpen = open === job.id;
              return (
                <div key={job.id}>
                  <button
                    onClick={() => setOpen(isOpen ? null : job.id)}
                    className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 p-5 md:p-6 text-left hover:bg-[#FCE7EC]/20 dark:hover:bg-white/5 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      {job.logo && (
                        <span className="shrink-0 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-black/5 dark:border-white/10 shadow-[0_2px_6px_rgba(0,0,0,0.06)] p-1">
                          <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                        </span>
                      )}
                      <div>
                        <h4 className="font-sans font-semibold text-base md:text-lg text-gray-800 dark:text-white">{job.company}</h4>
                        <p className="text-xs md:text-sm text-cherry-textSecondary dark:text-white/40">
                          {job.role} · {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs md:text-sm text-cherry-textSecondary dark:text-white/40">{job.period}</span>
                      <ChevronDown
                        size={16}
                        className={`text-cherry-textSecondary dark:text-white/40 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 flex flex-col gap-4">
                          <p className="text-sm text-gray-700 dark:text-white/60 leading-relaxed">{job.description}</p>
                          <ul className="flex flex-col gap-2">
                            {job.responsibilities.map((r, i) => (
                              <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-white/60">
                                <span className="mt-2 w-1 h-1 rounded-full bg-[#c2185b] shrink-0" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {job.tools.map((t, i) => (
                              <span
                                key={i}
                                className="text-xs font-medium text-gray-700 dark:text-white/70 bg-[#FCE7EC]/40 dark:bg-white/10 rounded-full px-3 py-1"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home({
  onViewChange,
  onOpenPost,
  theme,
}: {
  onViewChange: (v: View) => void;
  onOpenPost: (slug: string) => void;
  theme: Theme;
}) {
  return (
    <section className="w-full relative z-20 flex flex-col items-center bg-gradient-to-b from-[#FFFEFD] via-[#F3B9C8]/10 to-[#FFFEFD] dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg min-h-screen transition-colors duration-150">
      <div className="max-w-[1000px] w-full mx-auto px-4 md:px-12 relative z-10 pt-16 md:pt-20 pb-16">
        <div className="dashed-border-anim rounded-3xl w-full">
          <div className="bg-white/40 dark:bg-dark-surface/60 backdrop-blur-sm rounded-3xl p-4 md:p-10 transition-colors duration-150">
            <motion.div
              className="relative w-full mb-6 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="rounded-[20px] w-full">
                <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[20px] overflow-hidden">
                  <HeroClassroom theme={theme} />
                </div>
              </div>

              <div className="absolute -bottom-12 left-6 md:left-8 z-30">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-br from-[#FFB7C5] to-[#c2185b] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FFFEFD] dark:bg-dark-surface border-4 border-[#FFFEFD] dark:border-dark-bg transition-colors duration-150 flex items-center justify-center">
                    <img src="/portrait.jpg" alt={site.name} className="w-full h-full object-cover scale-110" />
                  </div>
                </div>
              </div>

              <div className="hidden md:flex absolute -bottom-14 right-0 flex-wrap justify-end gap-3">
                <button
                  onClick={() => onViewChange("labs")}
                  className="glare-button group flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-soft font-medium text-xs md:text-sm hover:shadow-soft-hover transition-all duration-150"
                >
                  Open Labs
                  <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
                </button>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glare-button group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-surface3 border border-black/10 dark:border-white/10 rounded-full shadow-soft font-medium text-xs md:text-sm text-gray-800 dark:text-white hover:shadow-soft-hover transition-all duration-150"
                >
                  View Resume
                  <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

            <div className="flex md:hidden w-full gap-2.5 mt-16 mb-8">
              <button
                onClick={() => onViewChange("labs")}
                className="flex-1 flex items-center justify-center gap-1.5 h-11 bg-white text-black rounded-[18px] font-medium text-[13px] whitespace-nowrap shadow-sm"
              >
                Open Labs
                <ArrowRight size={14} className="transform -rotate-45 opacity-60" />
              </button>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 h-11 bg-[#1f1f1f] text-white rounded-[18px] font-medium text-[13px] whitespace-nowrap shadow-sm"
              >
                View Resume
                <ArrowRight size={14} className="transform -rotate-45 opacity-60" />
              </a>
            </div>

            <motion.div
              className="w-full mb-16 pt-2 md:pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-instrument font-semibold text-3xl md:text-4xl text-gray-800 dark:text-white tracking-tight">
                    {site.name}
                  </h2>
                  <BadgeCheck size={22} className="text-[#3B9EF3] fill-[#3B9EF3]/15 shrink-0" />
                </div>
              </div>
              <Typewriter />
              <p className="font-sans text-[13px] md:text-sm text-cherry-textSecondary dark:text-white/40 mt-1.5">{site.location}</p>
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <h3 className={sectionTitle}>Quiz of the day</h3>
              <QuizOfTheDay onOpenPost={onOpenPost} />
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <h3 className={sectionTitle}>Who is Aaquib?</h3>
              <RevealParagraphs
                paragraphs={aboutParagraphs}
                className="space-y-4 font-instrument-sans text-base md:text-[17px] text-gray-700 dark:text-white/60 leading-relaxed"
              />
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <h3 className={sectionTitle}>Teaching Skills</h3>
              <div
                className="w-full overflow-hidden"
                style={{
                  maskImage: "linear-gradient(90deg, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
                  WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
                }}
              >
                <Marquee speed={30} gradient={false} className="py-2">
                  <div className="flex items-center gap-4 px-4">
                    {teachingSkills.map(({ name, Icon }) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 bg-white dark:bg-dark-surface2 rounded-full px-3 py-2 border border-black/5 dark:border-white/10 mx-2"
                      >
                        <Icon size={18} className="text-[#c2185b] dark:text-[#e879a3]" />
                        <span className="text-[13px] md:text-sm font-medium text-[#181818] dark:text-white whitespace-nowrap">{name}</span>
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <h3 className={sectionTitle}>Freelancing</h3>
              <div className="dashed-border-anim rounded-2xl w-full">
                <div className="bg-[#FCE7EC]/50 dark:bg-white/[0.04] rounded-2xl p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-150">
                  <p className="font-sans text-gray-700 dark:text-white/70 text-[15px] md:text-base leading-relaxed max-w-lg">
                    {freelanceText}
                  </p>
                  <button
                    onClick={() => onViewChange("contact")}
                    className="glare-button group flex items-center justify-center gap-2 px-7 py-3.5 bg-white dark:bg-dark-surface3 border border-black/10 dark:border-white/10 rounded-full shadow-soft font-medium text-sm text-gray-800 dark:text-white shrink-0 hover:shadow-soft-hover transition-all duration-150"
                  >
                    Hire Me
                    <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <Experience />
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <div className="flex items-end justify-between gap-4 mb-6">
                <h3 className={sectionTitle.replace(" mb-6", "")}>On LinkedIn</h3>
                <a
                  href={linkedin.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1 text-xs md:text-sm font-medium text-cherry-textSecondary dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-150 pb-1"
                >
                  View LinkedIn
                  <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
              <LinkedInCarousel />
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <h3 className={sectionTitle}>Two dots on a globe</h3>
              <GlobeCard theme={theme} />
            </motion.div>

            <motion.div className="w-full mb-16" {...sectionMotion}>
              <div className="flex items-end justify-between gap-4 mb-6">
                <h3 className={sectionTitle.replace(" mb-6", "")}>Latest writing</h3>
                <button
                  onClick={() => onViewChange("blog")}
                  className="group flex items-center gap-1 text-xs md:text-sm font-medium text-cherry-textSecondary dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-150 pb-1"
                >
                  Read all
                  <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {posts.slice(0, 3).map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      // Plain clicks stay in the app; cmd/ctrl-click still opens a new tab.
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                      e.preventDefault();
                      onOpenPost(post.slug);
                    }}
                    className="group dashed-border-anim rounded-2xl text-left"
                  >
                    <div className="h-full flex flex-col bg-white dark:bg-dark-surface rounded-[14px] overflow-hidden transition-colors duration-150">
                      <Thumbnail post={post} className="w-full aspect-video" />
                      <div className="flex flex-col flex-1 p-4">
                        <span className="text-xs text-cherry-textSecondary dark:text-white/40 mb-1.5">{formatDate(post.date)}</span>
                        <h4 className="font-instrument font-semibold text-lg leading-snug text-gray-800 dark:text-white mb-3">{post.title}</h4>
                        <span className="mt-auto flex items-center gap-1 text-xs font-medium text-gray-800 dark:text-white">
                          Read
                          <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-nowrap justify-center items-center gap-2.5 md:gap-6">
              {socials.map(({ name, Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="glare-button flex items-center justify-center md:justify-start gap-2.5 bg-white dark:bg-dark-surface2 border border-black/5 dark:border-white/10 shadow-glass dark:shadow-none rounded-2xl w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-4 group transition-all duration-150"
                >
                  <Icon size={18} className="text-[#181818] dark:text-white" />
                  <span className="hidden md:inline text-[13px] font-semibold text-[#181818] dark:text-white transition-colors">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { quiz } from "../data";
import { posts } from "../posts";

/** Same question all day for a visitor, the next one tomorrow (by their local date). */
function questionIndex(date: Date, count: number) {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 864e5);
  return day % count;
}

export default function QuizOfTheDay({ onOpenPost }: { onOpenPost: (slug: string) => void }) {
  const q = quiz[questionIndex(new Date(), quiz.length)];
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const post = q.slug ? posts.find((p) => p.slug === q.slug) : undefined;

  const optionClass = (i: number) => {
    if (!answered)
      return "border-black/10 dark:border-white/15 hover:border-black/30 dark:hover:border-white/40 hover:bg-black/[0.02] dark:hover:bg-white/5";
    if (i === q.answer) return "border-green-600/60 bg-green-50 dark:bg-green-500/15 dark:border-green-400/50";
    if (i === picked) return "border-red-500/60 bg-red-50 dark:bg-red-500/15 dark:border-red-400/50";
    return "border-black/5 dark:border-white/10 opacity-50";
  };

  return (
    <div className="dashed-border-anim rounded-2xl w-full">
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 md:p-8 transition-colors duration-150">
        <p className="font-instrument font-semibold text-xl md:text-2xl text-gray-800 dark:text-white leading-snug mb-5">{q.question}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {q.options.map((option, i) => (
            <button
              key={option}
              onClick={() => {
                setPicked(i);
                setOpen(true);
              }}
              disabled={answered}
              className={`flex items-center gap-3 text-left rounded-xl border px-4 py-3 text-sm text-gray-800 dark:text-white transition-colors duration-150 disabled:cursor-default ${optionClass(i)}`}
            >
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold">
                {answered && i === q.answer ? (
                  <Check size={14} className="text-green-600 dark:text-green-400" />
                ) : answered && i === picked ? (
                  <X size={14} className="text-red-500 dark:text-red-400" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              {option}
            </button>
          ))}
        </div>

      </div>

      {/* Result pops up over the page; rendered in <body> so transformed parents can't trap the fixed overlay. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="quiz-result-title"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md bg-white dark:bg-dark-surface rounded-2xl p-6 md:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)]"
              >
                <button
                  ref={closeRef}
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25 transition-colors duration-150"
                >
                  <X size={17} />
                </button>
                <p
                  id="quiz-result-title"
                  className={`font-instrument font-semibold text-2xl mb-2 ${picked === q.answer ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {picked === q.answer ? "Correct!" : "Not quite."}
                </p>
                <p className="text-sm text-gray-700 dark:text-white/70 leading-relaxed pr-4">{q.explain}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-black/5 dark:border-white/10">
                  {post ? (
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        // Plain clicks stay in the app; cmd/ctrl-click still opens a new tab.
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                        e.preventDefault();
                        setOpen(false);
                        onOpenPost(post.slug);
                      }}
                      className="group flex items-center gap-1 text-sm font-medium text-[#c2185b] dark:text-[#e879a3]"
                    >
                      Read the full explanation
                      {/* Wrapper takes the hover shift so it doesn't fight the nudge animation's transform. */}
                      <span className="inline-flex transition-transform duration-150 group-hover:translate-x-1">
                        <ArrowRight size={14} className="arrow-nudge" />
                      </span>
                    </a>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-cherry-textSecondary dark:text-white/40">New question tomorrow</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}

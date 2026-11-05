import { motion } from "framer-motion";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { useState } from "react";
import { labs, type Lab } from "../data";

const tag = "text-xs font-medium text-gray-700 dark:text-white/70 bg-[#FCE7EC]/60 dark:bg-white/10 rounded-full px-2.5 py-0.5";

function Preview({ lab }: { lab: Lab }) {
  const [broken, setBroken] = useState(false);
  if (!lab.image || broken)
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-[#FCE7EC] to-[#F3B9C8]/40 dark:from-dark-surface2 dark:to-dark-surface3">
        <FlaskConical size={28} strokeWidth={1.5} className="text-[#c2185b]/50 dark:text-white/30" />
      </div>
    );
  return <img src={lab.image} alt="" loading="lazy" onError={() => setBroken(true)} className="w-full aspect-video object-cover" />;
}

export default function Labs() {
  return (
    <section className="w-full min-h-screen relative z-20 bg-[#FFFEFD] dark:bg-dark-bg transition-colors duration-150">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-24"
      >
        <div className="mb-10">
          <h1 className="font-instrument font-semibold text-4xl md:text-5xl text-gray-800 dark:text-white tracking-tight mb-3">Labs</h1>
          <p className="font-sans text-cherry-textSecondary dark:text-white/50 text-sm md:text-base">
            Interactive simulators. Poke at CS ideas until they make sense.
          </p>
        </div>

        {labs.length === 0 ? (
          <div className="dashed-border-anim rounded-2xl">
            <div className="bg-white dark:bg-dark-surface rounded-2xl px-6 py-16 flex flex-col items-center text-center transition-colors duration-150">
              <FlaskConical size={32} strokeWidth={1.5} className="text-[#c2185b] dark:text-[#e879a3] mb-4" />
              <h2 className="font-instrument font-semibold text-2xl text-gray-800 dark:text-white mb-2">The first experiments are brewing</h2>
              <p className="text-sm text-cherry-textSecondary dark:text-white/50 max-w-sm">
                Simulators for sorting, recursion, networks and more are on their way. Check back soon.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {labs.map((lab, i) => (
              <motion.a
                key={lab.id}
                href={lab.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                className="group dashed-border-anim rounded-2xl"
              >
                <div className="h-full flex flex-col bg-white dark:bg-dark-surface rounded-[14px] overflow-hidden transition-colors duration-150">
                  <Preview lab={lab} />
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={tag}>{lab.subject}</span>
                      {lab.level && <span className={tag}>{lab.level}</span>}
                    </div>
                    <h3 className="font-instrument font-semibold text-xl md:text-2xl text-gray-800 dark:text-white mb-1.5">{lab.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed mb-4">{lab.description}</p>
                    <span className="mt-auto flex items-center gap-1 text-xs font-medium text-gray-800 dark:text-white">
                      Open simulator
                      <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

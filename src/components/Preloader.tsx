import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./Navbar";

// "a." with a bouncing dot, then the name slides out beside it.
type Phase = "mark" | "name" | "falling" | "done";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("mark");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const scale = reduceMotion ? 0.25 : 1; // no bounce to watch, so don't make them wait for it
    const t1 = setTimeout(() => setPhase("name"), 1800 * scale);
    const t2 = setTimeout(() => setPhase("falling"), 2900 * scale);
    const t3 = setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 250);
    }, 3350 * scale);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete, reduceMotion]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-dark-bg overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <motion.div
            className="relative flex items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "falling" ? 0 : 1 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <LogoMark className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0" bounce={phase === "mark" && !reduceMotion} />
            <motion.div
              className="overflow-hidden whitespace-nowrap"
              initial={{ width: 0 }}
              animate={{ width: phase === "mark" ? 0 : "auto" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-brand font-semibold tracking-[-0.035em] text-4xl md:text-5xl lg:text-6xl text-black dark:text-white py-2 pr-4 pl-2">
                aaquib ali
              </div>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {phase === "falling" && (
              <motion.div
                className="absolute top-[-20%]"
                initial={{ x: "-10vw", y: "-10vh", rotate: 0, opacity: 0 }}
                animate={{ y: "120vh", x: "30vw", rotate: 360, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.55, ease: "easeInOut", opacity: { times: [0, 0.2, 0.8, 1] } }}
                style={{ width: 30, height: 42, filter: "blur(1px)" }}
              >
                <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#ffb7c5]">
                  <path d="M50 0C60 40 100 80 50 140C0 80 40 40 50 0Z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

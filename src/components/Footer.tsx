import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

const hearts = [
  { size: 14, style: { top: "10%", left: "15%" }, y: -15, opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8], duration: 3, delay: 0.5 },
  { size: 10, style: { bottom: "20%", right: "20%" }, y: -10, opacity: [0.3, 0.8, 0.3], scale: [0.6, 0.9, 0.6], duration: 2.5, delay: 1.2 },
  { size: 16, style: { top: "30%", right: "10%" }, y: -20, opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1], duration: 3.5, delay: 0.2 },
  { size: 12, style: { bottom: "30%", left: "25%" }, y: -12, opacity: [0.3, 0.7, 0.3], scale: [0.7, 1, 0.7], duration: 2.8, delay: 0.8 },
];

export default function Footer() {
  return (
    <footer className="w-full pt-10 pb-16 md:pb-0 flex flex-col items-center justify-center bg-[#FFFEFD] dark:bg-dark-bg border-t border-black/5 dark:border-white/10 transition-colors duration-150 overflow-hidden relative">
      <div className="flex flex-col items-center text-center mb-5 px-6 relative z-10">
        <p className="font-serif italic text-2xl md:text-3xl text-[#181818] dark:text-white mb-6">
          Have an idea?
          <br />
          Let's build something together.
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("navigate-to", { detail: "contact" }))}
          className="glare-button group flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-dark-surface3 border border-black/10 dark:border-white/10 rounded-full shadow-soft font-medium text-sm text-gray-800 dark:text-white hover:shadow-soft-hover transition-all duration-150"
        >
          Let's Talk
          <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
        </button>
      </div>

      <p className="relative z-10 text-sm text-cherry-textSecondary dark:text-white/50 text-center mb-0">
        Made with <span className="text-[#F3B9C8]">♥</span> and creativity by{" "}
        <span className="font-brand font-semibold tracking-[-0.035em] text-base text-cherry-text dark:text-white">aaquib ali</span>
      </p>

      <div className="relative flex justify-center items-end w-full max-w-[400px] md:max-w-[500px] mx-auto -mb-[20px] md:-mb-[50px] mt-0">
        <img
          src="/animals.png"
          alt="Footer Illustration"
          className="w-[400px] md:w-[600px] h-auto block object-contain select-none pointer-events-none drop-shadow-sm m-0 p-0"
        />
        {hearts.map((h, i) => (
          <motion.div
            key={i}
            className="absolute text-[#F3B9C8]"
            style={h.style}
            animate={{ y: [0, h.y, 0], opacity: h.opacity, scale: h.scale }}
            transition={{ duration: h.duration, repeat: Infinity, ease: "easeInOut", delay: h.delay }}
          >
            <Heart size={h.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </footer>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Briefcase, FlaskConical, House, Layers, Moon, Newspaper, Send, Sun, User } from "lucide-react";
import { site } from "../data";

/** Same mark as public/logo.svg (the favicon), inline so it follows the site's light/dark toggle. */
export function LogoMark({ className, bounce = false }: { className: string; bounce?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g className="stroke-black dark:stroke-white" fill="none" strokeWidth="5" strokeLinecap="round">
        <circle cx="26.5" cy="34" r="10.5" />
        <line x1="37" y1="20" x2="37" y2="44.5" />
      </g>
      <motion.circle
        cx="47"
        cy="42"
        r="3.5"
        className="fill-[#c2185b] dark:fill-[#e879a3]"
        animate={bounce ? { y: [0, -18, 0, -9, 0] } : { y: 0 }}
        transition={bounce ? { duration: 0.9, repeat: 1, ease: "easeInOut", times: [0, 0.3, 0.6, 0.8, 1] } : { duration: 0 }}
      />
    </svg>
  );
}

export type View = "home" | "projects" | "labs" | "blog" | "contact";
export type Theme = "light" | "dark";

export function ThemeToggle({ theme, onToggle, size = "md" }: { theme: Theme; onToggle: () => void; size?: "sm" | "md" }) {
  const isDark = theme === "dark";
  const width = size === "sm" ? 44 : 52;
  const height = size === "sm" ? 24 : 28;
  const knob = size === "sm" ? 18 : 22;
  const pad = (height - knob) / 2;
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="relative flex items-center rounded-full border border-black/10 dark:border-white/15 bg-black/[0.06] dark:bg-white/10 transition-colors duration-150"
      style={{ width, height, padding: pad }}
    >
      <motion.span
        className="flex items-center justify-center rounded-full bg-white dark:bg-dark-surface3 shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
        style={{ width: knob, height: knob }}
        animate={{ x: isDark ? width - knob - pad * 2 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {isDark ? (
          <Moon size={knob * 0.6} className="text-white/90" />
        ) : (
          <Sun size={knob * 0.6} className="text-[#E8A33D]" />
        )}
      </motion.span>
    </button>
  );
}

const desktopLinks = [
  { name: "Home", view: "home", icon: User },
  { name: "Projects", view: "projects", icon: Briefcase },
  { name: "Labs", view: "labs", icon: FlaskConical },
  { name: "Blog", view: "blog", icon: Newspaper },
] as const;

const mobileLinks = [
  { name: "Home", view: "home", icon: House },
  { name: "Projects", view: "projects", icon: Layers },
  { name: "Labs", view: "labs", icon: FlaskConical },
  { name: "Blog", view: "blog", icon: BookOpen },
  { name: "Talk", view: "contact", icon: Send },
] as const;

const linkClass = (active: boolean) =>
  `group relative font-medium text-sm transition-colors duration-150 ${
    active
      ? "text-black dark:text-white"
      : "text-cherry-text dark:text-white/70 hover:text-black dark:hover:text-white"
  }`;

const underlineClass = (active: boolean) =>
  `absolute -bottom-1 left-0 h-[1.5px] bg-[#F3B9C8] transition-all duration-150 ease-out ${
    active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
  }`;

export default function Navbar({
  currentView,
  onViewChange,
  theme,
  onToggleTheme,
}: {
  currentView: View;
  onViewChange: (v: View) => void;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const goHome = () => {
    onViewChange("home");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  return (
    <>
      {/* Same width as the page content, so the logo and links line up with the cards below. */}
      <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-[1000px] mx-auto px-4 md:px-12 h-14 md:h-16 flex items-center justify-between">
          <button
            onClick={goHome}
            aria-label={`${site.handle} home`}
            className="pointer-events-auto flex items-center gap-2 hover:opacity-70 transition-opacity duration-150"
          >
            <LogoMark className="w-8 h-8 md:w-9 md:h-9 -ml-1.5" />
            <span className="font-brand font-semibold tracking-[-0.035em] text-lg md:text-xl text-black dark:text-white">aaquib ali</span>
          </button>

          <div className="md:hidden pointer-events-auto">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="sm" />
          </div>

          <nav className="hidden md:flex pointer-events-auto items-center gap-8">
            {desktopLinks.map((link) => {
              const active = currentView === link.view;
              return (
                <button key={link.name} onClick={() => onViewChange(link.view)} className={linkClass(active)}>
                  {link.name}
                  <span className={underlineClass(active)} />
                </button>
              );
            })}
            <button onClick={() => onViewChange("contact")} className={linkClass(currentView === "contact")}>
              let's talk
              <span className={underlineClass(currentView === "contact")} />
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} size="md" />
          </nav>
        </div>
      </div>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[336px] max-w-[92vw]">
        <div className="flex items-center justify-between bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/5 dark:border-white/10 rounded-[32px] p-1.5 w-full transition-colors duration-150">
          {mobileLinks.map((link) => {
            const Icon = link.icon;
            const active = currentView === link.view;
            return (
              <motion.button
                layout
                key={link.name}
                aria-label={link.name}
                onClick={() => onViewChange(link.view)}
                className={`group relative flex items-center justify-center h-11 rounded-[24px] transition-colors duration-150 overflow-hidden ${
                  active ? "px-4 bg-black/10 dark:bg-white/10 gap-2" : "w-12 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <motion.div layout className="shrink-0 flex items-center justify-center">
                  <Icon
                    size={18}
                    strokeWidth={active ? 2 : 1.75}
                    className={`transition-colors duration-150 ${
                      active
                        ? "text-black dark:text-white"
                        : "text-black/40 dark:text-white/50 group-hover:text-black/80 dark:group-hover:text-white/90"
                    }`}
                  />
                </motion.div>
                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, scale: 0.8 }}
                      animate={{ opacity: 1, width: "auto", scale: 1 }}
                      exit={{ opacity: 0, width: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium text-xs whitespace-nowrap text-black dark:text-white origin-left"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}

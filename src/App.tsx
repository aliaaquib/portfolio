import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import AskAI from "./components/AskAI";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Labs from "./components/Labs";
import Navbar, { type Theme, type View } from "./components/Navbar";
import Preloader from "./components/Preloader";
import Projects from "./components/Projects";

const views: View[] = ["home", "projects", "labs", "blog", "contact"];

// Each view has its own path, and each blog post lives at /blog/<slug>. vercel.json sends unknown paths to index.html.
type Route = { view: View; slug: string | null };

function parsePath(path: string): Route {
  const [first = "", second] = path.split("/").filter(Boolean).map(decodeURIComponent);
  const view = views.includes(first as View) ? (first as View) : "home";
  return { view, slug: view === "blog" && second ? second : null };
}

const pathFor = ({ view, slug }: Route) =>
  view === "home" ? "/" : slug ? `/blog/${encodeURIComponent(slug)}` : `/${view}`;

const pageMotion = {
  className: "w-full flex flex-col items-center",
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<Route>(() => parsePath(window.location.pathname));
  const { view, slug } = route;
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "light";
  });

  const navigate = useCallback((next: Route) => {
    const path = pathFor(next);
    if (path !== window.location.pathname) window.history.pushState(null, "", path);
    setRoute(next);
  }, []);

  const changeView = useCallback((next: View) => navigate({ view: next, slug: null }), [navigate]);

  const openPost = useCallback((next: string | null) => navigate({ view: "blog", slug: next }), [navigate]);

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onNavigate = (e: Event) => {
      const target = (e as CustomEvent<string>).detail as View;
      changeView(views.includes(target) ? target : "home");
    };
    window.addEventListener("navigate-to", onNavigate);
    return () => window.removeEventListener("navigate-to", onNavigate);
  }, [changeView]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view, slug]);

  const toggleTheme = () => {
    const flip = () => setTheme((t) => (t === "light" ? "dark" : "light"));
    if (!document.startViewTransition) {
      flip();
      return;
    }
    document.startViewTransition(() => flushSync(flip));
  };

  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Preloader onComplete={finishLoading} />}
      {!loading && <AskAI />}
      <div
        className={`relative w-full min-h-screen bg-cherry-bg text-cherry-text dark:bg-dark-bg dark:text-[#EDEDED] overflow-hidden selection:bg-cherry-pink selection:text-cherry-text font-sans transition-colors duration-150 ${
          loading ? "h-screen pointer-events-none" : "overflow-y-auto"
        }`}
      >
        <div className="fixed inset-0 pointer-events-none z-[-2] bg-cherry-bg dark:bg-dark-bg transition-colors duration-150" />
        <div className="fixed top-0 right-0 w-[80vw] h-[80vh] pointer-events-none z-[-1] bg-radial-blush dark:opacity-30" />
        {!loading && (
          <div className="fixed top-0 left-0 w-full h-14 md:h-16 backdrop-blur-md bg-white/25 dark:bg-black/25 z-40 pointer-events-none transition-colors duration-150" />
        )}
        <Navbar currentView={view} onViewChange={changeView} theme={theme} onToggleTheme={toggleTheme} />
        <main className="relative z-10 w-full flex flex-col items-center min-h-screen">
          <div className="flex-1 w-full flex flex-col items-center">
            <AnimatePresence mode="wait">
              {view === "home" && (
                <motion.div key="home" {...pageMotion}>
                  <Home onViewChange={changeView} onOpenPost={openPost} theme={theme} />
                </motion.div>
              )}
              {view === "projects" && (
                <motion.div key="projects" {...pageMotion}>
                  <Projects />
                </motion.div>
              )}
              {view === "labs" && (
                <motion.div key="labs" {...pageMotion}>
                  <Labs />
                </motion.div>
              )}
              {view === "contact" && (
                <motion.div key="contact" {...pageMotion}>
                  <Contact />
                </motion.div>
              )}
              {view === "blog" && (
                <motion.div key="blog" {...pageMotion}>
                  <Blog slug={slug} onOpenPost={openPost} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

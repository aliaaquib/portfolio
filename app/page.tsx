import Link from "next/link";
import { categories, getRecentPosts } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";

const links = [
  { label: "linkedin", href: "https://www.linkedin.com/in/aliaaquib" },
  { label: "x/twitter", href: "https://twitter.com/imaaquibali" },
  { label: "instagram", href: "https://instagram.com/alispeaksss" },
  { label: "github", href: "https://github.com/aliaaquib" },
  { label: "email", href: "mailto:imaaquibali@gmail.com" },
];

const nowItems = [
  <>
  <span
      className="underline decoration-accent/40 hover:decoration-accent underline-offset-4 transition"
    >
      teaching
    </span>{" "}
    and experimenting with better ways to explain complex ideas
  </>,
  // "building clario - ai research agent x the weekly roundup - ai powdered newsletter",
  <>
    building{" "}
    <a
      href="https://clarioagent.vercel.app"
      target="_blank"
      rel="noreferrer"
      className="underline decoration-accent/40 hover:decoration-accent underline-offset-4 transition"
    >
      clario
    </a>{" "}
    - ai research agent x{" "}
    <a
      href="https://theweeklyroundup.vercel.app"
      target="_blank"
      rel="noreferrer"
      className="underline decoration-accent/40 hover:decoration-accent underline-offset-4 transition"
    >
      the weekly roundup
    </a>{" "}
    -  ai powered newsletter
  </>,
  // "building small systems around ai workflows and automation",
  <>
    writing{" "}
    <span
      className="underline decoration-accent/40 hover:decoration-accent underline-offset-4 transition"
    >
      poetry
    </span>{" "}
    and slowly working on{" "}
    <span
      className="underline decoration-accent/40 hover:decoration-accent underline-offset-4 transition"
    >
      book
    </span>{" "}
    - Pata Hai Aaj Kya Hua
  </>,

  // "exploring tools, learning in public through experiments, notes, and prototypes",
];


const recentPosts = getRecentPosts(3);

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.05),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-4xl animate-fade-in items-center px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="w-full">
          {/* [ PERSONAL TERMINAL ] */}

          <div className="space-y-10">
            <header className="space-y-4">
              <p className="text-[11px] text-accent sm:text-xs">~/home</p>
              <h1 className="max-w-3xl text-[28px] font-medium leading-tight text-accent sm:text-[44px]">
                <span className="inline-flex items-end gap-2">
                  <span>Aaquib Ali</span>
                  <span className="mb-[0.08em] inline-block h-px w-3 bg-strong animate-blink" />
                </span>
              </h1>
              <p className="max-w-2xl text-xs leading-6 text-text/90 sm:text-sm">
                {/* teaching, building, writing, exploring intersection of ai × automation */}
                somewhere between teaching, and how work is shifting to agents
              </p>
            </header>

            <nav className="flex flex-wrap gap-3 text-[11px] text-strong sm:text-xs">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="transition-colors duration-200 hover:text-accent"
                >
                  [{link.label}]
                </a>
              ))}
            </nav>

            <section className="space-y-4">
              <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">
                teacher by day, builder the rest of the time.
                like quiet interfaces, useful systems, and internet corners that feel intentional.
                loves to write — mostly poetry, sometimes longer things — currently working on a book called "pata hai aaj kya hua".
              </p>
              {/* <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">
                this space is a small index of what i am making, what i am learning, and how i’m exploring ai and automation in real contexts.
              </p> */}
            </section>

            <section className="space-y-4 pt-2">
              <h2 className="text-sm text-accent">NOW</h2>
              <div className="border-l border-accent/40 pl-5">
                <div className="space-y-3 text-xs leading-7 text-text/90 sm:text-sm">
                  {nowItems.map((item, index) => (
                    <p key={index}>
                      <span className="mr-3 text-accent">&gt;</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4 border-b border-muted/20 pb-10 pt-2">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm uppercase text-accent">stream</h2>
                <Link
                  href="/stream"
                  className="inline-block text-[11px] text-muted transition-colors duration-200 hover:text-accent sm:text-xs"
                >
                  [view full feed]
                </Link>
              </div>
              <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">
                builds, teardowns, writings, signals — everything in one feed.
              </p>
              <div className="border-b border-muted/20" />
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <article key={post.slug} className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted sm:text-xs">
                        {post.date}
                      </p>
                      <Link
                        href={`/${post.category}`}
                        className="text-[11px] uppercase tracking-[0.18em] text-accent/60 transition-colors duration-200 hover:text-accent sm:text-xs"
                      >
                        {post.category}
                      </Link>
                    </div>
                    <Link
                      href={`/${post.category}/${post.slug}`}
                      className="inline-block text-xs text-strong transition-colors duration-200 hover:text-accent sm:text-sm"
                    >
                      {post.title}
                    </Link>
                    <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">{post.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}

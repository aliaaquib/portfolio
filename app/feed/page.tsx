import type { Metadata } from "next";
import Link from "next/link";
import { categories, getSortedPosts } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Feed",
  description: "The latest blogs, writings, and research notes from Aaquib Ali.",
  alternates: {
    canonical: "/feed",
  },
};

const feedPosts = getSortedPosts();

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="space-y-10">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted sm:text-base">
              <span className="text-accent">feed</span>
            </div>
            <h1 className="text-xl font-medium leading-tight text-strong sm:text-3xl">feed</h1>
          </header>

          <nav className="flex flex-wrap gap-3 text-sm text-muted sm:text-base">
            {categories.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="transition-colors duration-200 hover:text-accent"
              >
                [{item.label}]
              </Link>
            ))}
          </nav>

          <div className="space-y-8 border-b border-muted/20 pb-10">
            {feedPosts.map((post) => (
              <article key={post.slug} className="group space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm uppercase tracking-[0.18em] text-muted sm:text-base">
                    {post.date}
                  </p>
                  <Link
                    href={`/${post.category}`}
                    className="text-sm uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-text sm:text-base"
                  >
                    {post.category}
                  </Link>
                </div>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="inline-block text-sm text-strong transition-colors duration-200 group-hover:text-accent sm:text-base"
                >
                  {post.title}
                </Link>
                <p className="max-w-content text-sm leading-7 text-muted sm:text-base sm:leading-8">{post.summary}</p>
              </article>
            ))}
          </div>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}

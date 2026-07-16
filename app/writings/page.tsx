import type { Metadata } from "next";
import { getSortedPosts } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WritingList } from "@/components/writing-list";

export const metadata: Metadata = {
  title: "Writings",
  description: "Short notes, essays, and drafts from Aaquib Ali.",
  alternates: {
    canonical: "/writings",
  },
};

export default function WritingsPage() {
  const writingPosts = getSortedPosts();

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="space-y-10">
          <SiteNav />
          <header className="space-y-4">
            <h1 className="text-xl font-medium leading-tight text-strong sm:text-3xl">writings</h1>
            <p className="max-w-content text-sm leading-7 text-muted sm:text-base sm:leading-8">
              short notes, essays, and drafts on working with ai, automation, and the surrounding tools.
            </p>
          </header>

          <WritingList posts={writingPosts} />
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}

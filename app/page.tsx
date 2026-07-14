import type { Metadata } from "next";
import { getRecentPosts } from "@/lib/posts";
import { HomeTabs } from "@/components/home-tabs";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const recentPosts = getRecentPosts(3);

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl animate-fade-in items-center px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="w-full">
          {/* [ PERSONAL TERMINAL ] */}

          <HomeTabs recentPosts={recentPosts}>
            <header className="space-y-4">
              <h1 className="max-w-4xl text-[40px] leading-tight tracking-tight text-strong sm:text-[60px]">
                aaquib ali<span className="text-red-700">.</span>
              </h1>
              <p className="max-w-content text-justify text-sm leading-7 text-muted sm:text-base sm:leading-8">
                teacher by day, builder the rest of the time. like quiet interfaces, useful systems,
                and internet corners that feel intentional. loves to write — poetry, raw thoughts.
                working on a book - <span>"pata hai aaj kya hua"</span>.
              </p>
            </header>
          </HomeTabs>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}

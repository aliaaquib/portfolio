import type { Metadata } from "next";
import { getRecentPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { HomeTabs } from "@/components/home-tabs";
import { Mascot } from "@/components/mascot";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export const revalidate = 60;

export default async function Home() {
  const [recentPosts, projects] = await Promise.all([getRecentPosts(3), getFeaturedProjects(3)]);

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl animate-fade-in items-center px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="w-full">
          {/* [ PERSONAL TERMINAL ] */}

          <HomeTabs recentPosts={recentPosts} projects={projects}>
            <header className="space-y-4">
              <div className="flex items-center gap-5 sm:gap-7">
                <Mascot
                  directions="/mascots/aaquib-directions.webp"
                  reactions="/mascots/aaquib-reactions.webp"
                  size={132}
                  label="Mini Aaquib, following your cursor"
                />
                <h1 className="max-w-4xl text-[40px] leading-tight tracking-tight text-strong sm:text-[60px]">
                  aaquib ali<span className="text-red-700">.</span>
                </h1>
              </div>
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

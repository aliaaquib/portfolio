import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WritingTabs } from "@/components/writing-tabs";
import { getSortedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays, explainers, and research notes by Aaquib Ali.",
  alternates: {
    canonical: "/writing",
  },
};

export default async function WritingPage() {
  const posts = await getSortedPosts();
  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <div className="pb-4 pt-10 sm:pt-14">
          <WritingTabs posts={posts} />
        </div>

        <div className="pb-20 pt-16">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}

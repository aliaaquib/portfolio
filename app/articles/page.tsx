import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPosts, getReadingTime } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and explainers on computer science and AI by Aaquib Ali.",
  alternates: {
    canonical: "/articles",
  },
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getSortedPosts();

  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <header className="pb-10 pt-14 sm:pt-20">
          <Reveal>
            <h1 className="font-display text-6xl tracking-tight text-strong sm:text-7xl">
              Writing
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              CS and AI, explained simply.
            </p>
          </Reveal>
        </header>

        <div className="border-t border-muted/20" />

        <div className="pb-8">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={Math.min(index, 6) * 60}>
              <Link
                href={`/articles/${article.slug}`}
                className="group block border-b border-muted/20 py-8 transition-colors duration-200"
              >
                <h2 className="font-display text-[28px] leading-snug tracking-tight text-strong transition-colors duration-200 group-hover:text-brandred sm:text-[32px]">
                  {article.title}
                </h2>
                {article.excerpt ? (
                  <p className="mt-3 max-w-content text-[15px] leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                ) : null}
                <p className="mt-4 font-sans text-[13px] tracking-wide text-muted">
                  {article.date}
                  <span className="mx-2 text-muted/40">&middot;</span>
                  {getReadingTime(article)}
                  {article.category ? (
                    <>
                      <span className="mx-2 text-muted/40">&middot;</span>
                      {article.category}
                    </>
                  ) : null}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}

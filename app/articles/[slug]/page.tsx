import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/components/content-renderer";
import { PageActions } from "@/components/page-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { getPostBySlug, getPostSlugs, getReadingTime } from "@/lib/posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      url: `/articles/${article.slug}`,
      publishedTime: article.publishedDate,
      images: article.image.src ? [article.image.src] : undefined,
    },
  };
}

const PLACEHOLDER_COVER = "three-patterns.svg";

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  const hasRealCover = Boolean(
    article.image.src && !article.image.src.endsWith(PLACEHOLDER_COVER)
  );

  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />
      <PageActions returnHref="/articles" />

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <article className="pb-10 pt-12 sm:pt-16">
          <Reveal>
            {article.category ? (
              <p className="font-sans text-[13px] uppercase tracking-[0.14em] text-muted">
                {article.category}
              </p>
            ) : null}
            <h1 className="mt-4 font-display text-[42px] leading-[1.1] tracking-tight text-strong sm:text-[54px]">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mt-5 max-w-content text-[17px] leading-relaxed text-muted">
                {article.excerpt}
              </p>
            ) : null}
            {article.tags?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-muted/25 px-3 py-1 font-sans text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="mt-6 font-sans text-sm tracking-wide text-muted">
              {article.date}
              <span className="mx-2 text-muted/40">&middot;</span>
              {getReadingTime(article)}
            </p>
          </Reveal>

          {hasRealCover ? (
            <Reveal delay={100}>
              <figure className="mt-10 overflow-hidden rounded-3xl border border-muted/15 bg-black/[0.03]">
                <Image
                  src={article.image.src}
                  alt={article.image.alt}
                  width={1200}
                  height={675}
                  className="aspect-[16/9] w-full object-cover"
                  sizes="(min-width: 768px) 768px, calc(100vw - 40px)"
                />
              </figure>
            </Reveal>
          ) : null}

          <div className="mt-10 border-t border-muted/20" />

          <Reveal delay={120}>
            <div className="space-y-6 pt-10 text-[17px] leading-[1.8] text-text/90">
              <ContentRenderer body={article.body} />
            </div>
          </Reveal>

          <div className="mt-14 border-t border-muted/20 pt-6">
            <p className="text-[15px] italic leading-relaxed text-muted">
              Aaquib Ali is a computer science and mathematics teacher. He writes
              about CS and AI in plain language.
            </p>
            <Link
              href="/articles"
              className="mt-8 inline-block text-[15px] text-strong underline decoration-strong/30 underline-offset-4 transition hover:decoration-brandred hover:text-brandred"
            >
              &larr; All articles
            </Link>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}

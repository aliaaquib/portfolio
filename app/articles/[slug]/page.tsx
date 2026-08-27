import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/components/content-renderer";
import { PageActions } from "@/components/page-actions";
import { SectionNav } from "@/components/section-nav";
import { SiteFooter } from "@/components/site-footer";
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

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <article className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-14">
        <PageActions />

        <header className="mx-auto max-w-3xl space-y-6 pb-10 pt-24 text-center sm:pt-28">
          <p className="font-sans text-xs text-muted sm:text-sm">{article.category || "Article"}</p>
          <h1 className="mx-auto max-w-2xl text-3xl leading-tight tracking-tight text-strong sm:text-4xl">
            {article.title}
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            {article.excerpt}
          </p>
          <div className="mx-auto max-w-2xl border-t border-muted/20" />
          <div className="flex justify-center gap-3 pt-4 font-sans text-xs text-muted sm:text-sm">
            <span>{article.date}</span>
            <span className="text-muted/40">·</span>
            <span>{getReadingTime(article)}</span>
          </div>
          {article.image.src ? (
            <figure className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-muted/15 bg-black/[0.03]">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                width={1200}
                height={675}
                className="aspect-[16/9] w-full object-cover"
                priority
                sizes="(min-width: 1024px) 672px, calc(100vw - 48px)"
              />
            </figure>
          ) : null}
        </header>

        <div className="relative mx-auto grid max-w-5xl gap-10 pb-8 pt-16 lg:grid-cols-[minmax(0,38rem)] lg:justify-center">
          <SectionNav
            items={article.sections.map((section, index) => ({
              id: `section-${index}`,
              title: section.title,
            }))}
          />

          <div className="space-y-12 border-b border-muted/20 pb-6">
            {article.sections.map((section, index) => (
              <section key={`${section.title}-${index}`} id={`section-${index}`} className="scroll-mt-10 space-y-5">
                <h2 className="text-xl leading-tight text-strong sm:text-2xl">{section.title}</h2>
                <div className="space-y-6 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
                  <ContentRenderer body={section.body} paragraphs={section.paragraphs} />
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <SiteFooter />
        </div>
      </article>
    </main>
  );
}

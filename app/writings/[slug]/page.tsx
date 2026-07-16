import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";
import { ArticleActions } from "@/components/article-actions";
import { SectionNav } from "@/components/section-nav";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/writings/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/writings/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default function EntryPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleSections = post.sections;
  const articleText = articleSections
    .flatMap((section) => [section.title, ...section.paragraphs])
    .join(" ");
  const readMinutes = Math.max(1, Math.ceil(articleText.split(/\s+/).length / 180));

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <article className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-14">
        <ArticleActions />

        <header className="mx-auto max-w-3xl space-y-6 pb-10 pt-24 text-center sm:pt-28">
          <p className="font-sans text-xs text-muted sm:text-sm">Writing</p>
          <h1 className="mx-auto max-w-2xl text-3xl leading-tight tracking-tight text-strong sm:text-4xl">
            {post.title}
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            {post.summary}
          </p>
          <div className="mx-auto max-w-2xl border-t border-muted/20" />
          <div className="flex justify-center gap-3 pt-4 font-sans text-xs text-muted sm:text-sm">
            <span>{post.date}</span>
            <span className="text-muted/40">·</span>
            <span>{readMinutes} min read</span>
          </div>
          <figure className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-muted/15 bg-black/[0.03]">
            <img
              src={post.image.src}
              alt={post.image.alt}
              className="aspect-[16/9] w-full object-cover"
            />
          </figure>
        </header>

        <div className="relative mx-auto grid max-w-5xl gap-10 py-16 lg:grid-cols-[minmax(0,38rem)] lg:justify-center">
          <SectionNav
            items={articleSections.map((section, index) => ({
              id: `section-${index}`,
              title: section.title,
            }))}
          />

          <div className="space-y-12 border-b border-muted/20 pb-12">
            {articleSections.map((section, index) => (
              <section key={section.title} id={`section-${index}`} className="scroll-mt-10 space-y-5">
                <h2 className="text-xl leading-tight text-strong sm:text-2xl">{section.title}</h2>
                <div className="space-y-6 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
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

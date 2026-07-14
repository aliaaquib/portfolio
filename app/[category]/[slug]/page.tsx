import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Category, categories, getPostBySlug, posts } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";

type PageProps = {
  params: {
    category: string;
    slug: string;
  };
};

function isCategory(value: string): value is Category {
  return categories.some((item) => item.key === value);
}

export function generateStaticParams() {
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post || post.category !== params.category) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/${post.category}/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/${post.category}/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default function EntryPage({ params }: PageProps) {
  const { category, slug } = params;

  if (!isCategory(category)) {
    notFound();
  }

  const post = getPostBySlug(slug);

  if (!post || post.category !== category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <article className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="space-y-10">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted sm:text-base">
            <Link href="/feed" className="transition-colors duration-200 hover:text-accent">
              feed
            </Link>
            <span className="text-muted/40">/</span>
            <span className="text-accent">
              {post.category}
            </span>
          </div>

          <header className="space-y-4 border-b border-muted/20 pb-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted sm:text-base">
              <p className="uppercase tracking-[0.18em]">{post.date}</p>
            </div>
            <h1 className="max-w-4xl text-xl font-medium leading-tight text-strong sm:text-3xl">{post.title}</h1>
            <p className="max-w-content text-sm leading-7 text-muted sm:text-base sm:leading-8">{post.summary}</p>
          </header>

          <div className="max-w-content border-b border-muted/20 pb-10">
            <div className="space-y-6 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <SiteFooter />
        </div>
      </article>
    </main>
  );
}

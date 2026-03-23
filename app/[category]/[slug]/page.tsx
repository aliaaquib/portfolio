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
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.05),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <article className="relative mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 lg:px-14">
        <div className="space-y-10">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted sm:text-xs">
            <Link href="/" className="transition-colors duration-200 hover:text-accent">
              ~/home
            </Link>
            <span className="text-muted/40">/</span>
            <Link href="/stream" className="transition-colors duration-200 hover:text-accent">
              stream
            </Link>
            <span className="text-muted/40">/</span>
            <Link href={`/${post.category}`} className="transition-colors duration-200 hover:text-accent">
              {post.category}
            </Link>
          </div>

          <header className="space-y-4 border-b border-muted/20 pb-10">
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted sm:text-xs">
              <p className="uppercase tracking-[0.18em]">{post.date}</p>
            </div>
            <h1 className="max-w-3xl text-xl font-medium leading-tight text-strong sm:text-3xl">{post.title}</h1>
            <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">{post.summary}</p>
          </header>

          <div className="max-w-2xl border-b border-muted/20 pb-10">
            <div className="space-y-6 text-xs leading-8 text-text/90 sm:text-sm">
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

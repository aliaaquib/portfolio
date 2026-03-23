import Link from "next/link";
import { categories, Category, getPostsByCategory } from "@/lib/posts";
import { SiteFooter } from "@/components/site-footer";

type ContentListProps = {
  title: string;
  category: Category;
  description: string;
};

export function ContentList({ title, category, description }: ContentListProps) {
  const items = getPostsByCategory(category);

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.05),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="space-y-10">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted sm:text-xs">
              <Link href="/" className="transition-colors duration-200 hover:text-accent">
                ~/home
              </Link>
              <span className="text-muted/40">/</span>
              <Link href="/stream" className="transition-colors duration-200 hover:text-accent">
                stream
              </Link>
              <span className="text-muted/40">/</span>
              <span className="text-accent">{category}</span>
            </div>
            <h1 className="text-2xl font-medium leading-tight text-strong sm:text-4xl">{title}</h1>
            <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">{description}</p>
          </header>

          <nav className="flex flex-wrap gap-3 border-b border-muted/20 pb-6 text-[11px] text-muted sm:text-xs">
            {categories.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={item.key === category ? "text-accent" : "transition-colors duration-200 hover:text-accent"}
              >
                [{item.label}]
              </Link>
            ))}
          </nav>

          <div className="space-y-8 border-b border-muted/20 pb-10">
            {items.map((post) => (
              <article
                key={post.slug}
                className="group space-y-2 border-b border-muted/20 pb-8 last:border-b-0 last:pb-0"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted sm:text-xs">
                  {post.date}
                </p>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="inline-block text-xs text-strong transition-colors duration-200 group-hover:text-accent sm:text-sm"
                >
                  {post.title}
                </Link>
                <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">{post.summary}</p>
              </article>
            ))}
          </div>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}

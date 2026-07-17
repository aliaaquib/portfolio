import Link from "next/link";
import type { Post } from "@/lib/posts";

export function WritingList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-8 border-b border-muted/20 pb-10">
      {posts.map((post) => (
        <article key={post.slug} className="group">
          <Link
            href={`/writings/${post.slug}`}
            className="flex max-w-content items-baseline justify-between gap-4 text-sm text-strong transition-colors duration-200 group-hover:text-accent sm:text-base"
          >
            <span>{post.title}.</span>
            <span className="shrink-0 text-muted">{post.date}</span>
          </Link>
        </article>
      ))}
    </div>
  );
}

import Link from "next/link";
import type { Post } from "@/lib/posts";

export function WritingList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-8 border-b border-muted/20 pb-10">
      {posts.map((post) => (
        <article key={post.slug} className="group space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm uppercase tracking-[0.18em] text-muted sm:text-base">
              {post.date}
            </p>
          </div>
          <Link
            href={`/writings/${post.slug}`}
            className="inline-block text-sm text-strong transition-colors duration-200 group-hover:text-accent sm:text-base"
          >
            {post.title}
          </Link>
          <p className="max-w-content text-sm leading-7 text-muted sm:text-base sm:leading-8">
            {post.summary}
          </p>
        </article>
      ))}
    </div>
  );
}

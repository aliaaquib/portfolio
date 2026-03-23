import { ContentList } from "@/components/content-list";

export default function BlogPage() {
  return (
    <ContentList
      title="blog"
      category="blog"
      description="blog posts only. use stream for the mixed feed and the other sections for their own slices."
    />
  );
}

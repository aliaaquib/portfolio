import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blog posts by Aaquib Ali on AI, automation, teaching, and thoughtful systems.",
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsPage() {
  return (
    <ContentList
      title="blogs"
      category="blogs"
      description="blog posts only. use feed for the mixed feed and the other sections for their own slices."
    />
  );
}

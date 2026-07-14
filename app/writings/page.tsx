import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";

export const metadata: Metadata = {
  title: "Writings",
  description: "Short notes, essays, and drafts from Aaquib Ali.",
  alternates: {
    canonical: "/writings",
  },
};

export default function WritingsPage() {
  return (
    <ContentList
      title="writings"
      category="writings"
      description="short notes, essays, and drafts on working with ai, automation, and the surrounding tools."
    />
  );
}

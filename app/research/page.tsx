import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";

export const metadata: Metadata = {
  title: "Research",
  description: "Research notes, workflow observations, and patterns from Aaquib Ali.",
  alternates: {
    canonical: "/research",
  },
};

export default function ResearchPage() {
  return (
    <ContentList
      title="research"
      category="research"
      description="research notes, workflow observations, and patterns worth keeping an eye on."
    />
  );
}

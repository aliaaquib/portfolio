import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { ResearchReader } from "@/components/research-reader";
import { getResearchNote, getResearchSlugs } from "@/lib/research";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getResearchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getResearchNote(slug);
  if (!note) {
    return { title: "Research" };
  }
  return {
    title: note.title,
    description: note.description,
    alternates: {
      canonical: `/research/${note.slug}`,
    },
  };
}

export default async function ResearchNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getResearchNote(slug);
  if (!note) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <div className="pt-10 sm:pt-14">
          <Reveal>
            <ResearchReader note={note} />
          </Reveal>
        </div>

        <div className="pb-20 pt-16">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}

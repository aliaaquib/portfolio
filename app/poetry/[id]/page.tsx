import { getPoetryById, getPoetries } from "@/lib/poetry";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import React from "react";

// ✅ Allow dynamic route resolution
// export const dynamicParams = true;

// ✅ Pre-render available poetry pages
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const poetries = await getPoetries();
  return poetries.map(poetry => ({ id: poetry.id }));
}

type PoetryPageProps = {
  params: { id: string };
};
export default async function PoetryPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const poetry = await getPoetryById(id);

  if (!poetry) {
    notFound();
  }

  return (
    <div className="mt-10 max-w-3xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">{poetry.title}</h1>
        <p className="text-lg text-muted-foreground">{poetry.description}</p>
        <hr className="border-muted" />
      </div>

      <div className="prose prose-lg prose-neutral dark:prose-invert whitespace-pre-wrap leading-relaxed">
        {poetry.content}
      </div>

      <div>
        <Link
          href="/poetries"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to all poetries
        </Link>
      </div>
    </div>
  );
}

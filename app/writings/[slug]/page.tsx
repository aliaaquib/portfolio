import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WritingSlugRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  redirect(`/articles/${slug}`);
}

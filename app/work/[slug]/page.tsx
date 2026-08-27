import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/components/content-renderer";
import { PageActions } from "@/components/page-actions";
import { SectionNav } from "@/components/section-nav";
import { SiteFooter } from "@/components/site-footer";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/work/${project.slug}`,
      images: project.image.src ? [project.image.src] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <article className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-14">
        <PageActions />

        <header className="mx-auto max-w-3xl space-y-6 pb-10 pt-24 text-center sm:pt-28">
          <p className="font-sans text-xs text-muted sm:text-sm">{project.eyebrow}</p>
          <h1 className="mx-auto max-w-3xl text-3xl leading-tight tracking-tight text-strong sm:text-5xl">
            {project.title}
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            {project.description}
          </p>
          <div className="mx-auto max-w-2xl border-t border-muted/20" />
          <dl className="mx-auto grid max-w-2xl grid-cols-2 gap-5 pt-4 font-sans text-xs sm:grid-cols-4 sm:text-sm">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-2 text-strong">{project.role}</dd>
            </div>
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="mt-2 text-strong">{project.year}</dd>
            </div>
            <div>
              <dt className="text-muted">Type</dt>
              <dd className="mt-2 text-strong">{project.type}</dd>
            </div>
            <div>
              <dt className="text-muted">{project.projectUrl ? "Live" : "Focus"}</dt>
              <dd className="mt-2">
                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-strong underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                  >
                    {project.projectUrlLabel || "View site"}
                  </a>
                ) : (
                  <span className="text-strong">{project.status}</span>
                )}
              </dd>
            </div>
          </dl>
          {project.image.src ? (
            <figure className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-muted/15 bg-black/[0.03]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={1400}
                height={875}
                className="aspect-[16/10] w-full object-cover"
                priority
                sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
              />
            </figure>
          ) : null}
        </header>

        <div className="relative mx-auto grid max-w-5xl gap-10 pb-8 pt-16 lg:grid-cols-[minmax(0,38rem)] lg:justify-center">
          <SectionNav
            items={project.sections.map((section, index) => ({
              id: `section-${index}`,
              title: section.title,
            }))}
          />

          <div className="space-y-12 border-b border-muted/20 pb-6">
            {project.sections.map((section, index) => (
              <section key={section.title} id={`section-${index}`} className="scroll-mt-24 space-y-5">
                <h2 className="text-xl leading-tight text-strong sm:text-2xl">{section.title}</h2>
                <div className="space-y-6 text-sm leading-7 text-text/90 sm:text-base sm:leading-8">
                  <ContentRenderer body={section.body} paragraphs={section.paragraphs} />
                </div>
                {section.image ? (
                  <figure className="overflow-hidden rounded-[1.75rem] border border-muted/15 bg-black/[0.03]">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      width={1200}
                      height={675}
                      className="aspect-[16/9] w-full object-cover"
                      sizes="(min-width: 1024px) 608px, calc(100vw - 48px)"
                    />
                  </figure>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <SiteFooter />
        </div>
      </article>
    </main>
  );
}

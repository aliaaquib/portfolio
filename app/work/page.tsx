import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getSortedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "All work, projects, and research from Aaquib Ali.",
  alternates: {
    canonical: "/work",
  },
};

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getSortedProjects();

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.025),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="space-y-10">
          <SiteNav />
          <header className="space-y-4">
            <h1 className="text-xl font-medium leading-tight text-strong sm:text-3xl">work</h1>
            <p className="max-w-content text-sm leading-7 text-muted sm:text-base sm:leading-8">
              all projects, research, and experiments.
            </p>
          </header>

          <div className="space-y-8 border-b border-muted/20 pb-10">
            {projects.map((project) => (
              <article key={project.slug} className="group w-full max-w-2xl space-y-3">
                <Link
                  href={`/work/${project.slug}`}
                  className="block overflow-hidden rounded-[1.5rem] border border-black/10 bg-black/[0.05] transition duration-300 hover:bg-black/[0.07]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg shadow-sm">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 576px, calc(100vw - 56px)"
                      unoptimized={!project.image.src.includes("cdn.sanity.io")}
                    />
                  </div>
                </Link>

                <div className="grid gap-1 font-sans text-xs sm:grid-cols-[1fr_auto] sm:items-start sm:gap-3 sm:text-sm">
                  <Link href={`/work/${project.slug}`} className="min-w-0">
                    <h2 className="text-strong">{project.title}</h2>
                    <p className="text-muted">{project.summary}</p>
                  </Link>
                  {project.projectUrl ? (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted transition-colors duration-200 hover:text-strong"
                    >
                      {project.projectUrlLabel || "View site"}
                    </a>
                  ) : (
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-muted transition-colors duration-200 hover:text-strong"
                    >
                      View research
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}

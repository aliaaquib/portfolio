import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work from Aaquib Ali — Thread Academy and Clario.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6">
        <header className="pb-4 pt-10 sm:pt-14">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
              selected work
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-strong sm:text-[44px]">
              <span aria-hidden="true" className="section-tick" />
              Proof of shipped things
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-8 text-text/90">
              Things I have actually shipped — a free learning platform and an AI
              research agent.
            </p>
          </Reveal>
        </header>

        <WorkGrid />

        <div className="pb-20 pt-16">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}

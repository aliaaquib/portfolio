import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { AboutAccordion } from "@/components/about-accordion";
import { FindMeGrid } from "@/components/find-me-grid";
import { BentoAbout } from "@/components/bento-about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aaquib Ali — computer science teacher and builder in Bishkek, Kyrgyzstan. Teaching, building, and writing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav />
      <main className="mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8">
        <BentoAbout />

        {/* Why teaching? */}
        <section className="mx-auto mt-14 max-w-2xl sm:mt-16">
          <Reveal>
            <AboutAccordion question="Why teaching?">
              Because the best feeling is watching something confusing turn
              obvious. Most of my lesson ideas start as answers to real
              student questions — the classroom is where everything I build
              gets tested first.
            </AboutAccordion>
          </Reveal>
        </section>

        {/* You can usually find me... */}
        <section className="mt-16 sm:mt-20">
          <Reveal>
            <h2 className="font-signature text-[38px] leading-tight text-strong sm:text-[48px]">
              you can usually find me...
            </h2>
          </Reveal>
          <FindMeGrid />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

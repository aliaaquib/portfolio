import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { AboutAccordion } from "@/components/about-accordion";
import { FindMeGrid } from "@/components/find-me-grid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aaquib Ali — computer science teacher and builder in Bishkek, Kyrgyzstan. Teaching, building, and writing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main className="mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8">
        {/* Hero — portrait, greeting, bio, accordion */}
        <section className="grid items-center gap-8 pt-14 sm:grid-cols-[1fr_2fr] sm:gap-12 sm:pt-20">
          <Reveal>
            <div className="group mx-auto w-full max-w-[260px] overflow-hidden rounded-[20px] sm:mx-0">
              <img
                src="/portrait.jpg"
                alt="Aaquib Ali"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <p className="font-signature text-[42px] leading-none text-strong sm:text-[50px]">
                hi, i&apos;m Aaquib!
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-[15px] leading-7 text-strong/90">
                I&apos;m Aaquib Ali, a computer science teacher and builder in
                Bishkek, Kyrgyzstan. I spend my days turning recursion, Big-O
                and how AI actually works into things my students find obvious
                — and the rest of my time taking ideas all the way to working
                products: Thread Academy, Clario, and The Weekly Roundup. Away
                from the classroom, I write the occasional poem and a book of
                raw thoughts called <em className="font-display">pata hai aaj kya hua</em>.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10">
                <AboutAccordion question="Why teaching?">
                  Because the best feeling is watching something confusing turn
                  obvious. Most of my lesson ideas start as answers to real
                  student questions — the classroom is where everything I build
                  gets tested first.
                </AboutAccordion>
              </div>
            </Reveal>
          </div>
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

import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { AboutAccordion } from "@/components/about-accordion";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aaquib Ali — computer science teacher and builder in Bishkek, Kyrgyzstan. Teaching, building, and writing.",
  alternates: { canonical: "/about" },
};

const FIND_ME: {
  label: string;
  cards: { src: string; alt: string; aspect: string; tilt: string }[];
}[] = [
  {
    label: "teaching",
    cards: [
      {
        src: "/images/about/teaching-1.jpg",
        alt: "Sample photo",
        aspect: "aspect-[4/5]",
        tilt: "-rotate-1",
      },
      {
        src: "/images/about/teaching-2.jpg",
        alt: "Sample photo",
        aspect: "aspect-square",
        tilt: "rotate-1",
      },
    ],
  },
  {
    label: "building",
    cards: [
      {
        src: "/images/about/building-1.jpg",
        alt: "Sample photo",
        aspect: "aspect-[3/4]",
        tilt: "rotate-1",
      },
      {
        src: "/images/about/building-2.jpg",
        alt: "Sample photo",
        aspect: "aspect-[4/5]",
        tilt: "-rotate-1",
      },
    ],
  },
  {
    label: "writing",
    cards: [
      {
        src: "/images/about/writing-1.jpg",
        alt: "Sample photo",
        aspect: "aspect-square",
        tilt: "-rotate-1",
      },
      {
        src: "/images/about/writing-2.jpg",
        alt: "Sample photo",
        aspect: "aspect-[3/4]",
        tilt: "rotate-1",
      },
    ],
  },
];

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
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-8">
            {FIND_ME.map((col, ci) => (
              <Reveal
                key={col.label}
                delay={ci * 120}
                className={ci === 1 ? "sm:translate-y-10" : ""}
              >
                <p className="text-center text-[18px] font-medium text-strong">
                  {col.label}
                </p>
                <div className="mt-5 space-y-6">
                  {col.cards.map((card) => (
                    <div
                      key={card.src}
                      className={`group overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_16px_40px_rgba(63,58,52,0.16)] ${card.tilt}`}
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        loading="lazy"
                        className={`${card.aspect} w-full bg-[#f6f4ef] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

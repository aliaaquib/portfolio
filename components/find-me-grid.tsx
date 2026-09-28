import { Reveal } from "@/components/reveal";

const CARDS: { src: string; alt: string; aspect: string; tilt: string }[] = [
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
];

const GROUPS = [
  { label: "teaching", cards: CARDS.slice(0, 2) },
  { label: "building", cards: CARDS.slice(2, 4) },
  { label: "writing", cards: CARDS.slice(4, 6) },
];

function PhotoCard({
  card,
  aspect,
}: {
  card: { src: string; alt: string; tilt: string };
  aspect: string;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_16px_40px_rgba(63,58,52,0.16)] ${card.tilt}`}
    >
      <img
        src={card.src}
        alt={card.alt}
        loading="lazy"
        className={`${aspect} w-full bg-[#f6f4ef] dark:bg-[#2b241e] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
      />
    </div>
  );
}

export function FindMeGrid() {
  return (
    <>
      {/* mobile: flat 2-column grid — 3 rows of 2 cards */}
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:hidden">
        {CARDS.map((card, i) => (
          <Reveal key={card.src} delay={i * 80}>
            <PhotoCard card={card} aspect="aspect-[4/5]" />
          </Reveal>
        ))}
      </div>

      {/* sm and up: staggered 3-column groups */}
      <div className="mx-auto mt-10 hidden max-w-3xl grid-cols-3 gap-x-8 sm:grid">
        {GROUPS.map((col, ci) => (
          <Reveal
            key={col.label}
            delay={ci * 120}
            className={ci === 1 ? "sm:translate-y-10" : ""}
          >
            <div className="space-y-6">
              {col.cards.map((card) => (
                <PhotoCard key={card.src} card={card} aspect={card.aspect} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

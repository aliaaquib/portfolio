import { Reveal } from "@/components/reveal";

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

export function FindMeGrid() {
  return (
    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-8">
      {FIND_ME.map((col, ci) => (
        <Reveal
          key={col.label}
          delay={ci * 120}
          className={ci === 1 ? "sm:translate-y-10" : ""}
        >
          <div className="space-y-6">
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
  );
}

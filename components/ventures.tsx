import { Reveal } from "@/components/reveal";

const GLYPH = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fff",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Clario — a morning sun: the briefing agent. */
function ClarioMark() {
  return (
    <svg {...GLYPH} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5" />
      <path d="M12 19v2.5" />
      <path d="M2.5 12H5" />
      <path d="M19 12h2.5" />
      <path d="M5.3 5.3l1.8 1.8" />
      <path d="M16.9 16.9l1.8 1.8" />
      <path d="M18.7 5.3l-1.8 1.8" />
      <path d="M7.1 16.9l-1.8 1.8" />
    </svg>
  );
}

/** Readsmith — a README page. */
function ReadsmithMark() {
  return (
    <svg {...GLYPH} aria-hidden="true">
      <path d="M6 3h7.5L18 7.5V21H6z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9 12.5h6" />
      <path d="M9 16h6" />
    </svg>
  );
}

/** School Hunter — a magnifier. */
function SchoolHunterMark() {
  return (
    <svg {...GLYPH} aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="M15.8 15.8L20.5 20.5" />
    </svg>
  );
}

/** Hisab — a stack of coins. */
function HisabMark() {
  return (
    <svg {...GLYPH} aria-hidden="true">
      <ellipse cx="12" cy="6.5" rx="6.5" ry="2.8" />
      <path d="M5.5 6.5v5c0 1.6 2.9 2.8 6.5 2.8s6.5-1.2 6.5-2.8v-5" />
      <path d="M5.5 11.5v5c0 1.6 2.9 2.8 6.5 2.8s6.5-1.2 6.5-2.8v-5" />
    </svg>
  );
}

type Venture = {
  name: string;
  href?: string;
  blurb: string;
  logoBg: string;
  Logo: () => React.JSX.Element;
};

const VENTURES: Venture[] = [
  {
    name: "clario",
    href: "https://clarioagent.vercel.app",
    blurb: "an AI agent that briefs you on your day.",
    logoBg: "#2f6fd0",
    Logo: ClarioMark,
  },
  {
    name: "readsmith",
    blurb: "a README generator for your repos.",
    logoBg: "#2e7d46",
    Logo: ReadsmithMark,
  },
  {
    name: "school hunter",
    href: "https://school-hunter-4euqwoefr-aaquibali.vercel.app",
    blurb: "finds schools\u2019 HR contacts across Asia.",
    logoBg: "#6d28d9",
    Logo: SchoolHunterMark,
  },
  {
    name: "hisab",
    blurb: "a personal expense-tracker app.",
    logoBg: "#c82828",
    Logo: HisabMark,
  },
];

function ArrowUpRight() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function StatusLabel({ href }: { href?: string }) {
  const classes =
    "inline-flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]";
  if (href) {
    return (
      <span className={`${classes} text-emerald-700 dark:text-emerald-500`}>
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-emerald-500"
        />
        live now
      </span>
    );
  }
  return (
    <span className={`${classes} text-amber-700 dark:text-amber-500`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-500" />
      still building
    </span>
  );
}

function VentureCard({ venture }: { venture: Venture }) {
  const { Logo } = venture;
  const card = (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-strong/10 bg-surface p-5 transition-colors sm:flex-row sm:items-center sm:gap-6 ${
        venture.href ? "group-hover:border-strong/25" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-3.5 sm:w-60 sm:shrink-0">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-lg"
          style={{ backgroundColor: venture.logoBg }}
        >
          <Logo />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-base font-medium lowercase tracking-tight text-strong">
            {venture.name}
            {venture.href && <ArrowUpRight />}
          </span>
        </span>
      </div>
      <p className="min-w-0 flex-1 text-sm leading-6 text-muted">
        {venture.blurb}
      </p>
      <div className="flex sm:w-36 sm:shrink-0 sm:justify-end">
        <StatusLabel href={venture.href} />
      </div>
    </div>
  );
  return (
    <Reveal>
      {venture.href ? (
        <a
          href={venture.href}
          target="_blank"
          rel="noreferrer"
          className="group block"
        >
          {card}
        </a>
      ) : (
        <div>{card}</div>
      )}
    </Reveal>
  );
}

export function Ventures() {
  return (
    <div>
      <Reveal>
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            ventures
          </p>
          <h2 className="mt-2 font-sans text-3xl font-medium tracking-tight text-strong">
            things I started
          </h2>
          <p className="mt-2 text-sm text-muted">
            green is live. amber is still being built.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-3">
        {VENTURES.map((v) => (
          <VentureCard key={v.name} venture={v} />
        ))}
      </div>
    </div>
  );
}

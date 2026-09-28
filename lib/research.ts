export type ResearchCapability = {
  icon: "file" | "layers" | "package" | "zap" | "align" | "list" | "book" | "link";
  title: string;
  text: string;
};

export type ResearchDecision = {
  title: string;
  text: string;
};

export type ResearchNote = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  capabilities: ResearchCapability[];
  whyMatters: string;
  decisions: ResearchDecision[];
};

export const RESEARCH_NOTES: ResearchNote[] = [
  {
    slug: "academy-pipeline",
    title: "Academy pipeline",
    description:
      "How a curriculum becomes thousands of static pages. One content tree per curriculum — Cambridge, American, IB — chapters written as MDX, everything pre-rendered at build time. No database, no server, nothing to break.",
    problem:
      "A learning platform serving three curricula has a content problem. Cambridge, American, and IB each slice subjects differently — different levels, different orders, different names for the same ideas. Write every chapter three times and the copies drift apart; write them once with no map and nobody can find anything.",
    solution:
      "One chapter library, three curriculum maps. Every chapter is written once as an MDX file. Each curriculum — Cambridge, American, IB — keeps its own map of how subjects and levels point at those chapters. The site pre-renders everything at build time: no database, no server, nothing to break.",
    capabilities: [
      {
        icon: "file",
        title: "Single-source chapters",
        text: "Each chapter is one MDX file — prose plus interactive components where they earn their place. Written once, it appears in every curriculum that maps to it. Fix a mistake in one place.",
      },
      {
        icon: "layers",
        title: "Curriculum maps",
        text: "One directory per curriculum — Cambridge, American, IB — each defining its own subject and level structure over the shared chapter library. Curricula change; the chapters don't have to.",
      },
      {
        icon: "package",
        title: "Static export",
        text: "Next.js pre-renders every page at build time. No per-request rendering, no database queries, no backend to keep awake. The files are the site.",
      },
      {
        icon: "zap",
        title: "Nearly-free hosting",
        text: "Static files on a CDN load fast on weak connections and cost next to nothing to serve. For a free learning platform, boring infrastructure is a feature.",
      },
    ],
    whyMatters:
      "It lets one person maintain a library for three curricula without the content rotting. Add a file, rebuild, done — the pipeline turns writing into pages with no ops work in between.",
    decisions: [
      {
        title: "MDX files over a CMS",
        text: "A CMS means logins, a database, and an editor UI to maintain. Files mean git history, plain-text search, and zero moving parts. For a solo author, files win.",
      },
      {
        title: "Static export over server rendering",
        text: "Nothing on the site needs a server at request time. Pre-rendering everything removes an entire category of failures — and cost.",
      },
      {
        title: "Shared chapters, separate maps",
        text: "Duplicating chapters per curriculum guarantees they drift apart. One library with three maps keeps a single source of truth.",
      },
      {
        title: "Build-time over runtime",
        text: "All curriculum assembly happens during the build. The deployed site is dumb files, which is exactly what you want serving students.",
      },
    ],
  },
  {
    slug: "clario-briefing",
    title: "Clario briefing",
    description:
      "A fixed shape for rough questions. Every briefing runs the same skeleton — summary, key points, depth, sources — so a loosely asked question still lands as something scannable you can actually use.",
    problem:
      "People don't ask clean questions. They ask loosely, mid-thought, with half the context missing — and get back a wall of text they won't read. The answer might be right, but if nobody can scan it in ten seconds, it might as well be wrong.",
    solution:
      "A fixed skeleton for every briefing. Summary first — one paragraph that answers directly. Then key points for skimmers, in-depth for those who stay, and sources last so every claim can be checked. Same order every time, no matter the question.",
    capabilities: [
      {
        icon: "align",
        title: "Summary first",
        text: "One paragraph that answers the question directly. If the reader stops after ten seconds, they still leave with the answer.",
      },
      {
        icon: "list",
        title: "Key points",
        text: "The scannable version — the briefing compressed into bullets for people who won't read further.",
      },
      {
        icon: "book",
        title: "In depth",
        text: "The full treatment for readers who stay. Detail lives here, never standing in the way of the summary.",
      },
      {
        icon: "link",
        title: "Sources last",
        text: "Every claim traceable. Sources sit at the end so checking is always one scroll away, never a hunt.",
      },
    ],
    whyMatters:
      "A fixed shape turns reading into a habit. Nobody re-learns the page per question — summary, points, depth, sources — and empty sections stay visible, which is information too.",
    decisions: [
      {
        title: "Fixed skeleton over free-form",
        text: "A new layout per question forces the reader to re-learn the page every time. One skeleton means the shape itself teaches.",
      },
      {
        title: "Answer first, context after",
        text: "Most readers never scroll. Putting the answer in the first paragraph respects that instead of fighting it.",
      },
      {
        title: "Sources always last",
        text: "Claims without sources are rumors. A fixed final section makes checkability a habit, not an afterthought.",
      },
      {
        title: "Visible emptiness",
        text: "If a section has nothing to say, it shows up empty rather than disappearing. What's missing is information too.",
      },
    ],
  },
];

export function getResearchNote(slug: string): ResearchNote | undefined {
  return RESEARCH_NOTES.find((note) => note.slug === slug);
}

export function getResearchSlugs(): string[] {
  return RESEARCH_NOTES.map((note) => note.slug);
}

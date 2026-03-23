export type Category = "blog" | "builds" | "teardowns" | "writings" | "signals";

export type Post = {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  summary: string;
  content: string[];
  category: Category;
};

export const categories: Array<{ key: Category; label: string; href: string }> = [
  { key: "blog", label: "blog", href: "/blog" },
  { key: "builds", label: "builds", href: "/builds" },
  { key: "teardowns", label: "teardowns", href: "/teardowns" },
  { key: "writings", label: "writings", href: "/writings" },
  { key: "signals", label: "signals", href: "/signals" },
];

export const posts: Post[] = [
  {
    slug: "small-systems-over-big-promises",
    title: "small systems over big promises",
    date: "march 2026",
    publishedAt: "2026-03-22",
    summary: "why i keep choosing compact ai workflows that stay understandable after the first week.",
    category: "blog",
    content: [
      "most useful automation work is not dramatic. it is a series of small decisions that remove repeat friction without turning the whole system into a black box.",
      "i care more about whether a workflow is legible than whether it sounds impressive. if i cannot inspect it, change it quickly, and explain it in plain language, it is probably too heavy.",
      "the current goal is simple: build tools that feel calm, survive real usage, and leave enough space for curiosity.",
    ],
  },
  {
    slug: "automation-desk-setup",
    title: "automation desk setup",
    date: "march 2026",
    publishedAt: "2026-03-21",
    summary: "a compact build around notes, prompts, scripts, and the tiny tools that keep the loop moving.",
    category: "builds",
    content: [
      "this build started with a very ordinary problem: too many tabs, too many partial ideas, and too much context switching.",
      "the solution was not more software. it was a tighter desk of reusable parts: one notes surface, one capture flow, one place for prompts, and a small set of scripts for repetitive steps.",
      "the result feels lighter because the build is narrow. every part has a reason to stay.",
    ],
  },
  {
    slug: "what-broke-in-a-weekend-agent-test",
    title: "what broke in a weekend agent test",
    date: "march 2026",
    publishedAt: "2026-03-20",
    summary: "a teardown of a promising workflow that failed once the edge cases and cleanup steps showed up.",
    category: "teardowns",
    content: [
      "the first version looked great in demos and fell apart in real usage.",
      "the weak point was not the model output. it was all the surrounding state: filenames, retries, partial failures, and unclear ownership between steps.",
      "teardowns are useful because they show where confidence was borrowed instead of earned.",
    ],
  },
  {
    slug: "notes-from-building-with-ai",
    title: "notes from building with ai",
    date: "march 2026",
    publishedAt: "2026-03-19",
    summary: "a few patterns i keep returning to while prototyping with language models and automation tools.",
    category: "writings",
    content: [
      "the best results usually come from tighter scopes, clearer prompts, and faster feedback loops rather than bigger stacks.",
      "i like treating ai as a collaborator inside a narrow lane. once the lane is clear, the output gets more reliable and the product feels more intentional.",
      "every experiment leaves behind a reusable fragment: a prompt, a ui pattern, a validation step, or a better instinct for where not to automate.",
    ],
  },
  {
    slug: "three-signals-i-keep-watching",
    title: "three signals i keep watching",
    date: "march 2026",
    publishedAt: "2026-03-18",
    summary: "small movements across tools, interfaces, and workflows that feel worth paying attention to.",
    category: "signals",
    content: [
      "the strongest signals are usually quiet at first: a better default, a more honest interface, a tool that reduces steps instead of adding ceremony.",
      "i watch for products that make automation feel more local, more inspectable, and easier to hand off.",
      "when enough of those signals align, a new pattern starts to feel stable rather than experimental.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: Category) {
  return getSortedPosts().filter((post) => post.category === category);
}

export function getSortedPosts() {
  return [...posts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getRecentPosts(limit = 3) {
  return getSortedPosts().slice(0, limit);
}

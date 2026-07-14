export type Category = "blogs" | "writings" | "research";

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
  { key: "blogs", label: "blogs", href: "/blogs" },
  { key: "writings", label: "writings", href: "/writings" },
  { key: "research", label: "research", href: "/research" },
];

export const posts: Post[] = [
  {
    slug: "small-systems-over-big-promises",
    title: "small systems over big promises",
    date: "march 2026",
    publishedAt: "2026-01-21",
    summary: "why i keep choosing compact ai workflows that stay understandable after the first week.",
    category: "blogs",
    content: [
      "i’ve started noticing something — the most useful automation work is rarely dramatic. it’s not big, shiny systems or complex setups, but a series of small decisions that quietly remove friction.",

      "one step less, one thing automated, one less thing to think about. that’s usually enough. the goal is not to build something impressive, but something that actually gets used.",

      "most systems that look powerful at the beginning tend to break later. they rely on too many moving parts, too much setup, and too much context. they work… until they don’t.",

      "and when they break, fixing them often feels heavier than the problem they were meant to solve. i’ve built things like that — exciting at first, but frustrating to return to.",

      "that’s when i started shifting how i think about building. now i care less about how advanced something looks, and more about whether it stays understandable over time.",

      "if i open a workflow after a week, i should still know what’s happening. i should be able to change one part without breaking everything else, and explain it in simple words.",

      "if i can’t inspect it, change it quickly, or explain it in plain language, it is probably too heavy.",

      "i’ve also realized that most real-world workflows don’t need complexity — they need consistency. a small system that runs every day without friction is more useful than a big system that only works in perfect conditions.",

      "lately, i’ve been building smaller tools around ai workflows — simple automations, lightweight scripts, and systems that stay close to the problem they solve.",

      "they’re not impressive on the surface, but they work. they survive real usage, and they don’t require relearning every time i come back to them.",

      "the shift is simple: from building impressive systems to building reliable ones. from adding more to removing what’s unnecessary. from complexity to clarity.",

      "the current goal is simple: build tools that feel calm, survive real usage, and leave enough space for curiosity.",

      "small systems don’t try to do everything. they do just enough — and that’s why they last."
    ],
  },
  {
    slug: "automation-desk-setup",
    title: "automation desk notes",
    date: "march 2026",
    publishedAt: "2026-02-21",
    summary: "a compact research note around prompts, scripts, and tiny tools that keep the loop moving.",
    category: "research",
    content: [
      "this note started with a very ordinary problem: too many tabs, too many partial ideas, and too much context switching.",
      "the solution was not more software. it was a tighter desk of reusable parts: one notes surface, one capture flow, one place for prompts, and a small set of scripts for repetitive steps.",
      "the result feels lighter because the setup is narrow. every part has a reason to stay.",
    ],
  },
  {
    slug: "what-broke-in-a-weekend-agent-test",
    title: "what broke in a weekend agent test",
    date: "march 2026",
    publishedAt: "2026-03-20",
    summary: "a breakdown of a promising workflow that failed once the edge cases and cleanup steps showed up.",
    category: "research",
    content: [
      "the first version looked great in demos and fell apart in real usage.",
      "the weak point was not the model output. it was all the surrounding state: filenames, retries, partial failures, and unclear ownership between steps.",
      "breakdowns are useful because they show where confidence was borrowed instead of earned.",
    ],
  },
  {
    slug: "notes-from-building-with-ai",
    title: "notes from building with ai",
    date: "march 2026",
    publishedAt: "2026-03-10",
    summary: "a few patterns i keep returning to while prototyping with language models and automation tools.",
    category: "writings",
    content: [
      "the best results usually come from tighter scopes, clearer prompts, and faster feedback loops rather than bigger stacks.",
      "i like treating ai as a collaborator inside a narrow lane. once the lane is clear, the output gets more reliable and the product feels more intentional.",
      "every experiment leaves behind a reusable fragment: a prompt, a ui pattern, a validation step, or a better instinct for where not to automate.",
    ],
  },
  {
    slug: "three-patterns-i-keep-watching",
    title: "three patterns i keep watching",
    date: "march 2026",
    publishedAt: "2026-03-21",
    summary: "small movements across tools, interfaces, and workflows that feel worth paying attention to.",
    category: "research",
    content: [
      "i’ve started paying more attention to small movements — across tools, interfaces, and workflows. not trends in the loud sense, just quiet shifts that feel like they might matter later.",

      "the strongest patterns are usually easy to miss at first. a slightly better default, a cleaner interface, a tool that removes one step instead of adding a new layer.",

      "nothing dramatic — but those small changes tend to stick.",

      "the tools that last don’t try to impress. they simplify. they reduce decisions, remove friction, and stay out of the way.",

      "one thing i keep watching is how automation is changing. it’s becoming more local, more inspectable, and easier to adjust without breaking everything.",

      "systems are getting smaller, more focused, and more honest about what they do. and that changes how you use them — you’re not dependent on them, you can shape them.",

      "another pattern is how interfaces are becoming quieter. less noise, less decoration, more intention.",

      "the best interfaces don’t try to guide everything. they leave space, and that makes them easier to return to.",

      "the third pattern is about handoff. a good system isn’t just usable — it’s explainable.",

      "if a workflow only works in your head, it doesn’t scale. but if it can be explained simply, it can be shared and reused.",

      "when enough of these patterns align — simpler tools, clearer interfaces, more understandable systems — a new direction starts to feel stable instead of experimental.",

      "i don’t try to predict what comes next. i just watch what keeps getting simpler, quieter, and easier to use.",

      "those are usually the things that stay."
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

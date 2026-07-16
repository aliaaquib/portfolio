export type PostSection = {
  title: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "small-systems-over-big-promises",
    title: "small systems over big promises",
    date: "march 2026",
    publishedAt: "2026-01-21",
    summary: "why i keep choosing compact ai workflows that stay understandable after the first week.",
    image: {
      src: "/images/articles/small-systems.svg",
      alt: "a quiet abstract system of small connected cards on a creamy background",
    },
    sections: [
      {
        title: "Where it started",
        paragraphs: [
          "i’ve started noticing something in almost every workflow i build: the useful part is rarely the impressive part. the useful part is usually a small decision that removes one repeated action, one unclear handoff, or one moment where i would otherwise stop and think too much.",
          "for a long time, i thought better systems meant bigger systems. more integrations, more dashboards, more automatic steps. that kind of work feels exciting at the start because it gives the illusion that everything is being handled. but after a week, the same systems often become heavy. one broken connection, one unclear file name, one changed assumption, and the whole thing starts asking for attention.",
          "the better pattern has been quieter. one capture point. one repeatable prompt. one script that does a narrow job. one place where the output lands. it does not look like much, but it keeps working when the day gets messy.",
        ],
      },
      {
        title: "The exciting part",
        paragraphs: [
          "small systems are easier to trust because they are easier to inspect. if something fails, i can usually see where it failed. i do not have to remember a diagram, trace five tools, or open a dashboard that only made sense on the day i created it.",
          "this matters even more with ai workflows. language models are flexible, but that flexibility can hide weak structure. if the surrounding system is vague, the model has to guess too much. if the surrounding system is small and clear, the model has a better lane to run in.",
          "a small system might be as simple as a saved prompt, a naming convention, and a review step. it might be a tiny script that turns messy notes into a draft outline. it might be a checklist that tells an agent exactly what to change and what to leave alone. none of this is glamorous. that is the point.",
          "the real win is not automation for its own sake. the win is returning to the same workflow tomorrow and still understanding it. calm tools create momentum because they do not ask you to re-learn them every time you come back.",
        ],
      },
      {
        title: "What lasts",
        paragraphs: [
          "the systems that last in my life have a few things in common. they are narrow, visible, and easy to change. they do not try to become the center of everything. they sit close to the work and disappear when they are not needed.",
          "i like when a workflow can be explained in one sentence. capture the raw idea here, run this prompt, review the result, publish or archive it. if i need a long explanation, the system is probably carrying too much hidden complexity.",
          "small systems also leave more room for taste. when the machine handles a narrow repetitive part, i can spend more attention on judgment: what should stay, what should be cut, what actually feels useful, what sounds like me.",
          "that is why i keep choosing compact tools over big promises. not because big systems are always wrong, but because small ones teach you what the work really needs. they make the shape of the problem visible before you build too much around it.",
          "the current goal is simple: build tools that feel calm, survive real usage, and leave enough space for curiosity. small systems do not try to do everything. they do just enough — and that is why they last.",
        ],
      },
    ],
  },
  {
    slug: "automation-desk-setup",
    title: "automation desk notes",
    date: "march 2026",
    publishedAt: "2026-02-21",
    summary: "a compact research note around prompts, scripts, and tiny tools that keep the loop moving.",
    image: {
      src: "/images/articles/automation-desk.svg",
      alt: "a minimal desk-like grid of notes, prompts, and small automation paths",
    },
    sections: [
      {
        title: "Where it started",
        paragraphs: [
          "this note started with a very ordinary problem: too many tabs, too many partial ideas, and too much context switching. i was not losing time because the work was impossible. i was losing time because the desk around the work kept becoming noisy.",
          "every idea had a different home. prompts lived in chat histories. notes lived in drafts. links lived in browser tabs. little scripts lived wherever i last touched them. nothing was broken exactly, but everything required a small search before the real work could begin.",
          "so i started thinking about the automation desk as a physical desk. what needs to be within reach? what can be stored away? what should have one fixed place so i never have to negotiate with myself before starting?",
        ],
      },
      {
        title: "The exciting part",
        paragraphs: [
          "the setup that worked was not more software. it was a tighter arrangement of reusable parts: one notes surface, one capture flow, one prompt library, and a small set of scripts for repetitive steps. the goal was not to automate everything. the goal was to make starting easier.",
          "the capture flow matters the most. if an idea arrives while i am teaching, reading, or walking through something else, it needs a low-friction place to land. not a perfect place, just a reliable one. later, the same place becomes the queue for sorting, drafting, or deleting.",
          "the prompt library is intentionally small. i do not want hundreds of prompts. i want a few that i understand well: one for turning rough notes into structure, one for checking clarity, one for extracting next actions, and one for pressure-testing an idea before i spend too much time on it.",
          "scripts sit at the edge of the desk. they are useful when a task becomes repeatable enough to deserve its own button, but not important enough to become a product. rename files, clean text, format drafts, collect links, prepare a small brief. tiny things, handled consistently.",
        ],
      },
      {
        title: "What lasts",
        paragraphs: [
          "the desk works because it stays narrow. every part has a reason to stay, and anything that stops earning its place gets removed. that sounds strict, but it makes the system feel lighter.",
          "i have learned not to optimize too early. a messy workflow should be observed before it is automated. otherwise, i end up preserving a bad habit inside a cleaner wrapper.",
          "the best automation desk does not feel futuristic. it feels like returning to a table where the important things are already laid out. notes here. prompts there. scripts close by. a clear next step waiting without drama.",
          "that is enough for most days. not a command center, not a productivity fantasy, just a small desk that helps the loop keep moving.",
        ],
      },
    ],
  },
  {
    slug: "what-broke-in-a-weekend-agent-test",
    title: "what broke in a weekend agent test",
    date: "march 2026",
    publishedAt: "2026-03-20",
    summary: "a breakdown of a promising workflow that failed once the edge cases and cleanup steps showed up.",
    image: {
      src: "/images/articles/weekend-agent-test.svg",
      alt: "an abstract agent workflow with one broken connection highlighted in red",
    },
    sections: [
      {
        title: "Where it started",
        paragraphs: [
          "the first version looked great in a demo. the agent took a rough brief, searched through a small folder of notes, drafted an output, and placed it in the right place. watching it run felt like seeing a tiny assistant finally understand the rhythm of the desk.",
          "for a few hours, it worked well enough to be dangerous. that is the tricky stage with agent workflows. they can produce one beautiful run before the system underneath them is actually ready.",
          "by sunday evening, the weak points started showing up. not in the model’s writing, but in the boring parts around it: filenames, retries, partial outputs, stale context, and unclear ownership between steps.",
        ],
      },
      {
        title: "The exciting part",
        paragraphs: [
          "the biggest failure was state. the agent knew what it had done inside a single run, but the system around it did not have a clean memory of what counted as finished. a draft could be created twice. a source could be skipped silently. a failed step could look like a completed step because a file existed with the right name.",
          "the second failure was cleanup. demos rarely show cleanup because cleanup is not cinematic. but real workflows depend on it. temporary files need to be removed, half-written outputs need labels, and anything waiting for human review needs to be impossible to confuse with something already approved.",
          "the third failure was handoff. i had given the agent a job, but not a clear contract. what should it ask before changing? what should it never touch? what should it summarize when it finishes? the missing answers created tiny moments of uncertainty that added up.",
          "none of these failures were dramatic. that made them more useful. the system did not explode. it just became harder to trust, and trust is the whole point.",
        ],
      },
      {
        title: "What lasts",
        paragraphs: [
          "the fix was not to make the agent smarter. the fix was to make the workflow more honest. every step needed an explicit input, output, and review state. every generated file needed a clear status. every retry needed to explain what changed.",
          "i also learned to separate creative work from operational work. let the agent draft, compare, summarize, or suggest. but let the surrounding system decide where files go, what counts as complete, and when a human should step in.",
          "a good agent workflow should be boring around the edges. boring names. boring folders. boring status labels. the creativity can live inside the work, but the container needs to be predictable.",
          "the weekend test failed in the way useful experiments fail. it showed where confidence was borrowed instead of earned. it made the next version smaller, clearer, and easier to inspect.",
        ],
      },
    ],
  },
  {
    slug: "notes-from-building-with-ai",
    title: "notes from building with ai",
    date: "march 2026",
    publishedAt: "2026-03-10",
    summary: "a few patterns i keep returning to while prototyping with language models and automation tools.",
    image: {
      src: "/images/articles/building-with-ai.svg",
      alt: "layered abstract interface cards suggesting ai-assisted building",
    },
    sections: [
      {
        title: "Where it started",
        paragraphs: [
          "building with ai feels different from building with normal tools because the material talks back. that sounds obvious, but it changes the rhythm of the work. instead of only arranging components, you are also negotiating with a collaborator that can surprise you, misunderstand you, and occasionally reveal a better path.",
          "the first temptation is to ask for too much. build the whole thing, design the whole flow, solve the whole problem. sometimes that works for a moment, but the useful pattern is usually smaller: define a narrow lane and keep the feedback loop close.",
          "the best results have come when i treat ai less like a magic layer and more like a sharp tool on the desk. it is useful when the task has edges. it gets vague when the task has no shape.",
        ],
      },
      {
        title: "The exciting part",
        paragraphs: [
          "scope is the first design decision. if i can describe the task in one clean sentence, the output usually improves. if i need five paragraphs to explain what i mean, i probably need to break the work apart before asking for help.",
          "feedback speed matters too. ai makes it easy to generate, but generation is not progress by itself. progress comes from seeing the result, noticing what is wrong, and tightening the next instruction. the loop has to stay short enough that judgment remains active.",
          "i keep returning to the idea of reusable fragments. every experiment should leave something behind: a prompt, a component, a naming pattern, a checklist, a test, or a better instinct for what not to automate.",
          "the nicest moments happen when the tool helps me move through hesitation. a rough idea becomes an outline. an outline becomes a draft. a draft becomes something i can argue with. the machine does not remove taste; it gives taste something to respond to sooner.",
        ],
      },
      {
        title: "What lasts",
        paragraphs: [
          "the strongest ai workflows are not the ones where the model does everything. they are the ones where the model does the right narrow thing at the right time.",
          "i still want human judgment close to the surface. i want to read the output, change the shape, remove the generic parts, and decide what deserves to stay. otherwise the work begins to sound smooth but empty.",
          "building with ai has made me more interested in clarity. clear inputs, clear constraints, clear review points. the technology is strange, but the craft around it is familiar: name things well, keep the loop visible, and do not hide uncertainty under polish.",
          "that is the pattern i trust most right now. not bigger stacks, not louder promises, just tighter scopes, faster feedback, and tools that make the next honest step easier to take.",
        ],
      },
    ],
  },
  {
    slug: "three-patterns-i-keep-watching",
    title: "three patterns i keep watching",
    date: "march 2026",
    publishedAt: "2026-03-21",
    summary: "small movements across tools, interfaces, and workflows that feel worth paying attention to.",
    image: {
      src: "/images/articles/three-patterns.svg",
      alt: "three subtle visual patterns moving across a calm abstract interface",
    },
    sections: [
      {
        title: "Where it started",
        paragraphs: [
          "i’ve started paying more attention to small movements across tools, interfaces, and workflows. not trends in the loud sense. not the kind that arrive with a headline and disappear by the next week. quieter movements. the ones that show up as a slightly better default or one less step in a familiar task.",
          "the strongest patterns are usually easy to miss at first because they do not announce themselves. a tool becomes simpler. an interface removes a decision. a workflow becomes easier to explain. nothing dramatic happens, but the work starts feeling less heavy.",
          "those are the changes i keep watching because they tend to last. not always, but often enough to be worth noticing.",
        ],
      },
      {
        title: "The exciting part",
        paragraphs: [
          "the first pattern is smaller automation. not giant invisible systems, but local tools that do one thing near the work. they are easier to inspect, easier to adjust, and easier to stop using when the situation changes.",
          "this feels important because people do not only need more power. they need power they can understand. a workflow that can be shaped by the person using it is more durable than one that demands blind trust.",
          "the second pattern is quieter interfaces. less decoration, fewer competing signals, more room to think. the best interfaces are starting to feel less like control panels and more like calm surfaces. they guide without constantly announcing that they are guiding.",
          "the third pattern is explainable handoff. a good system is not just usable while you are inside it. it can also be passed to someone else, or to your future self, without requiring a private tour through your brain.",
        ],
      },
      {
        title: "What lasts",
        paragraphs: [
          "when those patterns meet — smaller tools, quieter interfaces, clearer handoffs — the work starts to feel different. less like managing software and more like arranging a room where the right things are within reach.",
          "i do not try to predict what comes next with too much confidence. prediction gets theatrical quickly. instead, i watch what keeps getting simpler, quieter, and easier to use after the excitement fades.",
          "the things that last usually reduce friction without asking for attention in return. they make the work feel more understandable. they help people keep their taste, their judgment, and their agency close.",
          "that is the thread i keep following. not the loudest tools, but the ones that make good work feel a little more possible.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getSortedPosts() {
  return [...posts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getRecentPosts(limit = 3) {
  return getSortedPosts().slice(0, limit);
}

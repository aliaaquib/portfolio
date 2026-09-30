export type LinkedInPost = {
  date: string;
  headline: string;
  excerpt: string;
  url: string;
};

/**
 * Latest original LinkedIn posts, newest first.
 * Rewritten by the timeline updater (cron "linkedin-timeline-updater");
 * do not edit by hand — it will be overwritten.
 */
export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    date: "30 Sep 2026",
    headline:
      "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
    excerpt:
      "OpenAI launched something yesterday called Dots, and I can't stop thinking about what I'd do with one.\n\nPlain version: it's an AI helper that doesn't wait for you to ask. You give it a job \u2014 \u201ckeep working on that\u201d, \u201cwatch this for me\u201d \u2014 and it keeps going in the background on its own little computer.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7510895261205016576/",
  },
  {
    date: "28 Sep 2026",
    headline:
      "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
    excerpt:
      "Recursion broke my brain when I first learned it. Not the idea itself. The idea is stupidly simple. A function that calls itself. Done.\n\nWhat broke me was every tutorial explaining it like I already got it.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7509883564625395712/",
  },
  {
    date: "25 Sep 2026",
    headline:
      "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
    excerpt:
      "My students asked me how AI actually works in class today. No hype, no jargon \u2014 here's the 5-minute version I gave them.\n\nYou know how your phone's keyboard guesses your next word? AI is basically that.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7508741825415761920/",
  },
];

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
    date: "5 Oct 2026",
    headline:
      "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
    excerpt:
      "Teachers’ Day always makes me think back to the people who actually changed the trajectory of my life.\n\nWe usually credit our success to hard work, opportunities, or right-place-right-time luck. But if you trace almost any skill, habit, or confident decision back to its root, there’s usually a teacher or mentor standing there.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7512824131122352128/",
  },
  {
    date: "30 Sep 2026",
    headline:
      "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
    excerpt:
      "OpenAI launched something yesterday called Dots, and I can't stop thinking about what I'd do with one.\n\nPlain version: it's an AI helper that doesn't wait for you to ask. You give it a job \"keep working on that\", \"watch this for me\" and it keeps going in the background on its own little computer, even after you close the chat. You can talk to it on Slack or Teams too.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7510895261205016576/",
  },
  {
    date: "27 Sep 2026",
    headline:
      "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
    excerpt:
      "Recursion broke my brain when I first learned it.\n\nNot the idea itself. The idea is stupidly simple. A function that calls itself. Done.\n\nWhat broke me was every tutorial explaining it like I already got it. Five paragraphs of setup before saying the one sentence that matters.\nSo when I teach it now, I skip all that. I just say, stand between two mirrors.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7509883564625395712/",
  },
  {
    date: "24 Sep 2026",
    headline:
      "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
    excerpt:
      "My students asked me how AI actually works in class today. No hype, no jargon — here's the 5-minute version I gave them.\n\nYou know how your phone's keyboard guesses your next word? AI is basically that.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7508741825415761920/",
  },
];

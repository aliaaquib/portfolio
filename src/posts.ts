// Blog posts from src/content/blog/*.md, bundled at build time. Shared by the Blog page and Home's "Latest writing".

export type Post = {
  slug: string;
  title: string;
  subheading: string;
  category: string[];
  date: string;
  thumbnail: string;
  content: string;
};

function parseFrontMatter(raw: string) {
  const match = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, content: raw };
  const [, head, body] = match;
  const data: Record<string, string> = {};
  head.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    data[key] = value;
  });
  return { data, content: body.trim() };
}

const files = import.meta.glob("./content/blog/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontMatter(raw);
    return {
      slug: data.slug || (path.split("/").pop() ?? path).replace(/\.md$/, ""),
      title: data.title || "Untitled",
      subheading: data.subheading || "",
      category: data.category ? data.category.split(",").map((c) => c.trim()) : [],
      date: data.date || "",
      thumbnail: data.thumbnail || "",
      content,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

import fs from "node:fs";
import path from "node:path";
import type { PortableTextBlock } from "@portabletext/types";
import type { Article } from "./posts";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

type Frontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

let keyCounter = 0;
const nextKey = (prefix: string) => `${prefix}${keyCounter++}`;

function inlineSpans(text: string) {
  const children: Array<Record<string, unknown>> = [];
  const parts = text.split(/(`[^`]+`)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      children.push({
        _type: "span",
        _key: nextKey("s"),
        text: part.slice(1, -1),
        marks: ["code"],
      });
    } else {
      children.push({ _type: "span", _key: nextKey("s"), text: part });
    }
  }
  return children;
}

function textBlock(style: string, text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey("b"),
    style,
    children: inlineSpans(text),
  } as unknown as PortableTextBlock;
}

function listItemBlock(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey("b"),
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: inlineSpans(text),
  } as unknown as PortableTextBlock;
}

/** Minimal markdown → PortableText: ## / ### headings, - bullets, > quotes, paragraphs, `code`. */
export function markdownToBlocks(markdown: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const lines = markdown.split("\n");
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      const text = paragraph.join(" ").trim();
      if (text) blocks.push(textBlock("normal", text));
      paragraph = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }
    if (/^---+$/.test(line)) {
      // thematic break: ends the article body (e.g. before an author bio,
      // which the article template renders itself)
      flushParagraph();
      break;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push(textBlock("h2", line.slice(3).trim()));
    } else if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push(textBlock("h3", line.slice(4).trim()));
    } else if (line.startsWith("- ")) {
      flushParagraph();
      blocks.push(listItemBlock(line.slice(2).trim()));
    } else if (line.startsWith("> ")) {
      flushParagraph();
      blocks.push(textBlock("blockquote", line.slice(2).trim()));
    } else {
      paragraph.push(line);
    }
  }
  flushParagraph();
  return blocks;
}

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Article is missing frontmatter");
  const frontmatter = {} as Record<string, string>;
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  const tags = (frontmatter.tags || "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    frontmatter: {
      title: frontmatter.title || "",
      slug: frontmatter.slug || "",
      date: frontmatter.date || "",
      excerpt: frontmatter.excerpt || "",
      category: frontmatter.category,
      tags,
      seoTitle: frontmatter.seoTitle,
      seoDescription: frontmatter.seoDescription,
    },
    body: match[2].trim(),
  };
}

let cache: Article[] | null = null;

/** Raw local articles (newest first). Server-only: reads markdown files from content/articles. */
export function readLocalArticles(): Article[] {
  if (!cache) cache = readLocalArticleFiles();
  return cache;
}

function readLocalArticleFiles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const { frontmatter, body } = parseFrontmatter(raw);
      const article: Article = {
        _id: `local-${frontmatter.slug}`,
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt,
        publishedDate: frontmatter.date,
        category: frontmatter.category,
        tags: frontmatter.tags,
        seoTitle: frontmatter.seoTitle,
        seoDescription: frontmatter.seoDescription,
        body: markdownToBlocks(body),
      };
      return article;
    })
    .sort((a, b) => (b.publishedDate || "").localeCompare(a.publishedDate || ""));
}

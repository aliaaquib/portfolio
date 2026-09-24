import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/sanity/lib/live";
import { hasSanityProject } from "@/sanity/lib/env";
import { readLocalArticles } from "./local-articles";
import {
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_LIST_QUERY,
  ARTICLE_SLUGS_QUERY,
} from "@/sanity/lib/queries";

export type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
  caption?: string;
};

export type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImage;
  publishedDate?: string;
  readingTime?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  body?: PortableTextBlock[];
};

export type Post = Article & {
  date: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
  sections: Array<{
    title: string;
    body?: PortableTextBlock[];
    paragraphs: string[];
  }>;
  seo?: {
    title?: string;
    description?: string;
  };
};

function splitBodyIntoSections(body?: PortableTextBlock[]) {
  if (!body?.length) {
    return [
      {
        title: "Overview",
        body,
        paragraphs: [],
      },
    ];
  }

  const sections: Post["sections"] = [];
  let currentTitle = "Overview";
  let currentBlocks: PortableTextBlock[] = [];

  for (const block of body) {
    if ("style" in block && block.style === "h2") {
      if (currentBlocks.length > 0 || sections.length === 0) {
        sections.push({
          title: currentTitle,
          body: currentBlocks,
          paragraphs: [],
        });
      }

      currentTitle =
        "children" in block
          ? (block.children || [])
              .map((child) => ("text" in child ? child.text : ""))
              .join("")
              .trim() || "Section"
          : "Section";
      currentBlocks = [];
      continue;
    }

    currentBlocks.push(block);
  }

  sections.push({
    title: currentTitle,
    body: currentBlocks,
    paragraphs: [],
  });

  return sections.filter((section) => section.body?.length || section.title);
}

export function formatArticleDate(date?: string) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${date}T00:00:00.000Z`))
    .toLowerCase();
}

export function getReadingTime(article: Pick<Article, "readingTime" | "body">) {
  if (article.readingTime) {
    return article.readingTime;
  }

  const text = (article.body || [])
    .flatMap((block) => ("children" in block ? block.children || [] : []))
    .map((child) => ("text" in child ? child.text : ""))
    .join(" ");
  const minutes = Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 180));

  return `${minutes} min read`;
}

export function normalizeArticle(article: Article): Post {
  return {
    ...article,
    date: formatArticleDate(article.publishedDate),
    summary: article.excerpt,
    image: {
      src: article.coverImage?.asset?.url || "/images/articles/three-patterns.svg",
      alt: article.coverImage?.alt || article.title,
    },
    sections: splitBodyIntoSections(article.body),
    seo: {
      title: article.seoTitle,
      description: article.seoDescription,
    },
  };
}

async function fetchRawArticles(query: string, params?: Record<string, string | number>) {
  if (!hasSanityProject) {
    return [] as Article[];
  }

  try {
    const { data } = await sanityFetch({
      query,
      params,
      tags: ["article"],
      stega: false,
    });

    return Array.isArray(data) ? (data as Article[]) : [];
  } catch (error) {
    console.warn("Sanity article fetch failed:", error);
    return [] as Article[];
  }
}

/** All articles: local markdown files are always included, plus Sanity ones
 *  when configured (local wins on slug conflicts). Newest first. */
async function getAllArticles(): Promise<Article[]> {
  const local = readLocalArticles();
  const remote = await fetchRawArticles(ARTICLE_LIST_QUERY);
  const localSlugs = new Set(local.map((a) => a.slug));
  return [...local, ...remote.filter((a) => !localSlugs.has(a.slug))].sort((a, b) =>
    (b.publishedDate || "").localeCompare(a.publishedDate || "")
  );
}

export async function getSortedPosts() {
  return (await getAllArticles()).map(normalizeArticle);
}

export async function getRecentPosts(limit = 3) {
  return (await getAllArticles()).slice(0, limit).map(normalizeArticle);
}

export async function getPostBySlug(slug: string) {
  const local = readLocalArticles().find((a) => a.slug === slug);
  if (local) return normalizeArticle(local);

  if (!hasSanityProject) {
    return null;
  }

  try {
    const { data } = await sanityFetch({
      query: ARTICLE_BY_SLUG_QUERY,
      params: { slug },
      tags: ["article", `article:${slug}`],
    });

    return data ? normalizeArticle(data as Article) : null;
  } catch (error) {
    console.warn(`Sanity article fetch failed for ${slug}:`, error);
    return null;
  }
}

export async function getPostSlugs() {
  const slugs = (await getAllArticles()).map((a) => ({ slug: a.slug }));

  if (!hasSanityProject) {
    return slugs;
  }

  try {
    const { data } = await sanityFetch({
      query: ARTICLE_SLUGS_QUERY,
      perspective: "published",
      stega: false,
      tags: ["article"],
    });

    const remoteSlugs = Array.isArray(data) ? (data as Array<{ slug: string }>) : [];
    const seen = new Set(slugs.map((s) => s.slug));
    for (const s of remoteSlugs) {
      if (!seen.has(s.slug)) {
        slugs.push(s);
        seen.add(s.slug);
      }
    }
    return slugs;
  } catch (error) {
    console.warn("Sanity article slug fetch failed:", error);
    return slugs;
  }
}

import type { PortableTextBlock } from "@portabletext/types";
import { hasSanityProject } from "@/sanity/lib/env";
import { sanityFetch } from "@/sanity/lib/live";
import {
  FEATURED_WORK_QUERY,
  WORK_BY_SLUG_QUERY,
  WORK_LIST_QUERY,
  WORK_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityImage } from "@/lib/posts";

export type Work = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: PortableTextBlock[];
  thumbnail?: SanityImage;
  gallery?: SanityImage[];
  technologies?: string[];
  github?: string;
  liveDemo?: string;
  featured?: boolean;
  completionDate?: string;
  status?: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  projectUrl?: string;
  projectUrlLabel?: string;
  role: string;
  year: string;
  type: string;
  status: string;
  order: number;
  cardKind: "clario" | "research" | "default";
  image: {
    src: string;
    alt: string;
  };
  thumbnail?: SanityImage;
  gallery?: SanityImage[];
  fullDescription?: PortableTextBlock[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
  sections: Array<{
    title: string;
    body?: PortableTextBlock[];
    paragraphs: string[];
    image?: {
      src: string;
      alt: string;
    };
  }>;
  seo?: {
    title?: string;
    description?: string;
  };
};

function getYear(date?: string) {
  if (!date) {
    return "Now";
  }

  return new Date(`${date}T00:00:00.000Z`).getUTCFullYear().toString();
}

export function normalizeWork(work: Work, index = 0): Project {
  const technologies = work.technologies || [];
  const projectUrl = work.liveDemo || work.github;
  const cardKind = work.status?.toLowerCase().includes("research") ? "research" : "default";
  const gallerySections =
    work.gallery
      ?.filter((image) => image.asset?.url)
      .map((image, galleryIndex) => ({
        title: galleryIndex === 0 ? "Gallery" : `Gallery ${galleryIndex + 1}`,
        paragraphs: [],
        image: {
          src: image.asset?.url || "",
          alt: image.alt || work.title,
        },
      })) || [];

  return {
    slug: work.slug,
    title: work.title,
    eyebrow: work.status || "Work",
    summary: work.shortDescription,
    description: work.shortDescription,
    projectUrl,
    projectUrlLabel: work.liveDemo ? "View site" : "View code",
    role: technologies[0] || "Build",
    year: getYear(work.completionDate),
    type: technologies.slice(0, 2).join(" + ") || "Project",
    status: work.status || "Live",
    order: index,
    cardKind,
    image: {
      src: work.thumbnail?.asset?.url || "/images/work/clario-hero.svg",
      alt: work.thumbnail?.alt || work.title,
    },
    thumbnail: work.thumbnail,
    gallery: work.gallery,
    fullDescription: work.fullDescription,
    technologies,
    github: work.github,
    liveDemo: work.liveDemo,
    sections: [
      {
        title: "Overview",
        body: work.fullDescription,
        paragraphs: [],
      },
      ...gallerySections,
    ],
    seo: {
      title: work.title,
      description: work.shortDescription,
    },
  };
}

async function fetchWork(query: string, params?: Record<string, string | number>) {
  if (!hasSanityProject) {
    return [];
  }

  try {
    const { data } = await sanityFetch({
      query,
      params,
      tags: ["work"],
      stega: false,
    });

    return Array.isArray(data) ? (data as Work[]).map(normalizeWork) : [];
  } catch (error) {
    console.warn("Sanity work fetch failed:", error);
    return [];
  }
}

export async function getSortedProjects() {
  return fetchWork(WORK_LIST_QUERY);
}

export async function getFeaturedProjects(limit = 3) {
  const featured = await fetchWork(FEATURED_WORK_QUERY, { limit });

  if (featured.length > 0) {
    return featured;
  }

  return getSortedProjects();
}

export async function getProjectBySlug(slug: string) {
  if (!hasSanityProject) {
    return null;
  }

  try {
    const { data } = await sanityFetch({
      query: WORK_BY_SLUG_QUERY,
      params: { slug },
      tags: ["work", `work:${slug}`],
    });

    return data ? normalizeWork(data as Work) : null;
  } catch (error) {
    console.warn(`Sanity work fetch failed for ${slug}:`, error);
    return null;
  }
}

export async function getProjectSlugs() {
  if (!hasSanityProject) {
    return [];
  }

  try {
    const { data } = await sanityFetch({
      query: WORK_SLUGS_QUERY,
      perspective: "published",
      stega: false,
      tags: ["work"],
    });

    return Array.isArray(data) ? (data as Array<{ slug: string }>) : [];
  } catch (error) {
    console.warn("Sanity work slug fetch failed:", error);
    return [];
  }
}

import type { MetadataRoute } from "next";
import { categories, posts } from "@/lib/posts";

const siteUrl = "https://aaquibali.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/feed", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}${category.href}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}

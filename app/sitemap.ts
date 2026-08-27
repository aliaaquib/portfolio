import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/posts";
import { getProjectSlugs } from "@/lib/projects";

const siteUrl = "https://aaquibali.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleSlugs, projectSlugs] = await Promise.all([getPostSlugs(), getProjectSlugs()]);
  const staticRoutes = ["", "/contact", "/articles"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = articleSlugs.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projectSlugs.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}

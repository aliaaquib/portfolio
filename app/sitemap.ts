import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/posts";

const siteUrl = "https://aaquibali.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleSlugs = await getPostSlugs();
  const staticRoutes = ["", "/contact", "/articles", "/work", "/labs", "/about"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const postRoutes = articleSlugs.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}

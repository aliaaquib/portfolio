import Parser from "rss-parser";
import fs from "fs";
import path from "path";
import type { Blog } from "@/types";

// Use environment variable for RSS feed URL
const MEDIUM_RSS_FEED = process.env.NEXT_PUBLIC_MEDIUM_RSS_URL || "https://medium.com/feed/@theweeklyroundup";
const parser = new Parser();

// Read blogs.json
const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");
const blogsData = JSON.parse(fs.readFileSync(blogsFilePath, "utf8"));

function createShortDescription(html: string, maxLength = 15): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "..." : text;
}

export async function fetchMediumBlogs(): Promise<Blog[]> {
  try {
    const feed = await parser.parseURL(MEDIUM_RSS_FEED);

    // Fetch blog posts along with your custom descriptions
    return feed.items.slice(0, 5).map((item, index) => {
      const content =
        item.content ||
        (item as any)["content:encoded"] ||
        item.contentSnippet ||
        "";

      const customBlog = blogsData.find((blog: Blog) => blog.title === item.title);

      return {
        id: String(index),
        title: item.title ?? "Untitled",
        description: customBlog ? customBlog.description : createShortDescription(content),
        url: item.link ?? "#",
      };
    });
  } catch (error) {
    console.error("Failed to fetch Medium feed:", error);
    return [];
  }
}

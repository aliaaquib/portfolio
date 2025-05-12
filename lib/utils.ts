import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import rawProjects from "@/data/projects.json";
import rawBlogs from "@/data/blogs.json";
import type { Project, Blog } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProjects(): Project[] {
  return rawProjects.map(project => ({
    ...project,
    id: String(project.id),
  }));
}

export function getBlogs(): Blog[] {
  return rawBlogs.map(blog => ({
    ...blog,
    id: String(blog.id),
  }));
}

// lib/poetry.ts

import fs from "fs/promises"; // Use the async version of fs
import path from "path";
import { Poetry } from "@/types"; // Make sure you have the Poetry type defined somewhere in your project

const poetriesFilePath = path.join(process.cwd(), "data", "poetries.json");

// Asynchronously fetch the list of poetries
export async function getPoetries(): Promise<Poetry[]> {
  try {
    const poetriesData = await fs.readFile(poetriesFilePath, "utf8");
    return JSON.parse(poetriesData);
  } catch (error) {
    console.error("Failed to fetch poetries:", error);
    return [];
  }
}

// Asynchronously fetch poetry by its ID
export async function getPoetryById(id: string): Promise<Poetry | null> {
  try {
    const poetries = await getPoetries();
    return poetries.find(p => p.id === id) || null;
  } catch (e) {
    console.error("Error in getPoetryById", e);
    return null;
  }
}

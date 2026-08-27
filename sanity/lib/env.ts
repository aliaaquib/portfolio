export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-24";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aaquibali.com";
export const readToken = process.env.SANITY_API_READ_TOKEN;

export const hasSanityProject = Boolean(projectId);
    
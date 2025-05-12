import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "aaquib",
  description:
    "aaquib's portfolio",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/imaaquibali",
    github: "https://github.com/aliaaquib",
    linkedin: "https://linkedin.com/in/imaaquibali",
  },
  mailSupport: "imaaquibali@gmail.com",
};

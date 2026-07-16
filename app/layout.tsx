import type { Metadata } from "next";
import { FloatingAskAIControl } from "@/components/ask-ai";
import "./globals.css";

const siteUrl = "https://aaquibali.com";
const siteName = "Aaquib Ali";
const siteDescription =
  "Aaquib Ali writes about AI, automation, research notes, teaching, and thoughtful internet systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Aaquib Ali",
    "aaquibali",
    "AI automation",
    "AI research",
    "portfolio",
    "teaching",
    "writing",
    "research notes",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
    creator: "@imaaquibali",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/aliaaquib",
    "https://twitter.com/imaaquibali",
    "https://github.com/aliaaquib",
    "https://instagram.com/alispeaksss",
  ],
  jobTitle: "Teacher, writer, and AI automation builder",
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <FloatingAskAIControl />
      </body>
    </html>
  );
}

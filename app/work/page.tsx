import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WorkTabs } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work from Aaquib Ali — Thread Academy and Clario.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <div className="pb-4 pt-10 sm:pt-14">
          <WorkTabs />
        </div>

        <div className="pb-20 pt-16">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Mascot } from "@/components/mascot";
import { LabsActions } from "@/components/labs-actions";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Labs, tools I designed and built",
  description: "Small tools, personal projects and experiments by Aaquib Ali.",
  alternates: { canonical: "/labs" },
};

function StatusPill({ status }: { status: "Live" | "WIP" | "Sunset" }) {
  const styles =
    status === "Live"
      ? "border-green-700/50 text-green-800"
      : status === "WIP"
        ? "border-[#b89b5e]/60 bg-[#f5eeda] text-[#7a5f22]"
        : "border-strong/20 bg-strong/[0.06] text-muted";
  return (
    <span className={`inline-flex -translate-y-0.5 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function LabsFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-strong/10 py-10 text-[15px]">
      <span className="font-medium text-strong">Explore Labs</span>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-2 text-strong">
        <a href="mailto:imaaquibali@gmail.com" className="underline decoration-strong/30 underline-offset-4 transition hover:text-brandred hover:decoration-brandred">
          imaaquibali@gmail.com
        </a>
        <span aria-hidden="true" className="text-muted">·</span>
        <a href="https://www.linkedin.com/in/aliaaquib" target="_blank" rel="noreferrer" className="underline decoration-strong/30 underline-offset-4 transition hover:text-brandred hover:decoration-brandred">
          LinkedIn
        </a>
        <span aria-hidden="true" className="text-muted">·</span>
        <a href="https://github.com/aliaaquib" target="_blank" rel="noreferrer" className="underline decoration-strong/30 underline-offset-4 transition hover:text-brandred hover:decoration-brandred">
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />
      <div className="mx-auto w-full max-w-2xl px-5 pb-24 sm:px-6">
        <header className="animate-fade-in pb-10 pt-14 text-center sm:pt-20">
          <h1 className="font-display text-6xl text-strong/15 sm:text-7xl">Labs</h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted">
            Small tools, personal projects and experiments. Things I build to solve a
            problem or follow a curiosity.
          </p>
        </header>

        <div className="divide-y divide-strong/10 border-y border-strong/10">
          <Reveal as="section" className="py-10">
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-semibold text-strong">Ask AI</h2>
              <StatusPill status="Live" />
            </div>
            <p className="mt-3 font-display text-[26px] leading-snug text-strong">
              A <mark className="highlight">resident expert</mark> on everything I do.
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-text/90">
              Every page carries a small assistant that answers from this site&apos;s
              context. No account, no chat history — just answers.
            </p>
            <LabsActions />
          </Reveal>

          <Reveal as="section" className="py-10">
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-semibold text-strong">Mascot</h2>
              <StatusPill status="Live" />
            </div>
            <p className="mt-3 font-display text-[26px] leading-snug text-strong">
              A tiny me that <mark className="highlight">follows your cursor</mark>.
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-text/90">
              A sprite-sheet companion built for this site. Move your cursor around —
              he watches. Click him and he reacts.
            </p>
            <div className="mt-6 flex justify-start">
              <Mascot
                directions="/mascots/aaquib-directions.webp"
                reactions="/mascots/aaquib-reactions.webp"
                size={110}
                label="Mini Aaquib, following your cursor"
                className="overflow-hidden rounded-2xl border border-strong/15 bg-bg shadow-[0_2px_12px_rgba(17,17,17,0.08)]"
              />
            </div>
          </Reveal>
        </div>

        <LabsFooter />
      </div>
    </main>
  );
}

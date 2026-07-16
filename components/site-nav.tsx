import Link from "next/link";
import { AskAIControl } from "@/components/ask-ai";

const navItems = [
  { label: "Work", href: "/" },
  { label: "About", href: "/" },
  { label: "Writing", href: "/writings" },
];

export function SiteNav() {
  return (
    <div className="flex w-full select-none flex-wrap items-center justify-between gap-3">
      <nav className="inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-black/[0.06] p-1 font-sans text-xs text-strong sm:text-sm">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full px-3 py-1 transition-colors duration-200 hover:bg-bg/70 sm:px-4"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <AskAIControl />
    </div>
  );
}

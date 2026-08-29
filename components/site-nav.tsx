"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AskAIControl } from "@/components/ask-ai";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/" },
  { label: "Writing", href: "/articles" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <div className="flex w-full select-none flex-wrap items-center justify-between gap-3">
      <nav className="inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-black/[0.06] p-1 font-sans text-xs text-strong sm:text-sm">
        {navItems.map((item) => {
          const isActive =
            item.href === "/articles" ? pathname.startsWith("/articles") : pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-3 py-1 transition-colors duration-200 sm:px-4 ${
                isActive ? "bg-bg shadow-sm" : "hover:bg-bg/70"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <AskAIControl />
    </div>
  );
}

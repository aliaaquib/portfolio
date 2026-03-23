import Link from "next/link";
import { categories } from "@/lib/posts";

export function SiteFooter() {
  return (
    <footer className="mt-10 space-y-4 text-[11px] text-muted sm:text-xs">
      <p>aaquib — where teaching, systems, and words quietly meet</p>
      <nav className="flex flex-wrap gap-3">
        {categories.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="transition-colors duration-200 hover:text-accent"
          >
            [{item.label}]
          </Link>
        ))}
      </nav>
    </footer>
  );
}

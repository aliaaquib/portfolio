import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-10 space-y-4 text-[11px] text-muted sm:text-xs">
      <p>aaquib — somewhere between teaching, and how work is shifting to agents</p>
      <nav className="flex flex-wrap gap-3">
        <Link href="/" className="transition-colors duration-200 hover:text-accent">
          [home]
        </Link>
        <Link href="/blog" className="transition-colors duration-200 hover:text-accent">
          [blog]
        </Link>
        <Link href="/writings" className="transition-colors duration-200 hover:text-accent">
          [writings]
        </Link>
        <Link href="/contact" className="transition-colors duration-200 hover:text-accent">
          [contact]
        </Link>
      </nav>
    </footer>
  );
}

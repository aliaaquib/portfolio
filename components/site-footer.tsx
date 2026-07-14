import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-10 space-y-4 text-sm text-muted sm:text-base">
      <p>aaquib ali - somewhere between teaching, and how work is shifting to agents</p>
      <nav className="flex flex-wrap gap-3">
        <Link href="/" className="transition-colors duration-200 hover:text-accent">
          [home]
        </Link>
        <Link href="/feed" className="transition-colors duration-200 hover:text-accent">
          [feed]
        </Link>
        <Link href="/blogs" className="transition-colors duration-200 hover:text-accent">
          [blogs]
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

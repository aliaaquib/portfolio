const LINKS = [
  { href: "mailto:imaaquibali@gmail.com", label: "imaaquibali@gmail.com" },
  { href: "https://www.linkedin.com/in/aliaaquib", label: "LinkedIn" },
  { href: "https://github.com/aliaaquib", label: "GitHub" },
  { href: "https://x.com/imaaquibali", label: "@imaaquibali" },
];

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-strong/10 py-10">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-[15px] text-strong">
        {LINKS.map((link, i) => (
          <span key={link.href} className="inline-flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted">
                ·
              </span>
            )}
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="underline decoration-strong/30 underline-offset-4 transition hover:decoration-brandred hover:text-brandred"
            >
              {link.label}
            </a>
          </span>
        ))}
      </p>
    </footer>
  );
}

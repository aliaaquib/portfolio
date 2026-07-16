"use client";

export function ContactMiniWindow({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 top-0 z-50 select-none origin-top-left animate-contact-pop font-sans">
      <section className="w-[min(18rem,calc(100vw-2rem))] rounded-[1.5rem] border border-muted/20 bg-bg px-5 py-5 text-strong shadow-2xl">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-xs text-muted sm:text-sm">Get in touch</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xl leading-none text-muted transition-colors hover:text-strong"
            aria-label="Close contact window"
          >
            ×
          </button>
        </header>

        <div className="space-y-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="mb-1.5 text-xs text-muted">Email</p>
              <a
                href="mailto:imaaquibali@gmail.com"
                className="text-sm leading-tight text-strong transition-opacity hover:opacity-80 sm:text-base"
              >
                imaaquibali@gmail.com
              </a>
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText("imaaquibali@gmail.com")}
              className="text-muted transition-colors hover:text-strong"
              aria-label="Copy email"
            >
              <CopyIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="mb-1.5 text-xs text-muted">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/aliaaquib"
                target="_blank"
                rel="noreferrer"
                className="text-sm leading-tight text-strong transition-opacity hover:opacity-80 sm:text-base"
              >
                @aliaaquib
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/aliaaquib"
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-strong"
              aria-label="Open LinkedIn"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <rect x="4" y="4" width="11" height="11" rx="2" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

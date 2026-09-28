"use client";

import { usePathname, useRouter } from "next/navigation";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3.5 9.6 12 3l8.5 6.6" />
      <path d="M3.8 10v8.7a2 2 0 0 0 2 2h4.3v-6.5a1 1 0 0 1 1-1h1.8a1 1 0 0 1 1 1v6.5h4.3a2 2 0 0 0 2-2V10" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 5.5l7.5 3.9-7.5 3.9-7.5-3.9Z" />
      <path d="m4.5 13.5 7.5 3.9 7.5-3.9" />
      <path d="m4.5 17.6 7.5 3.9 7.5-3.9" />
    </svg>
  );
}

function PenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1.4-3.4 4.2-5 7.5-5s6.1 1.6 7.5 5" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3l1.9 5.4L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.6L12 3Z" />
      <path d="M19 3.5v3M17.5 5h3" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function MobileTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Active tab follows the route: home stays home, work is its own page.
  const active =
    pathname === "/writing" ||
    pathname.startsWith("/writing/") ||
    pathname.startsWith("/research/")
      ? "writing"
      : pathname === "/about" || pathname.startsWith("/about/")
        ? "about"
        : pathname === "/work" || pathname.startsWith("/work/")
          ? "work"
          : "home";

  function go(href: string) {
    const run = () => router.push(href);
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(run);
    } else {
      run();
    }
  }

  function onHome() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      go("/");
    }
  }

  const tabs = [
    { id: "home", label: "Home", Icon: HomeIcon, onClick: onHome },
    { id: "work", label: "Work", Icon: LayersIcon, onClick: () => go("/work") },
    { id: "writing", label: "Writing", Icon: PenIcon, onClick: () => go("/writing") },
    { id: "about", label: "About", Icon: UserIcon, onClick: () => go("/about") },
    {
      id: "contact",
      label: "Contact",
      Icon: MailIcon,
      onClick: () => window.dispatchEvent(new CustomEvent("open-contact")),
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <nav aria-label="Primary" className="mx-auto w-fit px-4 pb-3">
        <div className="flex items-center gap-1 rounded-full border border-strong/10 bg-white/60 py-2 pl-2 pr-2 shadow-[0_8px_30px_rgba(17,17,17,0.14)] backdrop-blur-xl dark:bg-black/60">
          <button
            type="button"
            onClick={onHome}
            aria-label="Aaquib Ali — back to top"
            className="shrink-0 rounded-full transition-transform active:scale-95"
          >
            <img
              src="/portrait.jpg"
              alt=""
              className="h-10 w-10 rounded-full border border-strong/10 object-cover"
            />
          </button>
          <span aria-hidden="true" className="mx-1 h-6 w-px shrink-0 bg-strong/15" />
          {tabs.map(({ id, label, Icon, onClick }) => (
            <button
              key={id}
              type="button"
              onClick={onClick}
              aria-label={label}
              aria-current={active === id ? "page" : undefined}
              className={`grid h-10 w-10 place-items-center rounded-full transition-all active:scale-95 ${
                active === id
                  ? "bg-white text-strong shadow-[0_1px_6px_rgba(17,17,17,0.15)] dark:bg-white/15 dark:text-white"
                  : "text-muted hover:text-strong"
              }`}
            >
              <Icon className="h-[22px] w-[22px]" />
            </button>
          ))}
          <span aria-hidden="true" className="mx-1 h-6 w-px shrink-0 bg-strong/15" />
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-ask-ai"))}
            aria-label="Ask AI"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#111111] text-white transition-transform active:scale-95 dark:bg-white dark:text-black"
          >
            <SparklesIcon className="h-[20px] w-[20px]" />
          </button>
        </div>
      </nav>
    </div>
  );
}

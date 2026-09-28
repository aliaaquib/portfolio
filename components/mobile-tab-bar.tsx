"use client";

import { usePathname, useRouter } from "next/navigation";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6.5 10v10h11V10" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9.5 3h5" />
      <path d="M10.5 3v5.2L5.7 17a2.6 2.6 0 0 0 2.3 3.9h8a2.6 2.6 0 0 0 2.3-3.9L13.5 8.2V3" />
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

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3 14 21l-3.5-7.5L3 10 21 3Z" />
    </svg>
  );
}

export function MobileTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Active tab follows the route: home stays home, work is its own page.
  const active =
    pathname === "/labs" || pathname.startsWith("/labs/")
      ? "labs"
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
    { id: "labs", label: "Labs", Icon: FlaskIcon, onClick: () => go("/labs") },
    { id: "about", label: "About", Icon: UserIcon, onClick: () => go("/about") },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)] sm:hidden">
      <nav aria-label="Mobile" className="mx-auto w-fit px-4 pb-3">
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
            <SendIcon className="h-[20px] w-[20px]" />
          </button>
        </div>
      </nav>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

type SectionNavItem = {
  id: string;
  title: string;
};

export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.08, 0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="fixed left-8 top-1/2 z-20 hidden -translate-y-1/2 font-sans text-sm lg:block xl:left-12">
      <div className="space-y-2">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <div key={item.id} className="group/section">
              <a
                href={`#${item.id}`}
                className={`group flex items-center gap-4 transition-all duration-300 hover:translate-x-2 hover:text-strong ${
                  isActive ? "text-strong" : "text-muted"
                }`}
              >
                <span
                  className={`h-px rounded-full transition-all duration-500 group-hover:w-10 group-hover:bg-strong ${
                    isActive ? "w-10 bg-strong" : "w-7 bg-muted/40"
                  }`}
                />
                <span>{item.title}</span>
              </a>
              {item.id !== items[items.length - 1]?.id ? (
                <div className="my-2 flex flex-col gap-2" aria-hidden="true">
                  <span
                    className={`h-px rounded-full transition-all duration-500 group-hover/section:w-7 group-hover/section:bg-muted/40 ${
                      isActive ? "w-7 bg-muted/40" : "w-5 bg-muted/30"
                    }`}
                  />
                  <span
                    className={`h-px rounded-full transition-all duration-500 group-hover/section:w-5 group-hover/section:bg-muted/35 ${
                      isActive ? "w-5 bg-muted/35" : "w-3 bg-muted/25"
                    }`}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

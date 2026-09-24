"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PreviewInfo = {
  title: string;
  url: string;
  metric?: string;
  status: string;
};

/**
 * Cursor-following floating project preview, reference-style: hovering a
 * project row spawns a small browser-chrome mockup that trails the cursor.
 * Desktop / fine-pointer only.
 */
export function ProjectPreviewZone({ children }: { children: React.ReactNode }) {
  const [preview, setPreview] = useState<PreviewInfo | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    const el = (e.target as HTMLElement).closest?.("[data-preview-title]");
    if (el instanceof HTMLElement) {
      setPreview({
        title: el.dataset.previewTitle ?? "",
        url: el.dataset.previewUrl ?? "",
        metric: el.dataset.previewMetric || undefined,
        status: el.dataset.previewStatus ?? "Live",
      });
    } else {
      setPreview(null);
    }
  }, []);

  if (!finePointer) {
    return <div>{children}</div>;
  }

  const flipX = typeof window !== "undefined" && pos.x > window.innerWidth - 380;
  const flipY = typeof window !== "undefined" && pos.y > window.innerHeight - 320;

  return (
    <div ref={zoneRef} onMouseMove={handleMove} onMouseLeave={() => setPreview(null)}>
      {children}
      {preview && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-50 w-[300px] animate-contact-pop"
          style={{
            left: flipX ? pos.x - 320 : pos.x + 24,
            top: flipY ? pos.y - 260 : pos.y + 24,
          }}
        >
          <div className="overflow-hidden rounded-xl border border-strong/15 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.25)]">
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-strong/10 bg-[#f4f1ea] px-3 py-2">
              <span className="flex gap-1.5">
                <i className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <i className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <i className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="truncate rounded-full bg-white px-3 py-1 text-[11px] text-muted">
                {preview.url.replace(/^https?:\/\//, "")}
              </span>
            </div>
            <div className="px-5 py-5">
              <p className="font-display text-[22px] leading-snug text-strong">
                {preview.title}
              </p>
              {preview.metric ? (
                <p className="mt-1.5 text-[13px] font-medium text-[#c14e22]">{preview.metric}</p>
              ) : null}
              <p className="mt-3 inline-flex items-center rounded-full border border-green-700/50 px-2 py-0.5 text-[11px] font-medium text-green-800">
                {preview.status}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

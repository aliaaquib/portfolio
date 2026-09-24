"use client";

export function LabsActions() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-ask-ai"))}
      className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-brandred underline decoration-brandred/50 underline-offset-4 transition hover:decoration-brandred"
    >
      Try it ↗
    </button>
  );
}

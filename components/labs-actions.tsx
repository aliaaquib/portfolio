"use client";

export function LabsActions({ action }: { action: "agent" | "ask" }) {
  const isAgent = action === "agent";
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(isAgent ? "open-agent-mode" : "open-ask-ai"))
      }
      className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-brandred underline decoration-brandred/50 underline-offset-4 transition hover:decoration-brandred"
    >
      {isAgent ? "Open agent mode" : "Try it"} ↗
    </button>
  );
}

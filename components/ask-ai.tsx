"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const PROMPTS = [
  "What's Aaquib working on?",
  "Tell me about Clario",
  "Can you tell me more about Aaquib?",
  "What's his teaching + AI background?",
];

const ANSWERS: Record<string, string> = {
  "What's Aaquib working on?":
    "Aaquib is teaching, writing, building small AI workflows, and experimenting with tools like Clario and The Weekly Roundup.",
  "Tell me about Clario":
    "Clario is an AI research-agent project focused on making research loops smaller, clearer, and easier to reuse.",
  "Can you tell me more about Aaquib?":
    "Aaquib Ali is a teacher, writer, and builder who likes quiet interfaces, useful systems, poetry, raw thoughts, and intentional internet spaces.",
  "What's his teaching + AI background?":
    "He works between teaching and AI automation, using small systems, prompts, and agents to explain ideas and reduce repetitive work.",
};

const FALLBACK_ANSWER =
  "I can answer from Aaquib\u2019s site context: he writes about teaching, AI workflows, automation, quiet interfaces, and building useful small systems.";

export function AskAIControl() {
  const [isAskOpen, setIsAskOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsAskOpen(true)}
        className="inline-flex items-center gap-2 rounded-full px-1 py-1 font-sans text-xs text-muted transition-colors duration-200 hover:text-strong sm:text-sm"
      >
        <SparkleIcon className="h-4 w-4" />
        <span>Ask AI</span>
      </button>
      {isAskOpen ? <AskAIPanel onClose={() => setIsAskOpen(false)} /> : null}
    </>
  );
}

export function FloatingAskAIControl() {
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasMovedEnough = Math.abs(currentScrollY - lastScrollY.current) > 8;

      if (hasMovedEnough) {
        setIsVisible(isScrollingDown && currentScrollY > 80);
        lastScrollY.current = currentScrollY;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsAskOpen(true)}
        className={`fixed bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 select-none items-center gap-2 rounded-full bg-strong px-5 py-2.5 font-sans text-xs text-bg shadow-[0_10px_30px_rgba(17,17,17,0.25)] transition-all duration-300 hover:bg-red-700 sm:bottom-8 sm:text-sm ${
          isVisible || isAskOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <SparkleIcon className="h-4 w-4" />
        <span>Ask AI</span>
      </button>
      {isAskOpen ? <AskAIPanel onClose={() => setIsAskOpen(false)} /> : null}
    </>
  );
}

function AskAIPanel({ onClose }: { onClose: () => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a question below, or start with one of these.");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function askQuestion(nextQuestion: string) {
    const trimmedQuestion = nextQuestion.trim();

    if (!trimmedQuestion) {
      return;
    }

    setQuestion(trimmedQuestion);
    setAnswer(ANSWERS[trimmedQuestion] ?? FALLBACK_ANSWER);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askQuestion(question);
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Ask Aaquib"
    >
      <button
        type="button"
        aria-label="Close Ask AI"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-text/25 backdrop-blur-[2px]"
      />
      <aside className="relative max-h-[90dvh] w-full max-w-md animate-contact-pop overflow-y-auto rounded-3xl border border-strong/10 bg-[#fbf7ee] p-6 shadow-[0_30px_80px_rgba(63,58,52,0.25)] sm:p-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <SparkleIcon className="h-4 w-4 text-red-700" />
              <h2 className="font-sans text-lg tracking-tight text-strong">Ask Aaquib</h2>
            </div>
            <p className="mt-1 font-sans text-sm italic text-muted">
              Curious about the teacher, the writer, or the builder?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none text-muted transition-colors hover:bg-strong/5 hover:text-strong"
          >
            ×
          </button>
        </header>

        <div className="my-5 border-t border-strong/10" />

        <div className="space-y-1">
          {PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => askQuestion(prompt)}
              className="group flex w-full items-baseline gap-3 rounded-xl px-2 py-2 text-left font-sans text-sm leading-6 text-text/80 transition-colors hover:bg-strong/[0.04] hover:text-strong"
            >
              <span
                aria-hidden="true"
                className="translate-y-px text-red-700/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-red-700"
              >
                →
              </span>
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        <div
          key={answer}
          className="mt-5 animate-fade-swap border-l-2 border-red-700/40 pl-4 font-sans text-[15px] leading-7 text-text"
        >
          {answer}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3">
          <label htmlFor="ask-ai-input" className="sr-only">
            Ask about Aaquib
          </label>
          <input
            ref={inputRef}
            id="ask-ai-input"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about Aaquib…"
            autoComplete="off"
            className="w-full border-b border-strong/20 bg-transparent pb-2 font-sans text-sm text-strong outline-none transition-colors placeholder:italic placeholder:text-muted/70 focus:border-red-700"
          />
          <button
            type="submit"
            aria-label="Ask"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-strong font-sans text-lg text-bg transition-colors duration-200 hover:bg-red-700"
          >
            ↑
          </button>
        </form>
      </aside>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.2 2.4c.3-.8 1.4-.8 1.7 0l1.5 4a4.5 4.5 0 0 0 2.6 2.6l4 1.5c.8.3.8 1.4 0 1.7l-4 1.5a4.5 4.5 0 0 0-2.6 2.6l-1.5 4c-.3.8-1.4.8-1.7 0l-1.5-4a4.5 4.5 0 0 0-2.6-2.6l-4-1.5c-.8-.3-.8-1.4 0-1.7l4-1.5a4.5 4.5 0 0 0 2.6-2.6l1.5-4Z" />
      <path d="M19 1.8c.2-.5.9-.5 1.1 0l.5 1.4c.2.5.6.9 1.1 1.1l1.4.5c.5.2.5.9 0 1.1l-1.4.5c-.5.2-.9.6-1.1 1.1l-.5 1.4c-.2.5-.9.5-1.1 0l-.5-1.4c-.2-.5-.6-.9-1.1-1.1L16 5.9c-.5-.2-.5-.9 0-1.1l1.4-.5c.5-.2.9-.6 1.1-1.1l.5-1.4Z" />
    </svg>
  );
}

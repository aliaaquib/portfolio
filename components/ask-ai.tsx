"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function AskAIControl() {
  const [isAskOpen, setIsAskOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsAskOpen(true)}
        className="inline-flex items-center gap-2 rounded-full px-1 py-1 font-sans text-xs text-muted transition-colors duration-200 hover:text-strong sm:text-sm"
      >
        <SparkleIcon className="h-4 w-4 text-muted" />
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
      // const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasMovedEnough = Math.abs(currentScrollY - lastScrollY.current) > 8;

      if (hasMovedEnough) {
        // setIsVisible(isScrollingUp && currentScrollY > 80);
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
        className={`fixed bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 select-none items-center gap-2 rounded-full bg-strong px-4 py-2 font-sans text-xs text-bg shadow-xl transition-all duration-300 hover:opacity-85 sm:bottom-8 sm:text-sm ${
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
  const prompts = [
    "What's Aaquib working on?",
    "Tell me about Clario",
    "Can you tell me more about Aaquib?",
    "What's his teaching + AI background?",
  ];
  const answers: Record<string, string> = {
    "What's Aaquib working on?":
      "Aaquib is teaching, writing, building small AI workflows, and experimenting with tools like Clario and The Weekly Roundup.",
    "Tell me about Clario":
      "Clario is an AI research-agent project focused on making research loops smaller, clearer, and easier to reuse.",
    "Can you tell me more about Aaquib?":
      "Aaquib Ali is a teacher, writer, and builder who likes quiet interfaces, useful systems, poetry, raw thoughts, and intentional internet spaces.",
    "What's his teaching + AI background?":
      "He works between teaching and AI automation, using small systems, prompts, and agents to explain ideas and reduce repetitive work.",
  };
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a question or choose one of the prompts.");

  function askQuestion(nextQuestion: string) {
    const trimmedQuestion = nextQuestion.trim();

    if (!trimmedQuestion) {
      return;
    }

    setQuestion(trimmedQuestion);
    setAnswer(
      answers[trimmedQuestion] ??
        "I can answer from Aaquib’s site context: he writes about teaching, AI workflows, automation, quiet interfaces, and building useful small systems.",
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askQuestion(question);
  }

  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex h-screen min-h-screen w-full max-w-full select-none flex-col bg-bg py-4 pl-4 pr-6 font-sans text-strong shadow-2xl supports-[height:100dvh]:h-dvh sm:right-9 sm:max-w-[22rem] sm:pr-7">
      <header className="flex items-center justify-between border-b border-black/10 pb-4">
        <div className="flex items-center gap-2">
          <SparkleIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-xs font-medium sm:text-sm">Ask Aaquib</h2>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-black/30 text-[10px] text-white">
            i
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-2xl leading-none text-black/50 transition-colors hover:text-black"
          aria-label="Close Ask AI"
        >
          ×
        </button>
      </header>

      <div className="flex-1 py-5">
        <h3 className="mb-5 text-xl leading-tight tracking-tight sm:text-2xl">Ask me anything.</h3>
        <div className="space-y-3">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => askQuestion(prompt)}
              className="group flex items-start gap-3 text-left text-xs leading-5 text-black/65 transition-colors hover:text-black sm:text-sm sm:leading-6"
            >
              <span className="text-base leading-5 text-blue-600 transition-transform group-hover:translate-x-1 sm:text-lg sm:leading-6">
                ↳
              </span>
              <span>{prompt}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-muted/20 bg-black/[0.03] p-4 text-xs leading-6 text-black/65 sm:text-sm sm:leading-7">
          {answer}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-10 rounded-3xl border border-muted/20 bg-black/[0.03] p-4 shadow-sm">
        <label htmlFor="ask-ai-input" className="sr-only">
          Ask about Aaquib
        </label>
        <input
          id="ask-ai-input"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about Aaquib..."
          className="mb-6 w-full bg-transparent text-xs text-black/70 outline-none placeholder:text-black/45 sm:text-sm"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-black/55"
              onClick={() => askQuestion("Can you tell me more about Aaquib?")}
            >
              <SparkleIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-sm text-black/55"
              onClick={() => askQuestion("What's Aaquib working on?")}
            >
              ▰
            </button>
          </div>
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-200 text-xl text-white"
          >
            ↑
          </button>
        </div>
      </form>
    </aside>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M11.2 2.4c.3-.8 1.4-.8 1.7 0l1.5 4a4.5 4.5 0 0 0 2.6 2.6l4 1.5c.8.3.8 1.4 0 1.7l-4 1.5a4.5 4.5 0 0 0-2.6 2.6l-1.5 4c-.3.8-1.4.8-1.7 0l-1.5-4a4.5 4.5 0 0 0-2.6-2.6l-4-1.5c-.8-.3-.8-1.4 0-1.7l4-1.5a4.5 4.5 0 0 0 2.6-2.6l1.5-4Z" />
      <path d="M19 1.8c.2-.5.9-.5 1.1 0l.5 1.4c.2.5.6.9 1.1 1.1l1.4.5c.5.2.5.9 0 1.1l-1.4.5c-.5.2-.9.6-1.1 1.1l-.5 1.4c-.2.5-.9.5-1.1 0l-.5-1.4c-.2-.5-.6-.9-1.1-1.1L16 5.9c-.5-.2-.5-.9 0-1.1l1.4-.5c.5-.2.9-.6 1.1-1.1l.5-1.4Z" />
    </svg>
  );
}

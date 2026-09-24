"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const STARTERS = [
  "What is Aaquib building?",
  "Tell me about Thread Academy",
  "How does he teach CS?",
  "Book and poetry?",
];

type AnswerRule = { match: RegExp; answer: string };

const RULES: AnswerRule[] = [
  {
    match: /\bclario\b/i,
    answer:
      "Clario is an AI research agent Aaquib built — you ask a rough question and it comes back with a clear, sourced briefing. It's live at clarioagent.vercel.app.",
  },
  {
    match: /\broundup|newsletter\b/i,
    answer:
      "The Weekly Roundup is his AI-powered newsletter: the week's noise compressed into a five-minute read. Live at theweeklyroundup.vercel.app.",
  },
  {
    match: /\bthread\s?academy|academy\b/i,
    answer:
      "Thread Academy is the big one — a free learning platform covering the full school curriculum. 15,422 lesson pages across 28 subjects, every chapter reads like a textbook page. Live at threadlearning.vercel.app, built with Next.js and exported as a fully static site.",
  },
  {
    match: /\bteach|teacher|student|classroom|lesson|recursion|big-?o\b/i,
    answer:
      "He's a computer science teacher in Bishkek, Kyrgyzstan. His thing is making hard ideas feel obvious — recursion via Russian dolls, AI without the hype. Most lesson ideas start as answers to real student questions.",
  },
  {
    match: /\bbook|pata hai|poem|poetry|writ/i,
    answer:
      "He writes the occasional poem and is working on a book of raw thoughts called “pata hai aaj kya hua”. There's a small collection under Articles on this site.",
  },
  {
    match: /\bcontact|email|reach|hire|freelance\b/i,
    answer:
      "Best way to reach him is imaaquibali@gmail.com — or hit “Contact me” on the homepage for the full list of links.",
  },
  {
    match: /\bwho are you|about|aaquib\b/i,
    answer:
      "Aaquib Ali — computer science teacher in Bishkek, builder the rest of the time. He turns confusing ideas into obvious ones, builds small AI tools, and writes the occasional poem.",
  },
  {
    match: /\bwork|project|build|shipped|making\b/i,
    answer:
      "Right now: Thread Academy (15,422 lesson pages, 28 subjects), Clario (AI research agent), and The Weekly Roundup (AI newsletter). Scroll to “Career & selected work” for the full list with live links.",
  },
  {
    match: /\blab\b/i,
    answer:
      "His labs page has three experiments: Agent mode (this whole portfolio in a terminal), Ask AI (this chat), and a tiny mascot that follows your cursor. Check /labs.",
  },
];

const FALLBACK =
  "I don't have that in my notes — I only know what's on this site. Closest things I do have:";

const FALLBACK_PILLS = ["Tell me about your work", "What are your labs?"];

const QUOTA = 20;

type Message = { role: "user" | "ai"; text: string };

function pickAnswer(question: string): string {
  const rule = RULES.find((r) => r.match.test(question));
  return rule ? rule.answer : FALLBACK;
}

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

export function AskAIModalHost() {
  const [isAskOpen, setIsAskOpen] = useState(false);

  useEffect(() => {
    function handleOpenAsk() {
      setIsAskOpen(true);
    }

    window.addEventListener("open-ask-ai", handleOpenAsk);
    return () => window.removeEventListener("open-ask-ai", handleOpenAsk);
  }, []);

  if (!isAskOpen) return null;
  return <AskAIPanel onClose={() => setIsAskOpen(false)} />;
}

function AskAIPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "reading" | "streaming">("idle");
  const [streamed, setStreamed] = useState("");
  const [quota, setQuota] = useState(QUOTA);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streamed, phase]);

  useEffect(() => () => clearAllTimers(), []);

  function clearAllTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  function later(ms: number, fn: () => void) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function stop() {
    clearAllTimers();
    setPhase("idle");
    setStreamed("");
  }

  function reset() {
    stop();
    setMessages([]);
    setInput("");
    setSelectedStarter(null);
  }

  function chooseStarter(starter: string) {
    setSelectedStarter(starter);
    setInput(starter);
    inputRef.current?.focus();
  }

  function send(raw: string) {
    const question = raw.trim();
    if (!question || phase !== "idle" || quota <= 0) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setSelectedStarter(null);
    setQuota((q) => Math.max(0, q - 1));
    setPhase("reading");

    const full = pickAnswer(question);
    const words = full.split(" ");

    later(750, () => {
      setPhase("streaming");
      setStreamed("");
      words.forEach((word, i) => {
        later(900 + i * 45, () => {
          setStreamed((s) => (s ? `${s} ${word}` : word));
          if (i === words.length - 1) {
            later(60, () => {
              setMessages((m) => [...m, { role: "ai", text: full }]);
              setStreamed("");
              setPhase("idle");
            });
          }
        });
      });
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  const canSend = input.trim().length > 0 && phase === "idle" && quota > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Ask Aaquib anything"
    >
      <button
        type="button"
        aria-label="Close Ask AI"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-strong/30 backdrop-blur-[2px]"
      />
      <div className="relative grid max-h-[92dvh] w-full max-w-2xl animate-contact-pop overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(63,58,52,0.3)] sm:grid-cols-[200px_1fr]">
        <div className="relative hidden min-h-full sm:block">
          <img
            src="/portrait.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex min-h-0 flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-signature text-[34px] leading-none text-strong">
                Aaquib Ali
              </p>
              <h2 className="mt-2 font-display text-[28px] tracking-tight text-strong">
                What are you curious about?
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none text-muted transition-colors hover:bg-strong/5 hover:text-strong"
            >
              ×
            </button>
          </div>

          <div ref={scrollRef} className="mt-5 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.length === 0 && phase === "idle" && (
              <p className="text-sm italic text-muted">
                Ask about the teaching, the building, or the writing.
              </p>
            )}
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-strong/[0.07] px-4 py-2.5 text-[14px] leading-6 text-strong">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={i}>
                  <p className="max-w-[95%] text-[14px] leading-7 text-text">{m.text}</p>
                  {m.text === FALLBACK && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {FALLBACK_PILLS.map((pill) => (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => send(pill)}
                          className="rounded-full border border-strong/20 bg-white px-3.5 py-1.5 text-[13px] font-medium text-strong transition hover:border-[#e0632f] hover:text-[#c14e22]"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            {phase === "reading" && (
              <p className="flex items-center gap-2 text-[14px] italic text-muted">
                reading my notes
                <span className="thinking-dots font-bold not-italic text-[#e0632f]">
                  <span>·</span>
                  <span>·</span>
                  <span>·</span>
                </span>
              </p>
            )}
            {phase === "streaming" && (
              <p className="blink-cursor max-w-[95%] text-[14px] leading-7 text-text">{streamed}</p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => chooseStarter(starter)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                  selectedStarter === starter
                    ? "border-[#e0632f] bg-[#e0632f]/5 text-[#c14e22]"
                    : "border-strong/20 bg-white text-strong hover:border-[#e0632f]/60"
                }`}
              >
                {starter}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-3">
            <label htmlFor="ask-ai-input" className="sr-only">
              What would you like to know?
            </label>
            <div className="flex items-end gap-2 rounded-2xl border border-strong/15 bg-white px-4 py-2.5 transition focus-within:border-strong/40">
              <textarea
                ref={inputRef}
                id="ask-ai-input"
                rows={1}
                value={input}
                maxLength={2000}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                placeholder="What would you like to know?"
                autoComplete="off"
                className="max-h-28 w-full resize-none bg-transparent text-[14px] leading-6 text-strong outline-none placeholder:text-muted/70"
              />
              {phase === "idle" ? (
                <button
                  type="submit"
                  disabled={!canSend}
                  aria-label="Send"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg transition ${
                    canSend
                      ? "bg-strong text-bg hover:bg-brandred"
                      : "cursor-not-allowed bg-strong/10 text-muted/50"
                  }`}
                >
                  ↑
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stop}
                  aria-label="Stop"
                  className="flex h-9 shrink-0 items-center rounded-full bg-strong px-4 text-[13px] font-medium text-bg transition hover:bg-brandred"
                >
                  Stop
                </button>
              )}
            </div>
          </form>

          <div className="mt-3 flex items-center justify-between text-xs text-muted">
            <span>
              {quota > 0 ? `${quota} message${quota === 1 ? "" : "s"} left today` : "No messages left today"}
            </span>
            <button
              type="button"
              onClick={reset}
              className="font-medium text-strong underline decoration-strong/30 underline-offset-4 transition hover:text-brandred hover:decoration-brandred"
            >
              New
            </button>
          </div>
        </div>
      </div>
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

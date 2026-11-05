import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { site } from "../data";

type Message = { role: "user" | "assistant"; content: string };

const DAILY_LIMIT = 20;
const suggestions = [
  "What is Aaquib building?",
  "Tell me about Thread Academy",
  "How does he teach CS?",
  "Book and poetry?",
];

const today = () => new Date().toISOString().slice(0, 10);

function readUsage() {
  try {
    const saved = JSON.parse(localStorage.getItem("ask-ai-usage") ?? "null");
    if (saved?.day === today() && typeof saved.count === "number") return saved.count as number;
  } catch {
    // storage blocked or malformed: start fresh
  }
  return 0;
}

function saveUsage(count: number) {
  try {
    localStorage.setItem("ask-ai-usage", JSON.stringify({ day: today(), count }));
  } catch {
    // storage blocked: the server-side limit still applies
  }
}

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [used, setUsed] = useState(readUsage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const left = Math.max(DAILY_LIMIT - used, 0);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-ask-ai", onOpen);
    return () => window.removeEventListener("open-ask-ai", onOpen);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || busy || left === 0) return;
    const history: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    setUsed((n) => {
      saveUsage(n + 1);
      return n + 1;
    });

    const write = (content: string) =>
      setMessages((list) => [...list.slice(0, -1), { role: "assistant", content }]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        // Not answered, so it shouldn't count against today's limit.
        setUsed((n) => {
          saveUsage(Math.max(n - 1, 0));
          return Math.max(n - 1, 0);
        });
        const data = await res.json().catch(() => null);
        write(data?.error ?? "I couldn't answer right now — try again in a moment.");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        write(answer);
      }
      if (!answer) write("I couldn't answer that one — try asking another way.");
    } catch {
      write(`I couldn't reach the server. You can always email ${site.email}.`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          // Fixed strip as wide as the page content, so the button sits at the content's right edge.
          // (.glare-button sets position:relative, which would override `fixed` on the button itself.)
          <motion.div
            key="ask-ai-launcher"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-50 inset-x-0 bottom-24 md:bottom-8 pointer-events-none"
          >
            <div className="max-w-[1000px] mx-auto px-4 md:px-12 flex justify-end">
              <button
                onClick={() => setOpen(true)}
                aria-label="Ask AI about Aaquib"
                className="pointer-events-auto glare-button group flex items-center gap-2 h-11 md:h-auto px-4 md:px-5 md:py-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-soft hover:shadow-soft-hover font-medium text-sm transition-all duration-150"
              >
                <Sparkles size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                Ask AI
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="ask-ai-panel"
            role="dialog"
            aria-label="Ask AI about Aaquib"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[60] inset-x-0 bottom-24 md:bottom-8 pointer-events-none"
          >
            <div className="max-w-[1000px] mx-auto px-3 md:px-12 flex justify-end">
              <div className="pointer-events-auto w-full md:w-[400px] origin-bottom-right dashed-border-anim rounded-2xl bg-[#FFFEFD]/70 dark:bg-dark-bg/70 backdrop-blur-xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col h-[min(560px,70vh)] bg-white dark:bg-dark-surface rounded-[14px] overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-black/5 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="relative">
                        <img src="/portrait.jpg" alt="" className="w-9 h-9 rounded-full object-cover" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white dark:border-dark-surface" />
                      </span>
                      <div>
                        <h2 className="font-instrument font-semibold text-xl leading-none text-gray-800 dark:text-white">Ask about Aaquib</h2>
                        <p className="text-xs text-cherry-textSecondary dark:text-white/40 mt-1">An AI that knows his work</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {messages.length > 0 && (
                        <button
                          onClick={() => setMessages([])}
                          aria-label="New conversation"
                          className="w-8 h-8 flex items-center justify-center rounded-full text-cherry-textSecondary dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150"
                        >
                          <RotateCcw size={15} />
                        </button>
                      )}
                      <button
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-cherry-textSecondary dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  </div>

                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col justify-end">
                        <p className="font-instrument font-semibold text-2xl text-gray-800 dark:text-white mb-1">What are you curious about?</p>
                        <p className="text-sm text-cherry-textSecondary dark:text-white/50 mb-5">
                          Ask about his teaching, the things he builds, or his writing.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((s) => (
                            <button
                              key={s}
                              onClick={() => ask(s)}
                              disabled={left === 0}
                              className="glare-button text-left text-[13px] font-medium px-3.5 py-2 rounded-full bg-white dark:bg-dark-surface2 border border-black/10 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 disabled:opacity-50"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      messages.map((m, i) =>
                        m.role === "user" ? (
                          <div key={i} className="flex justify-end">
                            <p className="max-w-[85%] bg-black dark:bg-white text-white dark:text-black text-sm leading-relaxed rounded-2xl rounded-br-md px-4 py-2.5">
                              {m.content}
                            </p>
                          </div>
                        ) : (
                          <div key={i} className="flex justify-start">
                            <div className="max-w-[90%] bg-[#FCE7EC]/50 dark:bg-white/[0.06] text-gray-700 dark:text-white/80 text-sm leading-relaxed rounded-2xl rounded-bl-md px-4 py-2.5 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-gray-900 dark:[&_strong]:text-white">
                              {m.content ? (
                                <Markdown
                                  components={{
                                    a: ({ href, children }) => (
                                      <a href={href} target="_blank" rel="noreferrer">
                                        {children}
                                      </a>
                                    ),
                                  }}
                                >
                                  {m.content}
                                </Markdown>
                              ) : (
                                <span className="flex gap-1 py-1.5" aria-label="Thinking">
                                  {[0, 1, 2].map((d) => (
                                    <span
                                      key={d}
                                      className="w-1.5 h-1.5 rounded-full bg-[#c2185b]/60 animate-bounce"
                                      style={{ animationDelay: `${d * 0.15}s` }}
                                    />
                                  ))}
                                </span>
                              )}
                            </div>
                          </div>
                        ),
                      )
                    )}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      ask(input);
                    }}
                    className="px-4 pb-4 pt-3 border-t border-black/5 dark:border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        maxLength={1000}
                        placeholder={left === 0 ? "No questions left today" : "What would you like to know?"}
                        disabled={left === 0}
                        className="flex-1 min-w-0 bg-transparent border border-black/10 dark:border-white/15 rounded-full px-4 py-2.5 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none focus:border-black/30 dark:focus:border-white/40 transition-colors duration-150 disabled:opacity-60"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || busy || left === 0}
                        aria-label="Send"
                        className="glare-button shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black transition-opacity duration-150 disabled:opacity-30"
                      >
                        <ArrowUp size={17} />
                      </button>
                    </div>
                    <p className="text-[11px] text-cherry-textSecondary dark:text-white/40 mt-2 text-center">
                      {left} {left === 1 ? "message" : "messages"} left today · answers can be wrong
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

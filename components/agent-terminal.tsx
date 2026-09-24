"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playBlip } from "@/lib/sound";

/* ── agents ─────────────────────────────────────────────────────────── */

type AgentId = "muse" | "grok" | "gemini" | "codex";

const AGENTS: Record<AgentId, { color: string; glyph: string; tagline: string }> = {
  muse: { color: "#e0632f", glyph: "✳", tagline: "the one who helps run this site. most of the answering happens here." },
  grok: { color: "#9a9a9a", glyph: "◈", tagline: "same answers, sharper edges." },
  gemini: { color: "#5b9dff", glyph: "✦", tagline: "same answers, bluer look." },
  codex: { color: "#3fb950", glyph: "⬡", tagline: "same answers, greener look." },
};

const AGENT_IDS = Object.keys(AGENTS) as AgentId[];

/* ── knowledge ──────────────────────────────────────────────────────── */

const HELP = `explore Aaquib's portfolio with a command:

  work ............ projects, shipped and in progress
  labs ............ tools, experiments and their current status
  open <name> ..... preview a project: clario, roundup, academy
  career .......... what he does all day
  stack ........... the tools behind the work
  about ........... the person behind the portfolio
  poetry .......... a small detour
  contact ......... get in touch
  muse/grok/gemini/codex .. switch the look. same answers underneath
  clear ........... start a fresh conversation
  exit ............ return to the portfolio`;

const WORK = `shipped & shipping:

  clario ............. AI research agent [Live]
                       clarioagent.vercel.app
  the weekly roundup . AI-powered newsletter [Live]
                       theweeklyroundup.vercel.app
  thread academy ..... 15,422 lesson pages, 28 subjects [Live]
                       threadlearning.vercel.app`;

const LABS = `experiments from the workshop:

  agent mode ... this terminal. type help. [Live]
  ask ai ........ the resident expert on every page [Live]
  mascot ....... a tiny aaquib that follows your cursor [Live]`;

const PROJECTS: Record<string, string> = {
  clario: `clario — an AI research agent.\nask a rough question, get a clear, sourced briefing.\nlive at clarioagent.vercel.app`,
  roundup: `the weekly roundup — an AI-powered newsletter.\nthe week's noise compressed into a five-minute read.\nlive at theweeklyroundup.vercel.app`,
  academy: `thread academy — a free learning platform for the full school curriculum.\n15,422 lesson pages across 28 subjects, every chapter reads like a textbook page.\nlive at threadlearning.vercel.app`,
};

const CAREER = `computer science teacher in Bishkek, Kyrgyzstan.
days go to recursion, Big-O, pointers and how the internet actually works —
explained so students get it the first time.`;

const STACK = `this site: Next.js 16 · React 19 · Tailwind CSS · Sanity · Vercel.
thread academy: the same stack, exported as a fully static site.`;

const ABOUT = `Aaquib Ali — computer science teacher in Bishkek, builder the rest of the time.
he turns confusing ideas into obvious ones, builds small AI tools,
and writes the occasional poem.`;

const POETRY = `a small detour:
the occasional poem, and a book of raw thoughts in progress —
"pata hai aaj kya hua".`;

const CONTACT = `imaaquibali@gmail.com
github.com/aliaaquib
linkedin.com/in/aliaaquib
x.com/imaaquibali`;

function answerFreeText(q: string): string {
  const s = q.toLowerCase();
  if (/\b(clario)\b/.test(s)) return PROJECTS.clario;
  if (/\b(roundup|newsletter)\b/.test(s)) return PROJECTS.roundup;
  if (/\b(thread|academy|lessons|curriculum)\b/.test(s)) return PROJECTS.academy;
  if (/\b(teach|teacher|school|students|classroom|recursion|big-?o)\b/.test(s)) return CAREER;
  if (/\b(stack|built with|next\.?js|tech)\b/.test(s)) return STACK;
  if (/\b(poem|poetry|book|pata hai)\b/.test(s)) return POETRY;
  if (/\b(email|contact|reach|hire)\b/.test(s)) return CONTACT;
  if (/\b(who are you|about|yourself|aaquib)\b/.test(s)) return ABOUT;
  if (/\b(work|projects|building|shipped)\b/.test(s)) return WORK;
  if (/\b(labs|experiments|mascot|terminal)\b/.test(s)) return LABS;
  if (/\b(hi|hello|hey|salam)\b/.test(s)) return `hey. type help to see what I can show you.`;
  return `I only know what's on this site — try "help" for the full list of commands.`;
}

type Line = { kind: "cmd" | "out" | "dim"; text: string };

const COMMANDS = ["help", "work", "labs", "open", "career", "stack", "about", "poetry", "contact", "clear", "new", "exit", "light", ...AGENT_IDS];

/* ── terminal ───────────────────────────────────────────────────────── */

export function AgentTerminalHost() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-agent-mode", handler);
    return () => window.removeEventListener("open-agent-mode", handler);
  }, []);

  if (!open) return null;
  return <AgentTerminal onExit={() => setOpen(false)} />;
}

function AgentTerminal({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<"choose" | "agent">("choose");
  const [agent, setAgent] = useState<AgentId>("muse");
  const [light, setLight] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [left, setLeft] = useState(20);
  const [thinking, setThinking] = useState(false);
  const thinkTimer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const accent = AGENTS[agent].color;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, view]);

  const print = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  function runCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    playBlip();
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    if (view === "choose") {
      if ((AGENT_IDS as string[]).includes(head)) {
        const id = head as AgentId;
        setAgent(id);
        setView("agent");
        setLines([]);
        return;
      }
      if (head === "exit" || head === "quit") return onExit();
      print([
        { kind: "cmd", text: `$ ${cmd}` },
        { kind: "dim", text: `unknown terminal. try: ${AGENT_IDS.join(", ")}` },
      ]);
      return;
    }

    if (head === "exit" || head === "quit") return onExit();
    if (head === "clear" || head === "new") {
      setLines([]);
      return;
    }
    if (head === "light" || head === "dark") {
      setLight(head === "light");
      return;
    }
    if ((AGENT_IDS as string[]).includes(head)) {
      const id = head as AgentId;
      setAgent(id);
      print([
        { kind: "cmd", text: `❯ ${cmd}` },
        { kind: "dim", text: `switched to ${id}. ${AGENTS[id].tagline}` },
      ]);
      return;
    }

    const body: Line[] = [];
    switch (head) {
      case "help":
        body.push({ kind: "out", text: HELP });
        break;
      case "work":
        body.push({ kind: "out", text: WORK });
        break;
      case "labs":
        body.push({ kind: "out", text: LABS });
        break;
      case "open": {
        const key = arg.replace(/^the\s+/, "").replace(/\s+/g, "");
        const hit = PROJECTS[key] ?? PROJECTS[Object.keys(PROJECTS).find((k) => key.includes(k)) ?? ""];
        body.push({ kind: "out", text: hit || `nothing called "${arg}". try: clario, roundup, academy` });
        break;
      }
      case "career":
        body.push({ kind: "out", text: CAREER });
        break;
      case "stack":
        body.push({ kind: "out", text: STACK });
        break;
      case "about":
        body.push({ kind: "out", text: ABOUT });
        break;
      case "poetry":
        body.push({ kind: "out", text: POETRY });
        break;
      case "contact":
        body.push({ kind: "out", text: CONTACT });
        break;
      default: {
        body.push({ kind: "out", text: answerFreeText(cmd) });
        setLeft((n) => Math.max(0, n - 1));
      }
    }
    print([{ kind: "cmd", text: `❯ ${cmd}` }]);
    if (thinkTimer.current) window.clearTimeout(thinkTimer.current);
    setThinking(true);
    thinkTimer.current = window.setTimeout(() => {
      setThinking(false);
      thinkTimer.current = null;
      print(body);
    }, 650);
  }

  function complete() {
    const parts = value.toLowerCase().split(/\s+/);
    if (view === "choose") {
      const hit = AGENT_IDS.find((a) => a.startsWith(parts[0] || ""));
      if (hit) setValue(hit);
      return;
    }
    if (parts.length <= 1) {
      const hit = COMMANDS.find((c) => c.startsWith(parts[0] || ""));
      if (hit) setValue(hit + (hit === "open" ? " " : ""));
    } else if (parts[0] === "open") {
      const hit = Object.keys(PROJECTS).find((k) => k.startsWith(parts[1] || ""));
      if (hit) setValue(`open ${hit}`);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length) {
        const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx !== -1) {
        const next = histIdx + 1;
        if (next >= history.length) {
          setHistIdx(-1);
          setValue("");
        } else {
          setHistIdx(next);
          setValue(history[next]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      onExit();
    } else if (e.key === "Escape") {
      onExit();
    }
  }

  const theme = light
    ? { bg: "#f7f0e6", fg: "#1a1a18", dim: "#6f675f", hair: "rgba(17,17,17,0.15)" }
    : { bg: "#000000", fg: "#f5f5f5", dim: "#8a8a8a", hair: "rgba(255,255,255,0.18)" };

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col font-mono"
      style={{ backgroundColor: theme.bg, color: theme.fg }}
      onClick={() => inputRef.current?.focus()}
      role="dialog"
      aria-modal="true"
      aria-label="Agent mode terminal"
    >
      {/* top bar */}
      <div
        className="flex items-center justify-between px-5 py-3 text-[13px]"
        style={{ borderBottom: `1px solid ${theme.hair}`, color: theme.dim }}
      >
        <span>
          <span style={{ color: theme.fg, fontWeight: 700 }}>aaquib@portfolio</span>
          {" ~ / "}
          {view === "choose" ? "choose-your-terminal" : agent}
        </span>
        <span className="flex items-center gap-4">
          {view === "agent" && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLines([]); }}
              className="transition-opacity hover:opacity-70"
            >
              [ new ]
            </button>
          )}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLight((l) => !l); }}
            className="transition-opacity hover:opacity-70"
          >
            [ {light ? "dark" : "light"} ]
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onExit(); }}
            className="transition-opacity hover:opacity-70"
          >
            [ exit Ctrl+C ]
          </button>
        </span>
      </div>

      {view === "choose" ? (
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6">
          <div className="text-4xl" style={{ color: theme.fg }}>&gt;_</div>
          <h2 className="mt-6 text-2xl font-bold">Aaquib Ali</h2>
          <p className="mt-2 text-[26px] leading-snug">through a different lens.</p>
          <p className="mt-6 text-sm" style={{ color: theme.dim }}>same person. same work. your terminal.</p>
          <p className="mt-2 text-sm" style={{ color: theme.dim }}>invoke an agent below and press enter to begin.</p>
          <p className="mt-4 text-[15px] font-bold">
            {AGENT_IDS.map((id, i) => (
              <span key={id}>
                {i > 0 && <span className="font-normal" style={{ color: theme.dim }}> / </span>}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setAgent(id); setView("agent"); setLines([]); }}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: id === "muse" ? accent : theme.fg }}
                >
                  {id}
                </button>
              </span>
            ))}
          </p>
        </div>
      ) : (
        <>
          <div className="mx-auto w-full max-w-3xl px-6 pt-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl" style={{ color: accent }}>{AGENTS[agent].glyph}</span>
              <div>
                <p className="text-[15px] font-bold">
                  {agent} <span className="font-normal" style={{ color: theme.dim }}>/ portfolio edition</span>
                </p>
                <p className="text-xs" style={{ color: theme.dim }}>~/aaquib-ali · curated content</p>
              </div>
            </div>
            <div className="my-5" style={{ borderTop: `1px solid ${theme.hair}` }} />
            <p>
              <span className="font-bold" style={{ color: accent }}>❯ </span>
              <span className="font-bold">{agent}</span>
            </p>
            <p className="mt-3 text-sm" style={{ color: theme.dim }}>{AGENTS[agent].tagline}</p>
            <p className="mt-1 text-sm" style={{ color: theme.dim }}>ask away. or type help.</p>
          </div>
          <div ref={scrollRef} className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-6 py-6">
            {lines.map((line, i) => (
              <p
                key={i}
                className={`whitespace-pre-wrap text-sm leading-6 ${line.kind === "cmd" ? "mt-4 font-bold" : "mt-1"}`}
                style={{
                  color: line.kind === "cmd" ? accent : line.kind === "dim" ? theme.dim : theme.fg,
                }}
              >
                {line.text}
              </p>
            ))}
            {thinking ? (
              <p className="cogitating mt-1 text-sm" style={{ color: theme.dim }}>
                · cogitating
              </p>
            ) : null}
          </div>
        </>
      )}

      {/* input */}
      <div className="mx-auto w-full max-w-3xl px-6">
        <div
          className="flex items-center gap-2 py-3"
          style={{ borderTop: `1px solid ${view === "agent" ? accent : theme.hair}` }}
        >
          <span className="text-sm font-bold" style={{ color: view === "agent" ? accent : theme.fg }}>
            {view === "agent" ? "❯" : "$"}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={view === "agent" ? "ask about my work, or type help…" : "muse, grok, gemini or codex"}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
            className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-current placeholder:opacity-40"
            style={{ color: theme.fg }}
          />
          <span style={{ color: theme.dim }}>⏎</span>
        </div>
        <div
          className="flex items-center justify-between pb-4 text-[11px]"
          style={{ color: theme.dim }}
        >
          <span>
            {view === "agent" ? `${left} messages left today · help · ctrl+c exit` : "choose a terminal · ctrl+c exit"}
          </span>
          <span>↑↓ history · tab complete</span>
        </div>
      </div>
    </div>
  );
}

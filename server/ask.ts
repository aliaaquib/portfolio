import Anthropic from "@anthropic-ai/sdk";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { instructions, profile } from "./profile";

const MODEL = "claude-opus-5-5";
const MAX_TURNS = 12; // messages of history we accept from the browser
const MAX_CHARS = 1000; // per message
const PER_IP_PER_DAY = 20;

let client: Anthropic | null = null;
let systemPrompt: string | null = null;

/** Profile + every blog post, built once per server instance. Byte-stable so the prompt cache hits. */
function buildSystemPrompt() {
  if (systemPrompt) return systemPrompt;
  const dir = path.join(process.cwd(), "src", "content", "blog");
  let articles = "";
  try {
    articles = readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .sort()
      .map((f) => readFileSync(path.join(dir, f), "utf8").replace(/^---[\s\S]*?---\s*/, (fm) => fm.replace(/^thumbnail:.*$/m, "")))
      .join("\n\n---\n\n");
  } catch {
    // articles are a bonus; the profile alone still works
  }
  systemPrompt = `${instructions}\n\n<profile>\n${profile}\n</profile>\n\n<articles>\n${articles}\n</articles>`;
  return systemPrompt;
}

// Best-effort abuse guard. Serverless instances don't share memory, so this is per instance;
// the browser also enforces the same daily limit.
const hits = new Map<string, { day: string; count: number }>();
function overLimit(ip: string) {
  const day = new Date().toISOString().slice(0, 10);
  const entry = hits.get(ip);
  if (!entry || entry.day !== day) {
    hits.set(ip, { day, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > PER_IP_PER_DAY;
}

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  const list = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(list) || list.length === 0) return null;
  const messages = list.slice(-MAX_TURNS).map((m) => ({
    role: m?.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: String(m?.content ?? "").slice(0, MAX_CHARS),
  }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

const json = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), { status, headers: { "content-type": "application/json" } });

/** POST {messages:[{role,content}]} → streamed plain-text answer. */
export async function handleAsk(request: Request): Promise<Response> {
  if (request.method !== "POST") return json(405, "Use POST.");
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (overLimit(ip)) return json(429, "That's all the questions for today — try again tomorrow, or email imaaquibali@gmail.com.");

  let messages: Anthropic.Beta.BetaMessageParam[] | null = null;
  try {
    messages = parseMessages(await request.json());
  } catch {
    // fall through to the 400 below
  }
  if (!messages) return json(400, "Send a question first.");

  try {
    client ??= new Anthropic();
  } catch (error) {
    // No credentials configured (e.g. ANTHROPIC_API_KEY unset).
    console.error("[ask]", error);
    return json(503, "Ask AI isn't switched on yet — meanwhile you can email imaaquibali@gmail.com.");
  }
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    system: [{ type: "text", text: buildSystemPrompt(), cache_control: { type: "ephemeral" } }],
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wrote = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            wrote = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !wrote) {
          controller.enqueue(encoder.encode("I can't help with that one — but feel free to ask me about Aaquib's work."));
        }
      } catch (error) {
        const message =
          error instanceof Anthropic.RateLimitError
            ? "I'm getting a lot of questions right now — try again in a minute."
            : error instanceof Anthropic.AuthenticationError ||
                (error instanceof Anthropic.AnthropicError && !(error instanceof Anthropic.APIError))
              ? // bad key, or no credentials configured at all
                "Ask AI isn't switched on yet — meanwhile you can email imaaquibali@gmail.com."
              : "Something went wrong on my side — try again in a moment.";
        console.error("[ask]", error);
        controller.enqueue(encoder.encode(wrote ? `\n\n_${message}_` : message));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

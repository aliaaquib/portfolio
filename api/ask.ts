// Vercel Function (Node.js runtime, web-standard signature). Needs ANTHROPIC_API_KEY in the project's env vars.
import { handleAsk } from "../server/ask";

export function POST(request: Request) {
  return handleAsk(request);
}

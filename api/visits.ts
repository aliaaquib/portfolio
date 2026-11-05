// Vercel Function (Node.js runtime, web-standard signature). Needs Upstash Redis env vars, see server/visits.ts.
import { handleVisits } from "../server/visits";

export function GET(request: Request) {
  return handleVisits(request);
}

export function POST(request: Request) {
  return handleVisits(request);
}

// Cities people viewed the portfolio from, kept in Upstash Redis (Vercel Marketplace, free tier).
// Needs KV_REST_API_URL + KV_REST_API_TOKEN (or the UPSTASH_REDIS_REST_* names) in the project's env vars.
// Only the city, country, approximate coordinates and a count are stored — never the IP.

const KEY = "portfolio:cities";
const MAX_CITIES = 60;

type Place = { city: string; country: string; lat: number; lng: number; count: number };

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

async function redis(commands: (string | number)[][]) {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  return (await res.json()) as { result: unknown }[];
}

/** Vercel's own geo headers, so a visitor can't put a made-up city on the map. */
function placeFrom(request: Request) {
  const h = request.headers;
  const city = h.get("x-vercel-ip-city");
  const lat = Number(h.get("x-vercel-ip-latitude"));
  const lng = Number(h.get("x-vercel-ip-longitude"));
  if (!city || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return {
    city: decodeURIComponent(city).slice(0, 60),
    country: (h.get("x-vercel-ip-country") ?? "").slice(0, 2),
    // City-level is plenty for a pin; round away anything finer.
    lat: Math.round(lat * 10) / 10,
    lng: Math.round(lng * 10) / 10,
  };
}

/** GET → [{city, country, lat, lng, count}]. POST → records this visit's city, then returns the list. */
export async function handleVisits(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "POST") return json(405, { error: "Use GET or POST." });
  try {
    if (request.method === "POST") {
      const place = placeFrom(request);
      if (place) {
        const id = `${place.city}|${place.country}`;
        await redis([
          ["HSETNX", `${KEY}:info`, id, JSON.stringify(place)],
          ["ZINCRBY", KEY, 1, id],
        ]);
      }
    }
    const top = await redis([["ZREVRANGE", KEY, 0, MAX_CITIES - 1, "WITHSCORES"]]);
    if (!top) return json(200, []); // storage not set up yet
    const flat = top[0].result as string[];
    const ids = flat.filter((_, i) => i % 2 === 0);
    if (!ids.length) return json(200, []);
    const info = await redis([["HMGET", `${KEY}:info`, ...ids]]);
    const places: Place[] = [];
    (info?.[0].result as (string | null)[]).forEach((raw, i) => {
      if (raw) places.push({ ...JSON.parse(raw), count: Number(flat[i * 2 + 1]) });
    });
    return json(200, places);
  } catch (error) {
    console.error("[visits]", error);
    return json(200, []); // the globe still works without the list
  }
}

# aaquibali

Aaquib Ali's portfolio. Same stack and design system as palakonweb.in:
Vite + React + TypeScript, Tailwind CSS v3, Framer Motion, lucide-react + react-icons,
react-fast-marquee and react-markdown.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Where things live

- `src/data.tsx` holds all the content: name, roles, about text, tech stack, experience, projects, socials, Labs simulators and the quiz questions.
- `src/content/blog/*.md` holds the blog posts (front matter: slug, title, subheading, category, date, thumbnail). Each post lives at `/blog/<slug>`, and the three newest show on Home under "Latest writing".
- `public/` holds the images and fonts.

## Setup notes

- **Contact form:** create a free key at https://web3forms.com and put it in `.env` as `VITE_WEB3FORMS_KEY=...`. Without a key, the form opens the visitor's email app.
- **Quiz of the day:** questions live in `quiz` in `src/data.tsx` (question, options, the right `answer` index, an explanation, and an optional blog `slug`). Each visitor gets one question per day, in order, looping. Add more any time.
- **Before publishing:** `public/animals.png` (the footer illustration) is palakonweb's own artwork. Replace it with your own.
- **Hero banner:** an animated classroom drawn in SVG (`src/components/HeroClassroom.tsx`), with a light and a dark version. It holds still for visitors who turn off animations.

## Ask AI

The floating **Ask AI** chat streams answers from Claude (`claude-opus-5-5`, low effort) about Aaquib.

- Front end: `src/components/AskAI.tsx`. Back end: `api/ask.ts` (a Vercel Function), which calls `server/ask.ts`. The same handler also runs on `npm run dev` through a small Vite middleware.
- The assistant knows `server/profile.ts` plus every post in `src/content/blog/`. Update `profile.ts` when your facts change.
- **To switch it on:** add `ANTHROPIC_API_KEY` to the Vercel project's environment variables (and to `.env` for local dev). The key stays on the server and is never sent to the browser. Without it, the chat replies "Ask AI isn't switched on yet".
- **Limits:** 20 messages per visitor per day (in the browser, plus a best-effort per-IP check on the server). History is capped at 12 messages and each message at 1,000 characters. The system prompt is prompt-cached, and declined requests fall back to another model automatically (`fallbacks: "default"`).

## Labs

The Labs tab lists interactive simulators from `labs` in `src/data.tsx`. Each entry needs a `title`, `description`, `subject` and `url`, plus an optional `level` and 16:9 `image`. The `url` can be an outside link, or a page you drop into `public/labs/` (for example `public/labs/sorting.html` → `"/labs/sorting.html"`). Until the list has entries, the page shows a "coming soon" card.

## Live data on Home

- **Two dots on a globe:** finds the visitor's city with ipapi.co and gets the Manas weather from open-meteo (both free, no key). The globe is a small WebGL shader in `GlobeCard.tsx` that draws land as dots (from a NASA land/water mask on jsDelivr), with teardrop pins that show the city on hover.
- **Visitor cities on the globe:** `api/visits.ts` (→ `server/visits.ts`) counts each visit's city from Vercel's geo headers and returns the top 60, which the globe pins with labels. Only city, country, rounded coordinates and a count are stored, never IPs. **To switch it on:** add Upstash Redis to the Vercel project from the Marketplace (free tier); it sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Without it, the globe shows just Manas and the current visitor. Locally there are no geo headers, so nothing gets recorded.
- **On LinkedIn:** the posts live in `linkedin.posts` in `src/data.tsx`. Add new ones at the top.

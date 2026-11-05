# portfolio2 — Reverse-engineered spec

Extracted from the code on 2026-10-30 (commit `c28c8de`, the repo's only commit). Facts cite files; inferences are marked *(inferred)*.

## 1. Stack and architecture

| Layer | What | Where |
|---|---|---|
| Build | Vite 6 + TypeScript 5.8, `tsc -b && vite build` | `package.json`, `vite.config.ts` |
| UI | React 19, Tailwind v3 (`darkMode: "class"`), Framer Motion 12 | `tailwind.config.js`, `src/` |
| Icons / widgets | lucide-react, react-icons, react-fast-marquee, react-markdown | `package.json` |
| Backend | One Vercel Function `api/ask.ts` → `server/ask.ts` (Anthropic SDK) | `api/`, `server/` |
| Hosting | Vercel; `vercel.json` bundles `src/content/blog/**` into the function | `vercel.json` |

**It is a single-page app with a tiny hand-written router.** `App.tsx` maps paths to views (`/`, `/projects`, `/labs`, `/blog`, `/blog/<slug>`, `/contact`) with `pushState`/`popstate`, and swaps components inside `AnimatePresence`. `vercel.json` rewrites every non-API path to `index.html`.

Data flow: content is static TS in `src/data.tsx` and Markdown in `src/content/blog/`. Components read it at import time. Live data comes from browser-side `fetch` calls to free third-party APIs (section 4). The only server code is the Ask AI chat.

```
index.html → main.tsx → App.tsx
  ├─ Preloader (1.35 s intro) → then AskAI floating chat
  ├─ Navbar (logo, clock, links, theme toggle; mobile bottom dock)
  ├─ one view: Home | Projects | Labs | Blog | Contact
  └─ Footer
AskAI ──POST /api/ask──> api/ask.ts → server/ask.ts → Claude (streamed text)
```

## 2. Directory map

```
api/ask.ts              Vercel Function, POST only, delegates to server/ask.ts
server/ask.ts           Validation, rate limit, system prompt, streaming
server/profile.ts       Facts + instructions the AI is allowed to use
src/App.tsx             View state, theme, preloader, page transitions
src/data.tsx            ALL site content: site info, roles, about, stack, experience, projects, labs, quiz, LinkedIn posts
src/index.css           Fonts, dashed animated borders, glare buttons, blog prose, sparkle/arrow animations
src/content/blog/*.md   7 posts, front matter: slug, title, subheading, category, date, thumbnail
src/components/
  Home.tsx              Animated SVG classroom banner, portrait, typewriter, Quiz of the day, about, stack marquee, freelancing, experience accordion, LinkedIn, globe, GitHub calendar, socials
  Navbar.tsx            Content-width top nav + mobile bottom dock, ThemeToggle
  Projects.tsx          Filterable project list + case-study view
  Labs.tsx              Simulator cards from `labs` in data.tsx, or a coming-soon card
  Blog.tsx              Front-matter parser, category filter, article view
  Contact.tsx           Web3Forms form with mailto fallback
  AskAI.tsx             Floating chat UI, streaming reader, daily limit
  GlobeCard.tsx         WebGL earth globe with visitor-city pins, Manas weather, distance
  LinkedInCarousel.tsx  Draggable 1-up/2-up carousel
  Preloader.tsx         Handle "writing" + falling petal intro
  Footer.tsx            CTA, credit, floating hearts
public/                 Portrait, blog thumbnails, photos, fonts
```

## 3. Observed requirements (EARS)

### App shell
- The app shall show the Preloader for about 1.35 s, then show the site and the Ask AI launcher. (`Preloader.tsx:9-17`, `App.tsx:76-77`)
- The app shall default to the light theme and remember the choice in `localStorage.theme`. (`App.tsx:29-32,45-48`)
- When the theme is toggled and the browser supports View Transitions, the app shall animate the switch with `document.startViewTransition`. (`App.tsx:64-71`)
- When the user clicks Blog while reading a post, the app shall go back to the post list (`/blog`). (`App.tsx` `changeView`)
- When a `navigate-to` window event fires, the app shall switch to that view, or to home if the view is unknown. (`App.tsx:50-57`, used by `Footer.tsx`)
- When the view changes, the app shall scroll to the top. (`App.tsx:59-61`)

### Navbar
- On screens under `md` width, the navbar shall show a bottom dock where only the active item shows its label. (`Navbar.tsx` mobile block)

### Home
- The typewriter shall cycle through `roles` (type 80 ms/char, pause, delete 40 ms/char). (`Home.tsx` `Typewriter`)
- The Quiz of the day shall show one question per local calendar day from `quiz`; after an answer it shall mark right and wrong, show the explanation, and link the matching blog post. (`QuizOfTheDay.tsx`)
- The "Latest writing" section shall show the three newest posts; each card links to `/blog/<slug>`. (`Home.tsx`, `src/posts.ts`)
- The globe shall mark Manas and, if ipapi.co returns a location, the visitor's city. It shall show the great-circle distance when it is over 50 km, and the current Manas weather from open-meteo. (`GlobeCard.tsx`)
- While `prefers-reduced-motion` is set, the globe shall not spin and the CSS sparkle/arrow animations shall stop. (`GlobeCard.tsx`, `index.css:187,212`)

### Projects
- The projects page shall list `projects` with category filter pills and counts. (`Projects.tsx` `ProjectList`)
- When a project has a `caseStudy`, clicking its cover or "Case study" shall open the case-study view with a "next case study" link. (Only Thread Academy has one, so the next link is hidden.)
- When `status === "building"` or there is no `liveUrl`, the project shall show an "In progress" pill instead of a link.

### Labs
- The Labs page shall show one card per entry in `labs`, each opening its `url` in a new tab.
- While `labs` is empty, the page shall show a "coming soon" card.

### Blog
- At build time, the blog shall load every `src/content/blog/*.md` (eager `import.meta.glob ?raw`), parse the front matter with a small hand-written parser, and sort posts newest first.
- `category` shall be split on commas, and filter pills shall show a count for each category.

### Contact
- Where `VITE_WEB3FORMS_KEY` is set, submitting shall POST to `api.web3forms.com/submit` and show the states Sending, Sent, or an error.
- Where the key is not set, submitting shall open the visitor's mail app with a prefilled `mailto:`.
- When any field is empty, submitting shall do nothing (no error shown).

### Ask AI (`AskAI.tsx`, `server/ask.ts`)
- The chat shall allow 20 questions per browser per day, tracked in `localStorage["ask-ai-usage"]`. A failed request shall not count.
- When a non-POST request arrives, the server shall return 405. For empty or invalid messages it shall return 400.
- The server shall keep the last 12 messages, cut each to 1,000 characters, drop leading assistant turns, and require the last message to be from the user.
- The server shall allow 20 requests per IP per day, kept in memory on each serverless instance, and return 429 after that.
- When there is no API key or the key is bad, the reply shall be "Ask AI isn't switched on yet…" (503, or a message inside the stream).
- The server shall call `claude-opus-5-5` with `effort: "low"`, `max_tokens: 4000`, server-side fallback (`fallbacks: "default"`), and a cached system prompt (`instructions` + `profile` + every blog post, with thumbnails removed). It shall stream the reply as plain text.
- If the model refuses before writing any text, the server shall send a polite redirect message.
- If the browser cancels the request, the server shall abort the upstream stream.
- The chat shall render replies as Markdown and open links in a new tab.

## 4. Non-functional observations

- **Third-party calls from the browser:** ipapi.co, api.open-meteo.com, api.web3forms.com, Google Fonts. Every call fails quietly.
- **Secrets:** `ANTHROPIC_API_KEY` stays on the server. The dev middleware loads it from `.env` into `process.env` (`vite.config.ts:38-39`). `VITE_WEB3FORMS_KEY` ships in the browser bundle. That is how Web3Forms is meant to work, since it is a public access key.
- **Performance:** the main JS chunk is 458 kB (143 kB gzipped). Two banner videos (7 MB in total) both autoplay, even though only one is visible at a time. The globe renders 16k map samples at a pixel ratio of 2.
- **Accessibility:** buttons have aria-labels, Escape closes the dialogs, and reduced motion is respected. Gaps: the view switcher is not real navigation (no URLs, no focus moved on view change), and the Ask AI dialog does not trap focus.
- **SEO:** one `<title>` and one meta description. All content renders on the client and there is no OG image. Blog posts have their own URLs and tab titles, but share previews and indexing are limited because the HTML is the same for every path.
- **Quality checks:** `npm run build` passes. `npm run lint` passes with 1 warning (`data.tsx:43`, the `B` component exported from a data file). There are no tests.

## 5. Inferred acceptance criteria *(inferred)*

- A visitor can see who Aaquib is, what he has built, his writing and how to contact him in under a minute, on mobile or desktop, in light or dark mode.
- The site still renders fully when any one third-party API is down.
- Ask AI answers only from `profile.ts` and the blog posts, and sends visitors to email when it doesn't know.

## 6. Uncertainties and gaps

1. **Borrowed artwork:** the README says `animals.png` (footer) is palakonweb's artwork and must be replaced before publishing. The borrowed banner videos have been replaced by the SVG classroom.
2. **Two copies of the facts:** `server/profile.ts` repeats `src/data.tsx` by hand (the comment says "keep in sync"). The Weekly Roundup appears in the profile and the about text, but not in `projects`.
3. **Quiz length:** 12 questions, so the daily question repeats every 12 days until more are added.
4. **Blog dates:** 5 of the 7 posts share the date 2026-09-24, so their order among themselves depends on file order.
5. **Weak rate limit:** the per-IP limit resets on every cold start and is not shared between instances. The browser limit can be skipped by clearing localStorage. A determined visitor can run up the Anthropic bill.
6. **Trusted header:** `x-forwarded-for` is used as-is. On Vercel this is fine *(inferred)*; elsewhere the header could be spoofed.
7. **Leftover hook:** the `open-ask-ai` event listener exists, but nothing in the repo fires it.
8. **Copied links:** a project cover comment mentions an "Imageory cover", and School Hunter's `liveUrl` is a Vercel preview-style URL with a hash. Both look copied over from somewhere else.

## 7. Recommendations (smallest first)

1. Replace the borrowed banner videos and footer art (licensing risk).
2. Change the School Hunter link to its production URL.
3. Load only the banner video for the active theme, which saves about 3–4 MB per visit.
4. Add real hard limits for Ask AI: a spend cap in the Anthropic console, or a shared store (Vercel KV/Upstash) for the per-IP count.
5. If blog SEO matters, give each post its own URL (hash routing at minimum) and add OG tags.
6. Build `profile.ts` from `data.tsx` and the project list, so there is only one copy of the facts.

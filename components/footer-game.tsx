"use client";

import { useEffect, useRef } from "react";

const CONCEPTS = [
  "recursion",
  "API",
  "Big O",
  "loops",
  "the internet",
  "variables",
  "functions",
  "git",
  "databases",
  "algorithms",
  "HTTP",
  "pointers",
];

const HAND = '"Caveat", cursive';
const BEST_KEY = "teach-drop-best";
const GAME_H = 240;

type Item = {
  x: number;
  y: number;
  w: number;
  label: string;
  speed: number;
  sway: number;
};

type Popup = { x: number; y: number; t: number; text: string };

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function FooterGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current as HTMLCanvasElement;
    const wrapEl = wrapRef.current as HTMLDivElement;
    if (!canvasEl || !wrapEl) return;
    const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // ── state (refs, not React state — the loop owns them) ──────────
    let W = 0;
    const H = GAME_H;
    let raf = 0;
    let last = 0;
    let running = true;
    let phase: "idle" | "playing" | "over" = "idle";
    let score = 0;
    let lives = 3;
    let best = 0;
    try {
      best = Number(window.localStorage.getItem(BEST_KEY) ?? 0) || 0;
    } catch {
      best = 0;
    }
    let items: Item[] = [];
    let popups: Popup[] = [];
    let spawnT = 0;
    let capX = 0;
    let targetX = 0;
    const keys = new Set<string>();
    let newBest = false;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    try {
      void document.fonts.load('24px "Caveat"');
    } catch {
      /* font fallback is fine */
    }

    function resize() {
      const rect = wrapEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(280, rect.width);
      canvasEl.width = Math.round(W * dpr);
      canvasEl.height = Math.round(H * dpr);
      canvasEl.style.width = `${W}px`;
      canvasEl.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (capX === 0) {
        capX = W / 2;
        targetX = W / 2;
      }
      capX = Math.min(Math.max(capX, 40), W - 40);
      targetX = Math.min(Math.max(targetX, 40), W - 40);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapEl);

    function start() {
      phase = "playing";
      score = 0;
      lives = 3;
      items = [];
      popups = [];
      spawnT = 0.4;
      newBest = false;
      capX = W / 2;
      targetX = W / 2;
    }

    function endGame() {
      phase = "over";
      if (score > best) {
        best = score;
        newBest = true;
        try {
          window.localStorage.setItem(BEST_KEY, String(best));
        } catch {
          /* ignore */
        }
      }
    }

    function spawn() {
      const label = CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)];
      ctx.font = `20px ${HAND}`;
      const tw = ctx.measureText(label).width;
      const w = tw + 30;
      items.push({
        x: 30 + Math.random() * Math.max(60, W - 60 - w),
        y: -30,
        w,
        label,
        speed: Math.min(340, 120 + score * 1.6) * (reduced ? 0.6 : 1),
        sway: Math.random() * Math.PI * 2,
      });
    }

    function inView() {
      const r = canvasEl.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    }

    // ── input ──────────────────────────────────────────────────────
    function onKeyDown(e: KeyboardEvent) {
      const k = e.key;
      if (
        k === "ArrowLeft" ||
        k === "ArrowRight" ||
        k === "a" ||
        k === "d" ||
        k === "A" ||
        k === "D" ||
        k === " "
      ) {
        if (!inView()) return;
        e.preventDefault();
        if (k === " ") {
          if (phase !== "playing") start();
          return;
        }
        keys.add(k.toLowerCase());
        if (phase !== "playing") start();
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      keys.delete(e.key.toLowerCase());
    }
    function pointX(clientX: number) {
      const r = canvasEl.getBoundingClientRect();
      return Math.min(Math.max(clientX - r.left, 40), W - 40);
    }
    function onPointerMove(e: PointerEvent) {
      targetX = pointX(e.clientX);
    }
    function onPointerDown(e: PointerEvent) {
      targetX = pointX(e.clientX);
      if (phase !== "playing") start();
    }
    function onTouchMove(e: TouchEvent) {
      if (phase === "playing") e.preventDefault();
      const t = e.touches[0];
      if (t) targetX = pointX(t.clientX);
    }
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (t) targetX = pointX(t.clientX);
      if (phase !== "playing") start();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvasEl.addEventListener("pointermove", onPointerMove);
    canvasEl.addEventListener("pointerdown", onPointerDown);
    canvasEl.addEventListener("touchstart", onTouchStart, { passive: true });
    canvasEl.addEventListener("touchmove", onTouchMove, { passive: false });

    // ── drawing helpers ────────────────────────────────────────────
    function colors() {
      const dark = document.documentElement.classList.contains("dark");
      return {
        ink: dark ? "#f4f4f1" : "#161616",
        paper: dark ? "#101010" : "#ffffff",
        muted: dark ? "#a8a8a3" : "#737373",
      };
    }

    function drawCap(x: number, y: number, ink: string) {
      // head band
      ctx.fillStyle = ink;
      roundRect(ctx, x - 15, y - 4, 30, 15, 6);
      ctx.fill();
      // mortarboard
      ctx.beginPath();
      ctx.moveTo(x - 36, y - 8);
      ctx.lineTo(x, y - 24);
      ctx.lineTo(x + 36, y - 8);
      ctx.lineTo(x, y + 6);
      ctx.closePath();
      ctx.fill();
      // tassel
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x + 26, y - 10);
      ctx.lineTo(x + 26, y + 12);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 26, y + 15, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── main loop ──────────────────────────────────────────────────
    function frame(t: number) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016);
      last = t;
      const { ink, paper, muted } = colors();
      const time = t / 1000;

      ctx.clearRect(0, 0, W, H);

      // title + score
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      ctx.font = `24px ${HAND}`;
      ctx.fillStyle = muted;
      ctx.fillText("teach it before it drops", 8, 30);
      ctx.textAlign = "right";
      ctx.font = `22px ${HAND}`;
      ctx.fillStyle = ink;
      ctx.fillText(`${score}`, W - 8, 28);
      ctx.fillStyle = muted;
      const bestLabel = `best ${best}`;
      const sw = ctx.measureText(bestLabel).width;
      ctx.fillText(bestLabel, W - 8, 52);
      void sw;

      // lives
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(18 + i * 18, 50, 5, 0, Math.PI * 2);
        if (i < lives) {
          ctx.fillStyle = ink;
          ctx.fill();
        } else {
          ctx.strokeStyle = muted;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      const capY = H - 34;

      if (phase === "playing") {
        // movement
        const left = keys.has("arrowleft") || keys.has("a");
        const right = keys.has("arrowright") || keys.has("d");
        if (left || right) {
          targetX += ((right ? 1 : 0) - (left ? 1 : 0)) * 460 * dt;
          targetX = Math.min(Math.max(targetX, 40), W - 40);
        }
        capX += (targetX - capX) * Math.min(1, 16 * dt);

        // spawning
        spawnT -= dt;
        if (spawnT <= 0) {
          spawn();
          spawnT = Math.max(0.42, 1.0 - score * 0.004);
        }

        // items
        const kept: Item[] = [];
        for (const it of items) {
          it.y += it.speed * dt;
          const drawX = reduced
            ? it.x
            : it.x + Math.sin(time * 2 + it.sway) * 10;
          const pillH = 34;
          const top = it.y - pillH / 2;
          const caught =
            top + pillH >= capY - 26 &&
            top <= capY + 6 &&
            Math.abs(drawX + it.w / 2 - capX) < 52;
          if (caught) {
            score += 10;
            popups.push({
              x: drawX + it.w / 2,
              y: capY - 40,
              t: 0,
              text: "taught!",
            });
            continue;
          }
          if (top > H + 10) {
            lives -= 1;
            if (lives <= 0) {
              endGame();
              break;
            }
            continue;
          }
          kept.push(it);

          // draw pill
          ctx.fillStyle = ink;
          roundRect(ctx, drawX, top, it.w, pillH, 17);
          ctx.fill();
          ctx.fillStyle = paper;
          ctx.font = `20px ${HAND}`;
          ctx.textAlign = "center";
          ctx.fillText(it.label, drawX + it.w / 2, top + 24);
        }
        items = kept;

        // popups
        const alive: Popup[] = [];
        ctx.textAlign = "center";
        for (const p of popups) {
          p.t += dt;
          if (p.t > 0.8) continue;
          alive.push(p);
          ctx.globalAlpha = 1 - p.t / 0.8;
          ctx.font = `22px ${HAND}`;
          ctx.fillStyle = ink;
          ctx.fillText(p.text, p.x, p.y - p.t * 44);
          ctx.globalAlpha = 1;
        }
        popups = alive;
      } else {
        // idle / over: draw resting items dimmed behind overlay text
        ctx.globalAlpha = 0.35;
        for (const it of items) {
          ctx.fillStyle = ink;
          roundRect(ctx, it.x, it.y - 17, it.w, 34, 17);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        ctx.textAlign = "center";
        if (phase === "idle") {
          ctx.font = `30px ${HAND}`;
          ctx.fillStyle = muted;
          ctx.fillText("space or tap to play", W / 2, H / 2 - 6);
          ctx.font = `20px ${HAND}`;
          ctx.fillText("← → · mouse · touch", W / 2, H / 2 + 26);
        } else {
          ctx.font = `38px ${HAND}`;
          ctx.fillStyle = ink;
          ctx.fillText("confusion won.", W / 2, H / 2 - 34);
          ctx.font = `24px ${HAND}`;
          ctx.fillStyle = muted;
          ctx.fillText(
            `${score} concept${score === 10 ? "" : "s"} taught.`,
            W / 2,
            H / 2 + 2
          );
          if (newBest) {
            ctx.fillStyle = ink;
            ctx.fillText("new best.", W / 2, H / 2 + 32);
          }
          ctx.fillStyle = muted;
          ctx.font = `22px ${HAND}`;
          ctx.fillText("space to run it back", W / 2, H / 2 + (newBest ? 62 : 58));
        }
      }

      drawCap(capX, capY, ink);
    }
    raf = requestAnimationFrame(frame);

    function onVis() {
      last = 0;
    }
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvasEl.removeEventListener("pointermove", onPointerMove);
      canvasEl.removeEventListener("pointerdown", onPointerDown);
      canvasEl.removeEventListener("touchstart", onTouchStart);
      canvasEl.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      <canvas
        ref={canvasRef}
        className="block w-full cursor-pointer touch-none select-none"
        style={{ height: GAME_H }}
        role="img"
        aria-label="Mini game: teach it before it drops. Move the graduation cap to catch falling concept chips."
      />
    </div>
  );
}

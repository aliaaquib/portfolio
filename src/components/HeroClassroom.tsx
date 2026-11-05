import type { Theme } from "./Navbar";

// An animated classroom for the Home hero: Aaquib at the smartboard, code typing itself out,
// a pen annotation, and students listening (one raises a hand). Pure SVG + CSS, loops every 12s.
// Animated parts sit in <g transform="translate(pivot)"> wrappers so CSS rotates them around (0,0).

const palettes = {
  light: {
    wall: "#F4F2EE", ceiling: "#2F7FE0", blinds: "#EADFD3", slat: "#D9C6B4", floor: "#E6E2DC",
    frame: "#2A2C31", screen: "#1F4FBF", shelf: "#FFFFFF", shelfLine: "#DEDBD5",
    suit: "#17181C", suitShade: "#33353C", desk: "#FFFFFF", glow: 0,
  },
  dark: {
    wall: "#1B1C21", ceiling: "#1D3E8C", blinds: "#2B2B31", slat: "#232328", floor: "#131316",
    frame: "#0C0C0E", screen: "#2356D1", shelf: "#2A2B31", shelfLine: "#3A3B42",
    suit: "#2B2D34", suitShade: "#4A4D57", desk: "#2A2B31", glow: 0.35,
  },
};

const skin = "#B57852";
const skinShade = "#9A6141";
const hair = "#16120F";
const shirt = "#F6F8FC";
const shirtLine = "#C9D3E6";
const collar = "#E8ECF3";
const tie = "#232428";

const css = `
.hc text { font-family: Inter, sans-serif; }
.hc .mono { font-family: "Space Mono", ui-monospace, monospace; }
.hc .hand { font-family: Satisfy, cursive; }
@media (prefers-reduced-motion: no-preference) {
  .hc .t1 { transform-origin: 862px 104px; animation: hc-t1 12s steps(14) infinite; }
  .hc .t2 { transform-origin: 862px 124px; animation: hc-t2 12s steps(20) infinite; }
  .hc .out { animation: hc-out 12s infinite; }
  .hc .uline { stroke-dasharray: 1; animation: hc-uline 12s infinite ease-out; }
  .hc .note { transform-origin: 918px 0; animation: hc-note 12s infinite linear; }
  .hc .live { animation: hc-fade 12s infinite; }
  .hc .head { animation: hc-head 4s ease-in-out infinite alternate; }
  .hc .mouth { animation: hc-talk 0.34s ease-in-out infinite alternate; }
  .hc .eyes { animation: hc-blink 5s infinite; }
  .hc .fore-l { animation: hc-gest-l 2.6s ease-in-out infinite; }
  .hc .fore-r { animation: hc-gest-r 3.1s ease-in-out infinite; }
  .hc .raise { animation: hc-raise 12s ease-in-out infinite; }
  .hc .robot { animation: hc-robot 3.6s ease-in-out infinite alternate; }
  .hc .cursor { animation: hc-cursor 0.9s steps(1) infinite; }
}
@keyframes hc-t1 { 0%, 3% { transform: scaleX(0); } 14%, 100% { transform: scaleX(1); } }
@keyframes hc-t2 { 0%, 17% { transform: scaleX(0); } 32%, 100% { transform: scaleX(1); } }
@keyframes hc-out { 0%, 35% { opacity: 0; } 38%, 100% { opacity: 1; } }
@keyframes hc-uline { 0%, 44% { stroke-dashoffset: 1; } 52%, 100% { stroke-dashoffset: 0; } }
@keyframes hc-note { 0%, 53% { transform: scaleX(0); } 66%, 100% { transform: scaleX(1); } }
@keyframes hc-fade { 0%, 90% { opacity: 1; } 96%, 100% { opacity: 0; } }
@keyframes hc-head { from { transform: rotate(-2.5deg); } to { transform: rotate(2deg); } }
@keyframes hc-talk { from { transform: scaleY(1); } to { transform: scaleY(0.35); } }
@keyframes hc-blink { 0%, 46%, 50%, 100% { transform: scaleY(1); } 48% { transform: scaleY(0.1); } }
@keyframes hc-gest-l { 0%, 100% { transform: rotate(0deg); } 35% { transform: rotate(-14deg); } 70% { transform: rotate(6deg); } }
@keyframes hc-gest-r { 0%, 100% { transform: rotate(0deg); } 40% { transform: rotate(10deg); } 75% { transform: rotate(-7deg); } }
@keyframes hc-raise { 0%, 55%, 82%, 100% { transform: rotate(115deg); opacity: 0; } 60%, 77% { transform: rotate(0deg); opacity: 1; } 68% { transform: rotate(-8deg); opacity: 1; } }
@keyframes hc-robot { from { transform: rotate(-12deg); } to { transform: rotate(14deg); } }
@keyframes hc-cursor { 0% { opacity: 1; } 50% { opacity: 0; } }
`;

export default function HeroClassroom({ theme }: { theme: Theme }) {
  const c = palettes[theme];
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className="hc absolute inset-0 w-full h-full"
      role="img"
      aria-label="Illustration: Aaquib teaching an introduction to text-based programming at a smartboard while students listen"
    >
      <style>{css}</style>
      <defs>
        <clipPath id="hc-c1">
          <rect className="t1" x="862" y="104" width="170" height="18" />
        </clipPath>
        <clipPath id="hc-c2">
          <rect className="t2" x="862" y="124" width="170" height="18" />
        </clipPath>
        <clipPath id="hc-c3">
          <rect className="note" x="918" y="206" width="150" height="36" />
        </clipPath>
        <filter id="hc-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* Room */}
      <rect width="1200" height="400" fill={c.wall} />
      <rect width="1200" height="30" fill={c.ceiling} />
      <ellipse cx="320" cy="31" rx="16" ry="4" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="860" cy="31" rx="16" ry="4" fill="#FFFFFF" opacity="0.9" />
      <rect y="372" width="1200" height="28" fill={c.floor} />

      {/* Window blinds */}
      <rect x="140" y="52" width="300" height="250" rx="4" fill={c.blinds} />
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x="140" y={58 + i * 12.2} width="300" height="5" fill={c.slat} />
      ))}
      <line x1="290" y1="52" x2="290" y2="302" stroke={c.slat} strokeWidth="1.5" />

      {/* Shelf with a little robot */}
      <rect x="596" y="196" width="92" height="176" rx="3" fill={c.shelf} stroke={c.shelfLine} strokeWidth="2" />
      <line x1="596" y1="256" x2="688" y2="256" stroke={c.shelfLine} strokeWidth="2" />
      <line x1="596" y1="316" x2="688" y2="316" stroke={c.shelfLine} strokeWidth="2" />
      <rect x="612" y="236" width="10" height="20" rx="1" fill="#E5534B" />
      <rect x="624" y="240" width="9" height="16" rx="1" fill="#2F7FE0" />
      <rect x="635" y="234" width="8" height="22" rx="1" fill="#F0B13B" />
      <rect x="652" y="298" width="26" height="18" rx="2" fill={c.ceiling} opacity="0.8" />
      <g transform="translate(642,196)">
        <rect x="-24" y="-14" width="48" height="10" rx="3" fill="#3A3D44" />
        <circle cx="-15" cy="-3" r="5" fill="#1E1F23" />
        <circle cx="15" cy="-3" r="5" fill="#1E1F23" />
        <circle cx="0" cy="-3" r="5" fill="#1E1F23" />
        <g transform="translate(-8,-14)">
          <g className="robot">
            <polyline points="0,0 0,-20 18,-28" fill="none" stroke="#C9CCD2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18,-28 l7,-4 M18,-28 l7,3" stroke="#E5534B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* Smartboard */}
      <g transform="translate(-10,0)">
        {c.glow > 0 && (
          <rect x="700" y="70" width="380" height="266" rx="12" fill={c.screen} opacity={c.glow} filter="url(#hc-blur)" />
        )}
        <path d="M760,336 C752,362 772,378 760,400" fill="none" stroke={c.frame} strokeWidth="2" />
        <path d="M1040,336 C1050,356 1034,380 1046,400" fill="none" stroke={c.frame} strokeWidth="2" />
        <rect x="700" y="70" width="380" height="266" rx="10" fill={c.frame} />
        <rect x="710" y="80" width="360" height="246" rx="4" fill={c.screen} />
        <polygon points="960,80 1012,80 884,326 832,326" fill="#FFFFFF" opacity="0.05" />

        {/* Code card */}
        <rect x="852" y="92" width="206" height="80" rx="8" fill="#FFFFFF" opacity="0.12" />
        <g className="live">
          <text className="mono" x="864" y="117" fontSize="12" fill="#FFFFFF" clipPath="url(#hc-c1)">
            name = "Aida"
          </text>
          <text className="mono" x="864" y="137" fontSize="12" fill="#FFFFFF" clipPath="url(#hc-c2)">
            print("Hello", name)
          </text>
          <g className="out">
            <text className="mono" x="864" y="160" fontSize="12" fill="#7CF5A8">
              ▸ Hello Aida
            </text>
            <rect className="cursor" x="958" y="150" width="7" height="12" fill="#7CF5A8" />
          </g>
        </g>

        {/* Slide */}
        <text x="728" y="202" fontSize="8.5" fontWeight="600" letterSpacing="1.2" fill="#FFFFFF" opacity="0.7">
          COMPUTER SCIENCE · GRADE 8
        </text>
        <text x="728" y="232" fontSize="24" fontWeight="700" fill="#FFFFFF">
          Introduction to
        </text>
        <text x="728" y="262" fontSize="24" fontWeight="700" fill="#FFFFFF">
          text-based programming
        </text>
        <text x="728" y="286" fontSize="10.5" fill="#FFFFFF" opacity="0.85">
          Введение в текстовое программирование
        </text>
        <text x="728" y="306" fontSize="8.5" fill="#FFFFFF" opacity="0.7">
          Python · Flowchart · Pseudocode · Variables
        </text>

        {/* Pen annotations */}
        <g className="live">
          <path
            className="uline"
            pathLength={1}
            d="M727,270 C770,277 812,266 858,272"
            fill="none"
            stroke="#FF4D4D"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <g clipPath="url(#hc-c3)">
            <text className="hand" x="920" y="232" fontSize="21" fill="#FF4D4D">
              ① block based
            </text>
          </g>
        </g>
      </g>

      {/* Desk and laptop, left */}
      <rect x="120" y="352" width="230" height="8" rx="2" fill={c.desk} stroke={c.shelfLine} strokeWidth="1.5" />
      <rect x="196" y="300" width="84" height="52" rx="3" fill="#2B2D33" />
      <rect x="200" y="304" width="76" height="44" rx="1.5" fill="#1F4FBF" />
      <rect x="206" y="314" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="206" y="322" width="56" height="4" rx="2" fill="#FFFFFF" opacity="0.5" />
      <polygon points="186,352 290,352 296,357 180,357" fill="#C9CCD2" />

      {/* Teacher: Aaquib in a black suit, white checked shirt, dark tie and pocket square */}
      <ellipse cx="510" cy="398" rx="80" ry="8" fill="#000000" opacity="0.06" />
      <rect x="501" y="168" width="18" height="28" fill={skinShade} />
      <path d="M452,212 C458,198 478,192 494,192 L510,252 L526,192 C542,192 562,198 568,212 L580,400 L440,400 Z" fill={c.suit} />
      <polygon points="494,192 526,192 510,252" fill={shirt} />
      <path d="M498,200 L522,200 M500,212 L520,212 M503,224 L517,224 M506,236 L514,236 M504,196 L509,246 M516,196 L511,246" stroke={shirtLine} strokeWidth="0.7" />
      <polygon points="494,192 503,190 507,205" fill={collar} />
      <polygon points="526,192 517,190 513,205" fill={collar} />
      <polygon points="506,195 514,195 513,204 507,204" fill={tie} />
      <polygon points="507,204 513,204 517,246 510,256 503,246" fill={tie} />
      <path d="M507,214 h0.01 M512,222 h0.01 M508,232 h0.01 M513,240 h0.01" stroke="#55565C" strokeWidth="1.6" strokeLinecap="round" />
      {/* Peak lapels */}
      <path d="M494,192 L484,216 L494,222 L510,252" fill="none" stroke={c.suitShade} strokeWidth="2" strokeLinejoin="round" />
      <path d="M526,192 L536,216 L526,222 L510,252" fill="none" stroke={c.suitShade} strokeWidth="2" strokeLinejoin="round" />
      <polygon points="536,240 556,236 556,239.5 536,243" fill="#FFFFFF" />
      <path d="M534,244 L558,240" stroke={c.suitShade} strokeWidth="1.5" />
      <path d="M510,252 L510,400" stroke={c.suitShade} strokeWidth="1.5" />
      <circle cx="510" cy="312" r="3" fill={c.suitShade} />

      {/* Arms: upper arms fixed, forearms gesture from the elbow */}
      <line x1="458" y1="214" x2="446" y2="292" stroke={c.suitShade} strokeWidth="26" strokeLinecap="round" />
      <line x1="458" y1="214" x2="446" y2="292" stroke={c.suit} strokeWidth="23" strokeLinecap="round" />
      <g transform="translate(446,292)">
        <g className="fore-l">
          <line x1="0" y1="0" x2="-12" y2="-50" stroke={c.suitShade} strokeWidth="23" strokeLinecap="round" />
          <line x1="0" y1="0" x2="-12" y2="-50" stroke={c.suit} strokeWidth="20" strokeLinecap="round" />
          <circle cx="-13" cy="-55" r="7.5" fill={collar} />
          <ellipse cx="-15" cy="-64" rx="9" ry="11" fill={skin} />
          <path d="M-22,-72 q2,-7 6,-2 M-16,-75 q3,-7 6,-1 M-10,-73 q4,-5 6,1" stroke={skinShade} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      </g>
      <line x1="562" y1="214" x2="574" y2="292" stroke={c.suitShade} strokeWidth="26" strokeLinecap="round" />
      <line x1="562" y1="214" x2="574" y2="292" stroke={c.suit} strokeWidth="23" strokeLinecap="round" />
      <g transform="translate(574,292)">
        <g className="fore-r">
          <line x1="0" y1="0" x2="30" y2="-44" stroke={c.suitShade} strokeWidth="23" strokeLinecap="round" />
          <line x1="0" y1="0" x2="30" y2="-44" stroke={c.suit} strokeWidth="20" strokeLinecap="round" />
          <circle cx="32" cy="-48" r="7.5" fill={collar} />
          <line x1="38" y1="-56" x2="58" y2="-74" stroke="#222" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="37" cy="-56" rx="10" ry="9" fill={skin} />
        </g>
      </g>

      {/* Head, pivoting on the neck: larger head, short trimmed beard and a smile keep him young */}
      <g transform="translate(510,184) scale(1.16)">
        <g className="head">
          <ellipse cx="-22" cy="-31" rx="4.5" ry="7" fill={skinShade} />
          <ellipse cx="22" cy="-31" rx="4.5" ry="7" fill={skinShade} />
          <ellipse cx="0" cy="-32" rx="22.5" ry="27" fill={skin} />
          {/* Fade: a soft shadow on the sides, textured hair on top */}
          <path d="M-22.5,-34 C-23,-50 -15,-60 0,-60 C15,-60 23,-50 22.5,-34 C21,-42 18,-48 14,-50 L-14,-50 C-18,-48 -21,-42 -22.5,-34 Z" fill={hair} opacity="0.18" />
          <path d="M-21,-46 C-23,-62 -12,-73 3,-73 C10,-75 22,-68 21,-46 C18,-52 13,-55 8,-54 C2,-58 -12,-56 -21,-46 Z" fill={hair} />
          {/* Short jawline beard: stays clear of the mouth */}
          <path d="M-22.5,-27 C-22,-13 -12,-3 0,-3 C12,-3 22,-13 22.5,-27 C20,-20 15,-9 9,-7 Q0,-5 -9,-7 C-15,-9 -20,-20 -22.5,-27 Z" fill={hair} opacity="0.88" />
          <path d="M-13,-41.5 Q-8,-44 -3.5,-42 M3.5,-42 Q8,-44 13,-41.5" stroke={hair} strokeWidth="2.3" fill="none" strokeLinecap="round" />
          <g transform="translate(0,-34)">
            <g className="eyes">
              <ellipse cx="-8.5" cy="0" rx="3.8" ry="3.4" fill="#FFFFFF" />
              <ellipse cx="8.5" cy="0" rx="3.8" ry="3.4" fill="#FFFFFF" />
              <circle cx="-8" cy="0.3" r="2.5" fill={hair} />
              <circle cx="9" cy="0.3" r="2.5" fill={hair} />
              <circle cx="-7.2" cy="-0.6" r="0.8" fill="#FFFFFF" />
              <circle cx="9.8" cy="-0.6" r="0.8" fill="#FFFFFF" />
            </g>
          </g>
          <path d="M0,-28 Q2.2,-24 -0.5,-23" stroke={skinShade} strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M-7,-17.5 Q0,-20 7,-17.5 Q0,-16.6 -7,-17.5 Z" fill={hair} />
          <g transform="translate(0,-13)">
            <path className="mouth" d="M-6.5,-1 Q0,0 6.5,-1 Q0,6.5 -6.5,-1 Z" fill="#FFFFFF" stroke="#7A3B30" strokeWidth="1" strokeLinejoin="round" />
          </g>
        </g>
      </g>

      {/* Students, seen from behind */}
      <path d="M262,400 C262,366 342,366 342,400 Z" fill="#F0B13B" />
      <g transform="translate(330,372)">
        <g className="raise">
          <line x1="0" y1="0" x2="10" y2="-70" stroke="#E2A02C" strokeWidth="15" strokeLinecap="round" />
          <circle cx="11" cy="-77" r="8" fill={skin} />
        </g>
      </g>
      <ellipse cx="327" cy="344" rx="4" ry="7" fill={skin} />
      <circle cx="302" cy="340" r="27" fill="#2A211C" />

      <path d="M556,400 C562,382 718,382 724,400 Z" fill="#3D5A80" />
      <ellipse cx="684" cy="392" rx="6" ry="10" fill={skin} />
      <circle cx="640" cy="390" r="44" fill={hair} />
    </svg>
  );
}

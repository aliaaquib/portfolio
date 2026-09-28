const INK = "#1A202C";
const MUTED = "#4A5568";
const BLUE = "#2B6CB0";
const GREEN = "#2F855A";
const PURPLE = "#6B46C1";
const ORANGE = "#DD6B20";
const RED = "#E53E3E";
const HAND = "'Caveat', cursive";

function Bullets({
  x,
  y,
  lines,
  size = 15,
  color = INK,
  gap = 23,
}: {
  x: number;
  y: number;
  lines: string[];
  size?: number;
  color?: string;
  gap?: number;
}) {
  return (
    <g fontFamily={HAND} fontSize={size} fill={color}>
      {lines.map((line, i) => (
        <text key={line} x={x} y={y + i * gap}>
          {`- ${line}`}
        </text>
      ))}
    </g>
  );
}

function SectionTitle({
  x,
  y,
  color,
  num,
  title,
  sub,
}: {
  x: number;
  y: number;
  color: string;
  num: string;
  title: string;
  sub: string;
}) {
  return (
    <g fontFamily={HAND}>
      <text x={x} y={y} fontSize={19} fill={color} fontWeight="bold">
        {num}. {title}
      </text>
      <text x={x} y={y + 24} fontSize={17} fill={MUTED}>
        {sub}
      </text>
    </g>
  );
}

/**
 * Dense hand-drawn architecture poster for the Academy pipeline —
 * after the 101xanshu.com/tinkering diagram language: dashed colored
 * sections, numbered headings, handwritten labels, thin arrows.
 */
export function AcademyPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 1200 780"
      role="img"
      aria-label="Hand-drawn diagram of the Thread Academy content pipeline"
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="ah-academy"
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
        >
          <path
            d="M0.5,0.5 L8,4.5 L0.5,8.5"
            fill="none"
            stroke={MUTED}
            strokeWidth="1.6"
          />
        </marker>
      </defs>

      {/* Title */}
      <text
        x={600}
        y={54}
        textAnchor="middle"
        fontFamily={HAND}
        fontSize={44}
        fill={INK}
      >
        Thread Academy Content Pipeline
      </text>
      <text
        x={600}
        y={92}
        textAnchor="middle"
        fontFamily={HAND}
        fontSize={22}
        fill={MUTED}
      >
        Single-source · Curriculum-aware · Static-first · Zero-backend
      </text>

      {/* Scale box */}
      <rect
        x={948}
        y={108}
        width={228}
        height={122}
        rx={12}
        fill="none"
        stroke={PURPLE}
        strokeWidth={2}
        strokeDasharray="8 6"
      />
      <text
        x={1062}
        y={134}
        textAnchor="middle"
        fontFamily={HAND}
        fontSize={14}
        fill={PURPLE}
        fontWeight="bold"
      >
        CONTENT SCALE (Target)
      </text>
      <Bullets
        x={968}
        y={158}
        size={15}
        lines={["3 curricula", "13 subjects", "One chapter library", "Zero servers"]}
      />

      {/* ── Section 1 · Curriculum shapes ─────────────────────────── */}
      <rect
        x={20}
        y={248}
        width={260}
        height={352}
        rx={14}
        fill="none"
        stroke={BLUE}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <SectionTitle x={40} y={280} color={BLUE} num="1" title="CURRICULUM SHAPES" sub="The Maps" />

      <rect x={40} y={316} width={220} height={72} rx={10} fill="none" stroke={BLUE} strokeWidth={1.6} />
      <text x={150} y={340} textAnchor="middle" fontFamily={HAND} fontSize={17} fill={BLUE} fontWeight="bold">Cambridge</text>
      <Bullets x={58} y={362} size={14} gap={21} lines={["IGCSE, A-Level", "Own level order"]} />

      <rect x={40} y={398} width={220} height={72} rx={10} fill="none" stroke={BLUE} strokeWidth={1.6} />
      <text x={150} y={422} textAnchor="middle" fontFamily={HAND} fontSize={17} fill={BLUE} fontWeight="bold">American</text>
      <Bullets x={58} y={444} size={14} gap={21} lines={["K-12 grades", "Own level order"]} />

      <rect x={40} y={480} width={220} height={72} rx={10} fill="none" stroke={BLUE} strokeWidth={1.6} />
      <text x={150} y={504} textAnchor="middle" fontFamily={HAND} fontSize={17} fill={BLUE} fontWeight="bold">IB</text>
      <Bullets x={58} y={526} size={14} gap={21} lines={["MYP, DP", "Own level order"]} />

      <text x={150} y={580} textAnchor="middle" fontFamily={HAND} fontSize={15} fill={BLUE}>
        Three maps, one library
      </text>

      {/* ── Section 2 · Chapter library ───────────────────────────── */}
      <rect
        x={340}
        y={248}
        width={300}
        height={352}
        rx={14}
        fill="none"
        stroke={GREEN}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <SectionTitle x={360} y={280} color={GREEN} num="2" title="CHAPTER LIBRARY" sub="Single Source of Truth" />

      <rect x={360} y={316} width={260} height={118} rx={10} fill="none" stroke={GREEN} strokeWidth={1.6} />
      <text x={490} y={342} textAnchor="middle" fontFamily={HAND} fontSize={17} fill={GREEN} fontWeight="bold">MDX CHAPTERS</text>
      <Bullets
        x={378}
        y={368}
        size={14.5}
        gap={23}
        lines={["Prose + components", "content/chapters/<subject>/", "Written once, used 3×"]}
      />

      <rect
        x={360}
        y={450}
        width={260}
        height={66}
        rx={10}
        fill="none"
        stroke={RED}
        strokeWidth={1.8}
        strokeDasharray="7 5"
      />
      <text x={490} y={477} textAnchor="middle" fontFamily={HAND} fontSize={16} fill={RED} fontWeight="bold">
        NO CMS · NO DATABASE
      </text>
      <text x={490} y={500} textAnchor="middle" fontFamily={HAND} fontSize={14} fill={RED}>
        files are the source of truth
      </text>

      <text x={490} y={580} textAnchor="middle" fontFamily={HAND} fontSize={15} fill={GREEN}>
        Fix once, fixed everywhere
      </text>

      {/* ── Section 3 · Build ─────────────────────────────────────── */}
      <rect
        x={700}
        y={248}
        width={220}
        height={352}
        rx={14}
        fill="none"
        stroke={PURPLE}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <SectionTitle x={720} y={280} color={PURPLE} num="3" title="BUILD" sub="The Press" />

      <rect x={718} y={316} width={184} height={132} rx={10} fill="none" stroke={PURPLE} strokeWidth={1.6} />
      <text x={810} y={342} textAnchor="middle" fontFamily={HAND} fontSize={16} fill={PURPLE} fontWeight="bold">STATIC EXPORT</text>
      <Bullets
        x={734}
        y={368}
        size={14}
        gap={23}
        lines={["Pre-renders all pages", "Build-time only", "No runtime server"]}
      />

      <text x={810} y={580} textAnchor="middle" fontFamily={HAND} fontSize={15} fill={PURPLE}>
        The files are the site
      </text>

      {/* ── Section 4 · Served pages ──────────────────────────────── */}
      <rect
        x={980}
        y={248}
        width={200}
        height={352}
        rx={14}
        fill="none"
        stroke={ORANGE}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <SectionTitle x={998} y={280} color={ORANGE} num="4" title="PAGES" sub="The Output" />

      <rect x={996} y={316} width={168} height={132} rx={10} fill="none" stroke={ORANGE} strokeWidth={1.6} />
      <text x={1080} y={342} textAnchor="middle" fontFamily={HAND} fontSize={16} fill={ORANGE} fontWeight="bold">STATIC PAGES</text>
      <Bullets
        x={1010}
        y={368}
        size={14}
        gap={23}
        lines={["Thousands of pages", "CDN-cached", "Costs ~nothing"]}
      />

      <text x={1080} y={580} textAnchor="middle" fontFamily={HAND} fontSize={14} fill={ORANGE}>
        Fast on weak connections
      </text>

      {/* Arrows between sections */}
      <g fontFamily={HAND} fontSize={13} fill={MUTED} textAnchor="middle">
        <line x1={282} y1={430} x2={338} y2={430} stroke={MUTED} strokeWidth={2} markerEnd="url(#ah-academy)" />
        <text x={310} y={412}>levels pick</text>
        <text x={310} y={426}>chapters</text>

        <line x1={642} y1={430} x2={698} y2={430} stroke={MUTED} strokeWidth={2} markerEnd="url(#ah-academy)" />
        <text x={670} y={414}>mdx in</text>

        <line x1={922} y1={430} x2={978} y2={430} stroke={MUTED} strokeWidth={2} markerEnd="url(#ah-academy)" />
        <text x={950} y={414}>html out</text>
      </g>

      {/* Bottom strip · editorial principles */}
      <rect
        x={20}
        y={632}
        width={1160}
        height={112}
        rx={14}
        fill="none"
        stroke={PURPLE}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <text x={52} y={662} fontFamily={HAND} fontSize={17} fill={PURPLE} fontWeight="bold">
        5. EDITORIAL PRINCIPLES (CROSS-CUTTING)
      </text>
      <g fontFamily={HAND} fontSize={16} fill={INK}>
        <text x={52} y={700}>- Plain language first</text>
        <text x={340} y={700}>- One idea per chapter</text>
        <text x={640} y={700}>- Teach, don&apos;t lecture</text>
        <text x={920} y={700}>- Human voice, no hype</text>
      </g>
    </svg>
  );
}

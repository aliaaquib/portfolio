const INK = "#1A202C";
const MUTED = "#4A5568";
const BLUE = "#2B6CB0";
const GREEN = "#2F855A";
const PURPLE = "#6B46C1";
const ORANGE = "#DD6B20";
const RED = "#E53E3E";
const HAND = "'Ms Madi', 'Segoe Script', cursive";

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
      {lines.map((line) => (
        <text key={line} x={x} y={y + lines.indexOf(line) * gap}>
          {`- ${line}`}
        </text>
      ))}
    </g>
  );
}

/**
 * Dense hand-drawn architecture poster for the Clario briefing format —
 * same whiteboard language as the Academy pipeline diagram.
 */
export function ClarioBriefingDiagram() {
  const skeletonBoxes = [
    { title: "SUMMARY", lines: ["One paragraph", "Answers directly", "10-second read"] },
    { title: "KEY POINTS", lines: ["Scannable", "For skimmers", "Bullets only"] },
    { title: "IN DEPTH", lines: ["Full treatment", "For those who stay", "Detail lives here"] },
    { title: "SOURCES", lines: ["Every claim", "Checkable", "Always last"] },
  ];

  return (
    <svg
      viewBox="0 0 1200 740"
      role="img"
      aria-label="Hand-drawn diagram of the Clario briefing format"
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="ah-clario"
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
        Clario Briefing Format
      </text>
      <text
        x={600}
        y={92}
        textAnchor="middle"
        fontFamily={HAND}
        fontSize={22}
        fill={MUTED}
      >
        Rough in · Structured out · Same skeleton every time
      </text>

      {/* Rules box */}
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
        FORMAT RULES
      </text>
      <Bullets
        x={968}
        y={158}
        size={15}
        lines={["Summary first", "Sources always last", "Fixed order, no exceptions"]}
      />

      {/* ── Section 1 · Intake ────────────────────────────────────── */}
      <rect
        x={20}
        y={248}
        width={240}
        height={352}
        rx={14}
        fill="none"
        stroke={BLUE}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <text x={40} y={280} fontFamily={HAND} fontSize={19} fill={BLUE} fontWeight="bold">
        1. INTAKE
      </text>
      <text x={40} y={304} fontFamily={HAND} fontSize={17} fill={MUTED}>
        The Mess
      </text>

      <rect x={40} y={322} width={200} height={128} rx={10} fill="none" stroke={BLUE} strokeWidth={1.6} />
      <text x={140} y={348} textAnchor="middle" fontFamily={HAND} fontSize={16} fill={BLUE} fontWeight="bold">
        ROUGH QUESTION
      </text>
      <Bullets x={56} y={374} size={14.5} gap={23} lines={["Half-formed", "Missing context", "Asked mid-thought"]} />

      <text x={140} y={580} textAnchor="middle" fontFamily={HAND} fontSize={15} fill={BLUE}>
        Mess in, shape out
      </text>

      {/* ── Section 2 · The skeleton ──────────────────────────────── */}
      <rect
        x={320}
        y={248}
        width={560}
        height={352}
        rx={14}
        fill="none"
        stroke={GREEN}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <text x={344} y={280} fontFamily={HAND} fontSize={19} fill={GREEN} fontWeight="bold">
        2. THE SKELETON
      </text>
      <text x={344} y={304} fontFamily={HAND} fontSize={17} fill={MUTED}>
        Fixed Shape, Every Time
      </text>

      {skeletonBoxes.map((box, i) => {
        const bx = 340 + i * 134;
        return (
          <g key={box.title}>
            <rect
              x={bx}
              y={322}
              width={122}
              height={140}
              rx={10}
              fill="none"
              stroke={GREEN}
              strokeWidth={1.6}
            />
            <text
              x={bx + 61}
              y={348}
              textAnchor="middle"
              fontFamily={HAND}
              fontSize={14.5}
              fill={GREEN}
              fontWeight="bold"
            >
              {box.title}
            </text>
            <Bullets x={bx + 12} y={372} size={13.5} gap={22} lines={box.lines} />
          </g>
        );
      })}

      <rect
        x={340}
        y={478}
        width={520}
        height={58}
        rx={10}
        fill="none"
        stroke={RED}
        strokeWidth={1.8}
        strokeDasharray="7 5"
      />
      <text
        x={600}
        y={513}
        textAnchor="middle"
        fontFamily={HAND}
        fontSize={16}
        fill={RED}
        fontWeight="bold"
      >
        NO FREE-FORM LAYOUTS — the order never changes
      </text>

      <text x={600} y={580} textAnchor="middle" fontFamily={HAND} fontSize={15} fill={GREEN}>
        Same order every time
      </text>

      {/* ── Section 3 · Briefing ──────────────────────────────────── */}
      <rect
        x={940}
        y={248}
        width={240}
        height={352}
        rx={14}
        fill="none"
        stroke={ORANGE}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <text x={960} y={280} fontFamily={HAND} fontSize={19} fill={ORANGE} fontWeight="bold">
        3. BRIEFING
      </text>
      <text x={960} y={304} fontFamily={HAND} fontSize={17} fill={MUTED}>
        The Output
      </text>

      <rect x={960} y={322} width={200} height={140} rx={10} fill="none" stroke={ORANGE} strokeWidth={1.6} />
      <text x={1060} y={348} textAnchor="middle" fontFamily={HAND} fontSize={16} fill={ORANGE} fontWeight="bold">
        SCANNABLE
      </text>
      <Bullets
        x={976}
        y={374}
        size={14.5}
        gap={23}
        lines={["Answer in 10 seconds", "Skim or dive deep", "Nothing to re-learn"]}
      />

      <text x={1060} y={580} textAnchor="middle" fontFamily={HAND} fontSize={14} fill={ORANGE}>
        Reading becomes habit
      </text>

      {/* Arrows between sections */}
      <g fontFamily={HAND} fontSize={13} fill={MUTED} textAnchor="middle">
        <line x1={262} y1={430} x2={318} y2={430} stroke={MUTED} strokeWidth={2} markerEnd="url(#ah-clario)" />
        <text x={290} y={412}>give it</text>
        <text x={290} y={426}>shape</text>

        <line x1={882} y1={430} x2={938} y2={430} stroke={MUTED} strokeWidth={2} markerEnd="url(#ah-clario)" />
        <text x={910} y={412}>briefing</text>
        <text x={910} y={426}>out</text>
      </g>

      {/* Bottom strip · reading principles */}
      <rect
        x={20}
        y={628}
        width={1160}
        height={88}
        rx={14}
        fill="none"
        stroke={PURPLE}
        strokeWidth={2}
        strokeDasharray="9 7"
      />
      <text x={52} y={658} fontFamily={HAND} fontSize={17} fill={PURPLE} fontWeight="bold">
        4. READING PRINCIPLES (CROSS-CUTTING)
      </text>
      <g fontFamily={HAND} fontSize={16} fill={INK}>
        <text x={52} y={694}>- Answer first, context after</text>
        <text x={380} y={694}>- Skimmable before deep</text>
        <text x={680} y={694}>- Checkable always</text>
        <text x={950} y={694}>- No filler</text>
      </g>
    </svg>
  );
}

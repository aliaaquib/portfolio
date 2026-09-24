type PillTone = "dark" | "coral" | "blue" | "green";

type PillProps = {
  children: React.ReactNode;
  href?: string;
  title?: string;
  tone?: PillTone;
  /** Hover tooltip card rendered above the pill (reference-style tool pill). */
  tooltip?: React.ReactNode;
  /** Reference-style: plain text with a dotted underline instead of a bordered pill. */
  dotted?: boolean;
};

const TONES: Record<PillTone, string> = {
  dark: "border-strong/60 text-strong",
  coral: "border-[#e0632f]/70 text-[#c14e22]",
  blue: "border-[#2f6fd0]/60 text-[#2f6fd0]",
  green: "border-[#2e7d46]/60 text-[#2e7d46]",
};

export function Pill({ children, href, title, tone = "dark", tooltip, dotted = false }: PillProps) {
  const className = dotted
    ? "group/pill relative inline align-baseline underline decoration-dotted decoration-strong/40 underline-offset-4 transition hover:decoration-strong/80"
    : `group/pill relative mx-0.5 inline-flex -translate-y-px items-center rounded-full border bg-white px-2.5 py-px align-baseline text-[0.8em] font-medium transition hover:shadow-[0_1px_6px_rgba(17,17,17,0.12)] ${TONES[tone]}`;

  const tip = tooltip ? (
    <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 w-60 -translate-x-1/2 rounded-xl border border-strong/10 bg-white px-4 py-3 text-left font-sans text-[13px] font-normal normal-case leading-6 text-text opacity-0 shadow-[0_12px_32px_rgba(17,17,17,0.16)] transition-all duration-200 group-hover/pill:-translate-y-0.5 group-hover/pill:opacity-100">
      {tooltip}
    </span>
  ) : null;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        title={title}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={className}
      >
        {tip}
        {children}
      </a>
    );
  }

  if (tooltip) {
    return (
      <button type="button" className={`${className} cursor-default`} title={title}>
        {tip}
        {children}
      </button>
    );
  }

  return (
    <span className={className} title={title}>
      {children}
    </span>
  );
}

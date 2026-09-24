"use client";

import { useState } from "react";
import data from "@/lib/contributions.json";

const COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Day = { date: string; level: number; count: number };

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function ordinal(d: number) {
  if (d >= 11 && d <= 13) return `${d}th`;
  switch (d % 10) {
    case 1:
      return `${d}st`;
    case 2:
      return `${d}nd`;
    case 3:
      return `${d}rd`;
    default:
      return `${d}th`;
  }
}

export function GitHubHeatmap() {
  const weeks = data.weeks as Day[][];
  const [selected, setSelected] = useState<Day | null>(null);

  // Month label appears above the first week column where a new month starts.
  const labels: { index: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const month = Number(week[0].date.split("-")[1]);
    if (month !== lastMonth) {
      labels.push({ index: i, label: MONTHS[month - 1] });
      lastMonth = month;
    }
  });

  const selectedDay = selected ? Number(selected.date.split("-")[2]) : 0;
  const selectedMonth = selected ? MONTHS[Number(selected.date.split("-")[1]) - 1] : "";

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-block min-w-full">
        <div className="relative">
          <div className="relative mb-1 h-4 text-[11px] text-muted">
            {labels.map((l) => (
              <span key={l.index} className="absolute" style={{ left: l.index * 13 }}>
                {l.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => {
                  const isSelected = selected?.date === day.date;
                  return (
                    <button
                      key={day.date}
                      type="button"
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                      aria-label={`${day.count} contributions on ${formatDate(day.date)}`}
                      aria-pressed={isSelected}
                      onClick={() => setSelected(isSelected ? null : day)}
                      className={`h-[10px] w-[10px] rounded-[2px] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0632f] focus-visible:ring-offset-1 ${
                        isSelected ? "scale-[1.6] ring-1 ring-strong/60" : "hover:scale-[1.35]"
                      }`}
                      style={{ backgroundColor: COLORS[day.level] ?? COLORS[0] }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex min-h-[20px] items-center justify-between gap-4 text-xs text-muted">
          <span aria-live="polite">
            {selected
              ? `${selected.date}: ${selected.count} contribution${selected.count === 1 ? "" : "s"} on ${selectedMonth} ${ordinal(selectedDay)}.`
              : "Select a day to explore"}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1">
            Less
            {COLORS.map((c) => (
              <span key={c} className="h-[10px] w-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            More
          </span>
        </div>
      </div>
    </div>
  );
}

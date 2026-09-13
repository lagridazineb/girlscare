import { TOTAL_WEEK_BLOCKS, dayRangeForWeek } from "./dayUtils";

// Each entry: { key, kind } where kind determines which component renders it.
// kind: cover | welcome | intro | toc | quiz | pledge | day | gratitude | quran | review | challenge | adhkar | letter | final | closing
export function buildPageList() {
  const list = [];
  list.push({ key: "cover", kind: "cover" });
  list.push({ key: "welcome", kind: "welcome" });
  list.push({ key: "intro", kind: "intro" });
  list.push({ key: "toc", kind: "toc" });
  list.push({ key: "quiz", kind: "quiz" });
  list.push({ key: "pledge", kind: "pledge" });

  for (let week = 1; week <= TOTAL_WEEK_BLOCKS; week++) {
    const { start, end } = dayRangeForWeek(week);
    for (let day = start; day <= end; day++) {
      list.push({ key: `day-${day}`, kind: "day", day });
      list.push({ key: `gratitude-${day}`, kind: "gratitude", day });
    }
    list.push({ key: `quran-${week}`, kind: "quran", week });
    list.push({ key: `review-${week}`, kind: "review", week });
    if (week <= 9) {
      list.push({ key: `challenge-${week}`, kind: "challenge", week });
    }
  }

  list.push({ key: "adhkar", kind: "adhkar" });
  list.push({ key: "letter", kind: "letter" });
  list.push({ key: "final", kind: "final" });
  list.push({ key: "closing", kind: "closing" });

  return list;
}

// Find the flat page index for a given day's tracker page (used for "go to today")
export function pageIndexForDay(day) {
  const list = buildPageList();
  const idx = list.findIndex((p) => p.kind === "day" && p.day === day);
  return idx === -1 ? 0 : idx;
}

export function pageIndexForKind(kind, extra = {}) {
  const list = buildPageList();
  const idx = list.findIndex((p) => p.kind === kind && (extra.day ? p.day === extra.day : extra.week ? p.week === extra.week : true));
  return idx === -1 ? 0 : idx;
}

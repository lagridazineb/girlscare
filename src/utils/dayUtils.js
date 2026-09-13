import { TOTAL_DAYS } from "../store/useAppStore";

export const DAYS_PER_WEEK = 7;
export const FULL_WEEKS = Math.floor(TOTAL_DAYS / DAYS_PER_WEEK); // 9
export const REMAINDER_DAYS = TOTAL_DAYS % DAYS_PER_WEEK; // 3
export const TOTAL_WEEK_BLOCKS = FULL_WEEKS + (REMAINDER_DAYS > 0 ? 1 : 0); // 10

export function weekOfDay(day) {
  return Math.ceil(day / DAYS_PER_WEEK);
}

export function daysInWeek(week) {
  if (week < FULL_WEEKS + 1) return DAYS_PER_WEEK;
  return REMAINDER_DAYS || DAYS_PER_WEEK;
}

export function dayRangeForWeek(week) {
  const start = (week - 1) * DAYS_PER_WEEK + 1;
  const end = Math.min(TOTAL_DAYS, start + daysInWeek(week) - 1);
  return { start, end };
}

export function formatDateDMY(iso) {
  if (!iso) return "___ / ___ / ___";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")} / ${String(d.getMonth() + 1).padStart(2, "0")} / ${d.getFullYear()}`;
}

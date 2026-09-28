import { useParams, Navigate } from "react-router-dom";
import FocusPageShell from "../components/book/FocusPageShell";
import DailyTrackerPage from "../components/book/pages/DailyTrackerPage";
import { TOTAL_DAYS } from "../store/useAppStore";
import { dayOrdinalAr } from "../data/dailyChecklist";

export default function DayFocusPage() {
  const { day } = useParams();
  const dayNum = Number(day);

  if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > TOTAL_DAYS) {
    return <Navigate to="/" replace />;
  }

  return (
    <FocusPageShell label={`اليوم ${dayOrdinalAr(dayNum)} من كتابك`}>
      <DailyTrackerPage day={dayNum} />
    </FocusPageShell>
  );
}

import { useNavigate } from "react-router-dom";
import ProgressBar from "../common/ProgressBar";
import Card from "../common/Card";
import { useAppStore, TOTAL_DAYS } from "../../store/useAppStore";

export default function ProgressCard() {
  const navigate = useNavigate();
  const days = useAppStore((s) => s.days);
  const currentDay = useAppStore((s) => s.currentDay);

  const completedDays = Object.values(days).filter((d) => d.completed).length;
  const percent = Math.round((completedDays / TOTAL_DAYS) * 100);
  let streak = 0;
  for (let d = currentDay; d >= 1; d--) {
    if (days[d]?.completed) streak++;
    else break;
  }

  return (
    <Card className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-bold text-rose-700 text-sm">تقدمي في التحدي</p>
        <button onClick={() => navigate("/progress")} className="text-[11px] text-rose-500 font-bold">
          التفاصيل ←
        </button>
      </div>
      <div className="flex items-end justify-between mb-2">
        <p className="font-display text-3xl text-rose-700">
          {completedDays} <span className="text-base text-ink-700/50">/ {TOTAL_DAYS}</span>
        </p>
        {streak > 0 && (
          <span className="flex items-center gap-1 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-full px-2.5 py-1">
            🔥 {streak} أيام متتالية
          </span>
        )}
      </div>
      <ProgressBar percent={percent} />
      <p className="text-[11px] text-ink-700/60 mt-1.5">{percent}% مكتمل من رحلتك</p>
    </Card>
  );
}

import { useNavigate } from "react-router-dom";
import { useAppStore, TOTAL_DAYS } from "../store/useAppStore";
import Card from "../components/common/Card";
import ProgressBar from "../components/common/ProgressBar";
import { pageIndexForDay } from "../utils/bookPages";
import { dayOrdinalAr } from "../data/dailyChecklist";

export default function ProgressPage() {
  const navigate = useNavigate();
  const days = useAppStore((s) => s.days);
  const currentDay = useAppStore((s) => s.currentDay);
  const setBookTargetPage = useAppStore((s) => s.setBookTargetPage);

  const completedDays = Object.values(days).filter((d) => d.completed).length;
  const percent = Math.round((completedDays / TOTAL_DAYS) * 100);
  let streak = 0;
  for (let d = currentDay; d >= 1; d--) {
    if (days[d]?.completed) streak++;
    else break;
  }

  function openDay(day) {
    setBookTargetPage(pageIndexForDay(day));
    navigate("/book");
  }

  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl text-rose-700 mb-1">تقدمي في الرحلة 📊</h1>
      <p className="text-ink-700/60 text-sm mb-4">كل يوم تنجزينه هو خطوة أقرب إلى نسختك الأفضل.</p>

      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <Card className="text-center">
          <p className="font-display text-2xl text-rose-700">{completedDays}</p>
          <p className="text-[10px] text-ink-700/60">يوم مكتمل</p>
        </Card>
        <Card className="text-center">
          <p className="font-display text-2xl text-rose-700">{TOTAL_DAYS - completedDays}</p>
          <p className="text-[10px] text-ink-700/60">يوم متبقي</p>
        </Card>
        <Card className="text-center">
          <p className="font-display text-2xl text-rose-700">🔥 {streak}</p>
          <p className="text-[10px] text-ink-700/60">أيام متتالية</p>
        </Card>
      </div>

      <Card className="mb-4">
        <p className="font-bold text-rose-700 text-sm mb-2">النسبة الإجمالية</p>
        <ProgressBar percent={percent} height="h-4" />
        <p className="text-center text-rose-700 font-bold text-sm mt-2">{percent}%</p>
      </Card>

      <Card>
        <p className="font-bold text-rose-700 text-sm mb-3">خريطة الـ 66 يوماً</p>
        <div className="grid grid-cols-11 sm:grid-cols-11 gap-1.5">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
            const completed = days[day]?.completed;
            return (
              <button
                key={day}
                onClick={() => openDay(day)}
                title={`اليوم ${dayOrdinalAr(day)}`}
                className={`aspect-square rounded-md text-[9px] font-bold flex items-center justify-center transition-transform active:scale-90 ${
                  completed ? "bg-rose-600 text-white" : "bg-blush-200/70 text-ink-700/50"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

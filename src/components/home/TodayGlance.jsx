import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import { useAppStore } from "../../store/useAppStore";
import { CHECKLIST_SECTIONS, dayOrdinalAr } from "../../data/dailyChecklist";
import { pageIndexForDay } from "../../utils/bookPages";

export default function TodayGlance() {
  const navigate = useNavigate();
  const currentDay = useAppStore((s) => s.currentDay);
  const dayData = useAppStore((s) => s.days[currentDay]);
  const setBookTargetPage = useAppStore((s) => s.setBookTargetPage);

  const checklist = dayData?.checklist || {};
  const totalItems = CHECKLIST_SECTIONS.reduce((n, s) => n + s.items.length, 0);
  const doneItems = Object.values(checklist).filter(Boolean).length;
  const percent = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  function openToday() {
    setBookTargetPage(pageIndexForDay(currentDay));
    navigate("/book");
  }

  return (
    <Card className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-bold text-rose-700 text-sm">اليوم {dayOrdinalAr(currentDay)} ✨</p>
        <button onClick={openToday} className="text-[11px] text-rose-500 font-bold">
          فتح اليوم ←
        </button>
      </div>
      <ProgressBar percent={percent} />
      <p className="text-[11px] text-ink-700/60 mt-1.5">
        {doneItems} من {totalItems} عادة أنجزتها اليوم
      </p>
    </Card>
  );
}

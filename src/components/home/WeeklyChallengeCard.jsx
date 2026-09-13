import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import ProgressBar from "../common/ProgressBar";
import { useAppStore } from "../../store/useAppStore";
import { getChallengeForWeek } from "../../data/weeklyChallenges";
import { weekOfDay } from "../../utils/dayUtils";
import { pageIndexForKind } from "../../utils/bookPages";

export default function WeeklyChallengeCard() {
  const navigate = useNavigate();
  const currentDay = useAppStore((s) => s.currentDay);
  const setBookTargetPage = useAppStore((s) => s.setBookTargetPage);
  const currentWeek = weekOfDay(currentDay);
  const weekData = useAppStore((s) => s.getWeek(currentWeek));
  const challenge = getChallengeForWeek(currentWeek);

  function openChallenge() {
    setBookTargetPage(pageIndexForKind("challenge", { week: currentWeek }));
    navigate("/book");
  }

  if (!challenge) {
    return (
      <div className="mt-4 rounded-[1.5rem] bg-gradient-to-l from-rose-100 to-blush-100 border border-blush-200 p-4 text-center shadow-[var(--shadow-card)]">
        <p className="font-bold text-rose-700 text-sm">أكملتِ كل تحديات الأسابيع التسعة ✨</p>
        <p className="text-[11px] text-ink-700/60 mt-1">استمري في رحلتك حتى اليوم الستين والستين ♥</p>
      </div>
    );
  }

  const doneDays = (weekData.challengeTracker || []).filter(Boolean).length;
  const percent = Math.round((doneDays / 7) * 100);

  return (
    <div className="mt-4 rounded-[1.5rem] bg-gradient-to-l from-rose-100 to-blush-100 border border-blush-200 p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-2">
        <p className="font-bold text-rose-700 text-sm">تحدي الأسبوع {currentWeek} ✨</p>
        <button onClick={openChallenge} className="text-[11px] text-rose-500 font-bold">
          افتحي التحدي ←
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <Icon name={challenge.icon} size={18} />
        </span>
        <div className="min-w-0">
          <p className="font-bold text-ink-800 text-sm truncate">{challenge.title}</p>
          <p className="text-[11px] text-ink-700/60 truncate">{challenge.subtitle}</p>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar percent={percent} height="h-2" />
        <p className="text-[10px] text-ink-700/60 mt-1">{doneDays} من 7 أيام من هذا التحدي</p>
      </div>
    </div>
  );
}

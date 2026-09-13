import BookPageFrame from "./BookPageFrame";
import { LineInput, JournalArea } from "../../common/Inputs";
import { useAppStore } from "../../../store/useAppStore";
import { REVIEW_CATEGORIES, LEAVE_BEHIND_OPTIONS } from "../../../data/weeklyReview";
import Icon from "../../common/Icon";

export default function WeeklyReviewPage({ week }) {
  const weekData = useAppStore((s) => s.getWeek(week));
  const updateWeek = useAppStore((s) => s.updateWeek);
  const toggleLeaveBehind = useAppStore((s) => s.toggleLeaveBehind);

  function setRating(key, val) {
    updateWeek(week, { reviewRatings: { ...weekData.reviewRatings, [key]: val } });
  }
  function setListItem(field, i, val) {
    const arr = [...weekData[field]];
    arr[i] = val;
    updateWeek(week, { [field]: arr });
  }

  return (
    <BookPageFrame>
      <h2 className="font-display text-2xl sm:text-3xl text-rose-700 text-center mb-1">مراجعة الأسبوع</h2>
      <p className="text-center text-[11px] text-ink-700/70 mb-3">
        توقفي لحظة... افتخري بنفسك، وخططي للأسبوع القادم بعين جديدة.
      </p>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3">
        <p className="font-bold text-rose-700 text-[12px] mb-2">تقييمي لنفسي هذا الأسبوع (من 1 إلى 10)</p>
        <div className="space-y-2">
          {REVIEW_CATEGORIES.map((cat) => (
            <div key={cat.key} className="flex items-center gap-2">
              <Icon name={cat.icon} className="text-rose-500 shrink-0" size={13} />
              <span className="text-[11px] text-ink-800 w-28 sm:w-32 shrink-0">{cat.label}</span>
              <input
                type="range"
                min={1}
                max={10}
                value={weekData.reviewRatings[cat.key]}
                onChange={(e) => setRating(cat.key, Number(e.target.value))}
                className="flex-1 accent-rose-600"
              />
              <span className="w-5 text-center text-[11px] font-bold text-rose-700">
                {weekData.reviewRatings[cat.key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">أنا فخورة بـ...</p>
          <p className="text-[10px] text-ink-700/60 mb-1.5">3 أشياء فعلتها هذا الأسبوع وأفتخر بها</p>
          {weekData.proudOf.map((p, i) => (
            <LineInput key={i} value={p} onChange={(v) => setListItem("proudOf", i, v)} placeholder="..." className="mb-1.5" />
          ))}
        </div>
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">شيء واحد تغيّر فيّ هذا الأسبوع</p>
          <p className="text-[10px] text-ink-700/60 mb-1.5">قبل 7 أيام كنتِ...</p>
          <JournalArea rows={3} value={weekData.oneThingChanged} onChange={(v) => updateWeek(week, { oneThingChanged: v })} placeholder="..." />
        </div>
      </div>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3">
        <p className="font-bold text-rose-700 text-[12px] mb-2">ما الذي أريد أن أتركه في هذا الأسبوع؟</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2">
          {LEAVE_BEHIND_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-1.5 py-1 text-[11px] text-ink-800">
              <input
                type="checkbox"
                checked={weekData.leaveBehindChecked.includes(opt)}
                onChange={() => toggleLeaveBehind(week, opt)}
                className="accent-rose-600 w-3.5 h-3.5"
              />
              {opt}
            </label>
          ))}
        </div>
        <LineInput
          value={weekData.leaveBehindOther}
          onChange={(v) => updateWeek(week, { leaveBehindOther: v })}
          placeholder="أشياء أخرى..."
          className="mt-1"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">أختار أن أركز على...</p>
          {weekData.focusOn.map((f, i) => (
            <LineInput key={i} value={f} onChange={(v) => setListItem("focusOn", i, v)} placeholder="..." className="mb-1.5" />
          ))}
        </div>
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">خطتي للأسبوع القادم</p>
          <p className="text-[10px] text-ink-700/60 mb-1.5">3 خطوات بسيطة سأقوم بها</p>
          {weekData.nextWeekPlan.map((f, i) => (
            <LineInput key={i} value={f} onChange={(v) => setListItem("nextWeekPlan", i, v)} placeholder="..." className="mb-1.5" />
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
        <p className="font-bold text-rose-700 text-[12px] mb-1.5">رسالة إلى نفسي</p>
        <p className="text-[10px] text-ink-700/60 mb-1.5">لو كان بإمكاني الجلوس مع نفسي بعد هذا الأسبوع، ماذا سأقول لها؟</p>
        <JournalArea rows={2} value={weekData.letterToSelf} onChange={(v) => updateWeek(week, { letterToSelf: v })} placeholder="..." />
      </div>

      <p className="text-center text-rose-700 text-[11px] font-bold mt-3">
        أنا فخورة بي لأنني أتحسن كل يوم، خطوة بخطوة ♥
      </p>
    </BookPageFrame>
  );
}

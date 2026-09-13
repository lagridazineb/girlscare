import BookPageFrame from "./BookPageFrame";
import Checkbox from "../../common/Checkbox";
import SectionHeading from "../../common/SectionHeading";
import { JournalArea, LineInput } from "../../common/Inputs";
import { CHECKLIST_SECTIONS, dayOrdinalAr } from "../../../data/dailyChecklist";
import { useAppStore } from "../../../store/useAppStore";
import { formatDateDMY } from "../../../utils/dayUtils";
import { celebrate } from "../../../utils/celebrate";

export default function DailyTrackerPage({ day }) {
  const dayData = useAppStore((s) => s.days[day]);
  const toggleCheck = useAppStore((s) => s.toggleCheck);
  const updateDay = useAppStore((s) => s.updateDay);
  const markDayComplete = useAppStore((s) => s.markDayComplete);
  const startDate = useAppStore((s) => s.profile.startDate);

  const checklist = dayData?.checklist || {};
  const allChecked = CHECKLIST_SECTIONS.every((sec) => sec.items.every((it) => checklist[`${sec.key}.${it.key}`]));

  const leftCols = CHECKLIST_SECTIONS.filter((s) => ["mind", "body", "relationships", "time"].includes(s.key));
  const rightCols = CHECKLIST_SECTIONS.filter((s) => ["faith", "selfcare", "study", "money"].includes(s.key));

  function renderSection(section) {
    return (
      <div key={section.key} className="rounded-2xl bg-blush-100/60 border border-blush-200 p-2.5 mb-2.5">
        <SectionHeading icon={section.icon} title={section.title} />
        <div>
          {section.items.map((item) => (
            <Checkbox
              key={item.key}
              size="sm"
              checked={!!checklist[`${section.key}.${item.key}`]}
              onChange={() => toggleCheck(day, section.key, item.key)}
              label={item.label}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <BookPageFrame badge={<span>تحدي<br />66 يوم</span>}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-rose-700">اليوم {dayOrdinalAr(day)}</h2>
          <p className="text-[10px] sm:text-[11px] text-ink-700/60 mt-0.5">
            خطوات صغيرة اليوم ... تغييرات كبيرة غداً ♥
          </p>
        </div>
        <div className="text-left shrink-0 pl-14 sm:pl-0">
          <p className="text-[9px] text-rose-500">التاريخ</p>
          <p className="text-[11px] text-ink-700">{formatDateDMY(dayData?.date || startDate)}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-3 mt-3">
        <div>{leftCols.map(renderSection)}</div>
        <div>{rightCols.map(renderSection)}</div>
      </div>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-2.5 mb-2.5">
        <SectionHeading icon="FaTrophy" title="أهم إنجاز اليوم" />
        <JournalArea
          rows={2}
          value={dayData?.achievement}
          onChange={(v) => updateDay(day, { achievement: v })}
          placeholder="اكتبي أهم إنجاز حققتيه اليوم..."
        />
      </div>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-2.5 mb-2.5">
        <SectionHeading icon="FaHeart" title="مشاعري" />
        <p className="text-[11px] text-ink-700/70 mb-1">كيف أشعر اليوم؟</p>
        <LineInput
          value={dayData?.feelingToday}
          onChange={(v) => updateDay(day, { feelingToday: v })}
          placeholder="..."
        />
        <p className="text-[11px] text-ink-700/70 mt-2 mb-1">كيف تعاملت مع نفسي؟</p>
        <LineInput
          value={dayData?.selfTreatment}
          onChange={(v) => updateDay(day, { selfTreatment: v })}
          placeholder="..."
        />
      </div>

      <div className="rounded-2xl bg-rose-50 border border-rose-200 p-2.5 mb-3">
        <SectionHeading icon="FaClipboardList" title="شيء يجب أن أقوم به غداً (لا يجب أن أنساه)" />
        <JournalArea
          rows={2}
          value={dayData?.tomorrowNote}
          onChange={(v) => updateDay(day, { tomorrowNote: v })}
          placeholder="..."
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => {
            markDayComplete(day);
            celebrate();
          }}
          disabled={dayData?.completed}
          className={`w-full max-w-xs rounded-full py-2.5 font-bold text-sm transition-all ${
            dayData?.completed
              ? "bg-rose-100 text-rose-500 cursor-default"
              : "bg-rose-600 text-white shadow-md active:scale-95"
          }`}
        >
          {dayData?.completed ? `✨ اليوم ${dayOrdinalAr(day)} مكتمل ✨` : allChecked ? "إنهاء اليوم ✓" : "إنهاء اليوم"}
        </button>
        <p className="text-center text-rose-700 text-[11px] font-bold">
          لا تبحثي عن يوم مثالي، ابني نظامك واستمري.
        </p>
      </div>
    </BookPageFrame>
  );
}

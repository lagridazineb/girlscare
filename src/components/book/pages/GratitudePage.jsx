import BookPageFrame from "./BookPageFrame";
import { LineInput, JournalArea } from "../../common/Inputs";
import { DAILY_AFFIRMATIONS, GRATITUDE_VERSE } from "../../../data/dailyChecklist";
import { useAppStore } from "../../../store/useAppStore";

export default function GratitudePage({ day }) {
  const dayData = useAppStore((s) => s.days[day]);
  const setGratitudeItem = useAppStore((s) => s.setGratitudeItem);
  const updateDay = useAppStore((s) => s.updateDay);
  const gratitude = dayData?.gratitude || ["", "", "", "", ""];

  return (
    <BookPageFrame>
      <h2 className="font-display text-2xl sm:text-3xl text-rose-700 text-center mb-1">حصة الامتنان</h2>
      <p className="text-center text-[11px] text-ink-700/70 mb-3 leading-relaxed">
        الامتنان يفتح أبواب الخير، ويضاعف النعم. خذي لحظات كل يوم لتذكري نعم الله عليك، صغيرة كانت أو كبيرة.
      </p>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3">
        <p className="font-bold text-rose-700 text-[13px] mb-2">النعم التي أمتن لها اليوم</p>
        <div className="space-y-2">
          {gratitude.map((g, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <LineInput value={g} onChange={(v) => setGratitudeItem(day, i, v)} placeholder="..." />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 text-center mb-3">
        <p className="font-display text-lg text-rose-700 leading-snug">“ {GRATITUDE_VERSE.text} ”</p>
        <p className="text-[10px] text-ink-700/60 mt-1">{GRATITUDE_VERSE.source}</p>
      </div>

      <p className="font-bold text-rose-700 text-[13px] mb-1.5 text-center">تأكيدات اليوم</p>
      <p className="text-center text-[10px] text-ink-700/60 mb-2">
        كلمات من نفسك تصنع واقعك. اقرئي هذه التأكيدات بصوتك وصدقيها بقلبك. أنت تستحقين كل الخير.
      </p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {DAILY_AFFIRMATIONS.map((a, i) => (
          <div key={i} className="rounded-xl bg-white border border-blush-200 p-2 text-center text-[11px] text-ink-800">
            {a} <span className="text-rose-400">♥</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
        <p className="font-bold text-rose-700 text-[13px] mb-1.5 text-center">رسالة اليوم لنفسي</p>
        <JournalArea
          rows={2}
          value={dayData?.dailyMessage}
          onChange={(v) => updateDay(day, { dailyMessage: v })}
          placeholder="اكتبي رسالة قصيرة تشجعين بها نفسك اليوم..."
        />
      </div>

      <p className="text-center text-rose-700 text-[11px] font-bold mt-3">
        لا تبخثي عن يوم مثالي، ابني نظامك واستمري.
      </p>
    </BookPageFrame>
  );
}

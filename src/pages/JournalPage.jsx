import { useAppStore } from "../store/useAppStore";
import Card from "../components/common/Card";
import { LineInput, JournalArea } from "../components/common/Inputs";
import { DAILY_AFFIRMATIONS, GRATITUDE_VERSE } from "../data/dailyChecklist";

export default function JournalPage() {
  const currentDay = useAppStore((s) => s.currentDay);
  const dayData = useAppStore((s) => s.days[currentDay]);
  const setGratitudeItem = useAppStore((s) => s.setGratitudeItem);
  const updateDay = useAppStore((s) => s.updateDay);

  const gratitude = dayData?.gratitude || ["", "", "", "", ""];

  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl text-rose-700 mb-1">امتنان وتوكيدات 🌸</h1>
      <p className="text-ink-700/60 text-sm mb-4">مساحتك الخاصة للامتنان، التأكيدات، وكتابة يومك.</p>

      <Card className="mb-3">
        <p className="font-bold text-rose-700 text-sm mb-2">النعم التي أمتن لها اليوم</p>
        <div className="space-y-2">
          {gratitude.map((g, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <LineInput value={g} onChange={(v) => setGratitudeItem(currentDay, i, v)} placeholder="..." />
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-3 text-center">
        <p className="font-display text-lg text-rose-700 leading-snug">“ {GRATITUDE_VERSE.text} ”</p>
        <p className="text-[10px] text-ink-700/60 mt-1">{GRATITUDE_VERSE.source}</p>
      </Card>

      <Card className="mb-3">
        <p className="font-bold text-rose-700 text-sm mb-1 text-center">تأكيدات اليوم</p>
        <p className="text-center text-[11px] text-ink-700/60 mb-2">
          كلمات من نفسك تصنع واقعك. اقرئيها بصوتك وصدقيها بقلبك، أنتِ تستحقين كل الخير.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {DAILY_AFFIRMATIONS.map((a, i) => (
            <div key={i} className="rounded-xl bg-blush-100/70 border border-blush-200 p-2 text-center text-[11px] text-ink-800">
              {a} <span className="text-rose-400">♥</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className="font-bold text-rose-700 text-sm mb-1.5 text-center">يومياتي</p>
        <JournalArea
          rows={5}
          value={dayData?.dailyMessage}
          onChange={(v) => updateDay(currentDay, { dailyMessage: v })}
          placeholder="اكتبي عن يومك، مشاعرك، أو أي شيء يخطر ببالك..."
        />
      </Card>
    </div>
  );
}

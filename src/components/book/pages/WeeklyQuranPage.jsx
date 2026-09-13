import BookPageFrame from "./BookPageFrame";
import { LineInput } from "../../common/Inputs";
import Checkbox from "../../common/Checkbox";
import { useAppStore } from "../../../store/useAppStore";
import { WEEK_NAME_AR } from "../../../data/weeklyReview";

const DAYS = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
const HABITS = ["الانتظام في القراءة يومياً", "التركيز والفهم", "استشعار معاني القرآن"];

export default function WeeklyQuranPage({ week }) {
  const weekData = useAppStore((s) => s.getWeek(week));
  const updateWeekQuranRow = useAppStore((s) => s.updateWeekQuranRow);
  const updateWeek = useAppStore((s) => s.updateWeek);

  return (
    <BookPageFrame>
      <h2 className="font-display text-2xl sm:text-3xl text-rose-700 text-center mb-1">الورد اليومي</h2>
      <p className="text-center text-rose-600 text-[11px] font-bold mb-3">
        ♥ خلال الأسبوع {WEEK_NAME_AR[week - 1] || week} ♥
      </p>

      <div className="rounded-2xl bg-rose-50 border border-rose-200 p-2.5 text-center mb-3">
        <p className="font-display text-base text-rose-700">﴿ خَيرُكُم مَن تَعَلَّمَ القُرآنَ وَعَلَّمَهُ ﴾</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-blush-200">
        <table className="w-full text-[11px] sm:text-xs">
          <thead>
            <tr className="bg-rose-600 text-white">
              <th className="p-2 font-bold">اليوم</th>
              <th className="p-2 font-bold">التاريخ</th>
              <th className="p-2 font-bold">القراءة (الصفحات/الآيات)</th>
              <th className="p-2 font-bold">ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {DAYS.map((d, i) => (
              <tr key={d} className={i % 2 === 0 ? "bg-blush-100/50" : "bg-white"}>
                <td className="p-1.5 text-center font-bold text-rose-700">{d}</td>
                <td className="p-1.5">
                  <LineInput
                    value={weekData.quran[d]?.date}
                    onChange={(v) => updateWeekQuranRow(week, d, { date: v })}
                    placeholder="../../.."
                  />
                </td>
                <td className="p-1.5">
                  <LineInput
                    value={weekData.quran[d]?.reading}
                    onChange={(v) => updateWeekQuranRow(week, d, { reading: v })}
                    placeholder="..."
                  />
                </td>
                <td className="p-1.5">
                  <LineInput
                    value={weekData.quran[d]?.notes}
                    onChange={(v) => updateWeekQuranRow(week, d, { notes: v })}
                    placeholder="..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-3">
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">أهدافي القرآنية هذا الأسبوع</p>
          {weekData.quranGoals.map((g, i) => (
            <div key={i} className="flex items-center gap-1.5 mb-1">
              <span className="text-rose-400">♥</span>
              <LineInput
                value={g}
                onChange={(v) => {
                  const goals = [...weekData.quranGoals];
                  goals[i] = v;
                  updateWeek(week, { quranGoals: goals });
                }}
                placeholder="..."
              />
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">ما أحب أن أذكره</p>
          {HABITS.map((h, i) => (
            <Checkbox
              key={h}
              size="sm"
              checked={!!weekData.quranHabits?.[i]}
              onChange={() => {
                const habits = [...(weekData.quranHabits || [false, false, false])];
                habits[i] = !habits[i];
                updateWeek(week, { quranHabits: habits });
              }}
              label={h}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-rose-700 text-[11px] font-bold mt-3">
        تذكري دائماً: كل صفحة تقرأ تنيرها نور في حياتك ♥
      </p>
    </BookPageFrame>
  );
}

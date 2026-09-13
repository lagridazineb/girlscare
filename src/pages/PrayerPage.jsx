import { useState } from "react";
import Card from "../components/common/Card";
import { MORNING_ADHKAR, EVENING_ADHKAR, DUHA_PRAYER } from "../data/adhkar";

export default function PrayerPage() {
  const [showAdhkar, setShowAdhkar] = useState(null);

  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl text-rose-700 mb-1">أذكاري وعباداتي 🕌</h1>
      <p className="text-ink-700/60 text-sm mb-4">القرب من الله هو أساس كل طمأنينة.</p>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <button
          onClick={() => setShowAdhkar(showAdhkar === "morning" ? null : "morning")}
          className="rounded-2xl bg-white border border-blush-200 shadow-[var(--shadow-card)] p-4 text-right"
        >
          <p className="font-bold text-rose-700 text-sm">☀️ أذكار الصباح</p>
          <p className="text-[11px] text-ink-700/60 mt-1">اضغطي لعرض / إخفاء</p>
        </button>
        <button
          onClick={() => setShowAdhkar(showAdhkar === "evening" ? null : "evening")}
          className="rounded-2xl bg-white border border-blush-200 shadow-[var(--shadow-card)] p-4 text-right"
        >
          <p className="font-bold text-rose-700 text-sm">🌙 أذكار المساء</p>
          <p className="text-[11px] text-ink-700/60 mt-1">اضغطي لعرض / إخفاء</p>
        </button>
      </div>

      {showAdhkar && (
        <Card className="mb-3">
          <ol className="space-y-2 text-sm text-ink-800 leading-relaxed">
            {(showAdhkar === "morning" ? MORNING_ADHKAR : EVENING_ADHKAR).map((a, i) => (
              <li key={i} className="border-b border-blush-100 pb-2 last:border-0">
                {a.text} {a.count && <span className="text-rose-500 text-xs font-bold">({a.count})</span>}
              </li>
            ))}
          </ol>
        </Card>
      )}

      <Card>
        <p className="font-bold text-rose-700 text-sm mb-1.5">صلاة الضحى</p>
        <p className="text-[12px] text-ink-700/70 mb-1"><b className="text-ink-800">الوقت:</b> {DUHA_PRAYER.time}</p>
        <p className="text-[12px] text-ink-700/70 mb-1"><b className="text-ink-800">العدد:</b> {DUHA_PRAYER.count}</p>
        <p className="text-[12px] text-ink-700/70"><b className="text-ink-800">الفائدة:</b> {DUHA_PRAYER.benefits}</p>
      </Card>
    </div>
  );
}

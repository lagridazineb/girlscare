import BookPageFrame from "./BookPageFrame";
import { LineInput, JournalArea } from "../../common/Inputs";
import Icon from "../../common/Icon";
import { useAppStore } from "../../../store/useAppStore";
import { getChallengeForWeek } from "../../../data/weeklyChallenges";

const DAY_LABELS = ["اليوم 1", "اليوم 2", "اليوم 3", "اليوم 4", "اليوم 5", "اليوم 6", "اليوم 7"];

export default function WeeklyChallengePage({ week }) {
  const challenge = getChallengeForWeek(week);
  const weekData = useAppStore((s) => s.getWeek(week));
  const toggleChallengeDay = useAppStore((s) => s.toggleChallengeDay);
  const setChallengeReflection = useAppStore((s) => s.setChallengeReflection);

  if (!challenge) return null;

  return (
    <BookPageFrame>
      <p className="text-center text-rose-600 font-bold text-[11px] mb-1">الأسبوع {week} · تحدي</p>
      <h2 className="font-display text-2xl sm:text-3xl text-rose-700 text-center mb-1 flex items-center justify-center gap-2">
        <Icon name={challenge.icon} className="text-rose-500" />
        {challenge.title}
      </h2>
      <p className="text-center text-[11px] text-ink-700/70 mb-3">{challenge.subtitle}</p>

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3 text-[11px] text-ink-800 leading-relaxed text-center">
        {challenge.intro}
      </div>

      <p className="font-bold text-rose-700 text-[13px] mb-1.5">كيف أطبق التحدي؟</p>
      <div className="space-y-2 mb-3">
        {challenge.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-bold text-[12px] text-ink-800">{step.title}</p>
              <p className="text-[11px] text-ink-700/70">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      {challenge.techniques && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 mb-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">تقنيات تساعدني</p>
          <div className="space-y-1.5">
            {challenge.techniques.map((t, i) => (
              <p key={i} className="text-[11px] text-ink-800">
                <span className="font-bold text-rose-600">{t.title}: </span>
                {t.body}
              </p>
            ))}
          </div>
        </div>
      )}

      {challenge.replaceExamples && (
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3 overflow-x-auto">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">أمثلة على استبدال الكلام السلبي</p>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-rose-600">
                <th className="text-right p-1">الحديث السلبي</th>
                <th className="text-right p-1">استبدله بحديث إيجابي</th>
              </tr>
            </thead>
            <tbody>
              {challenge.replaceExamples.map((ex, i) => (
                <tr key={i} className="border-t border-blush-200">
                  <td className="p-1 text-ink-700/70">{ex.negative}</td>
                  <td className="p-1 text-ink-800 font-medium">{ex.positive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(challenge.examplePhrases || challenge.affirmations) && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 mb-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">عبارات يمكنني قولها لنفسي</p>
          <div className="grid grid-cols-2 gap-1.5">
            {(challenge.examplePhrases || challenge.affirmations).map((p, i) => (
              <p key={i} className="text-[10.5px] bg-white rounded-lg border border-blush-200 p-1.5 text-center text-ink-800">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      {challenge.ideas && (
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">أفكار تساعدني</p>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-ink-800">
            {challenge.ideas.map((idea, i) => (
              <p key={i} className="flex items-start gap-1">
                <span className="text-rose-400 shrink-0">♥</span> {idea}
              </p>
            ))}
          </div>
        </div>
      )}

      {challenge.whyImportant && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 mb-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">لماذا هذه العادة مهمة؟</p>
          {challenge.whyImportant.map((w, i) => (
            <p key={i} className="text-[11px] text-ink-800 flex items-start gap-1.5 mb-0.5">
              <span className="text-rose-400 shrink-0">♥</span> {w}
            </p>
          ))}
        </div>
      )}

      {challenge.spaceOptions && (
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">المساحات التي يمكنني ترتيبها</p>
          <div className="flex flex-wrap gap-1.5">
            {challenge.spaceOptions.map((o) => (
              <span key={o} className="text-[10.5px] bg-white rounded-full border border-blush-300 px-2 py-1 text-ink-800">
                {o}
              </span>
            ))}
          </div>
        </div>
      )}

      {challenge.tips && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 mb-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">خطوات تجعل تجربتك أجمل</p>
          {challenge.tips.map((t, i) => (
            <p key={i} className="text-[11px] text-ink-800 flex items-start gap-1.5 mb-0.5">
              <span className="text-rose-400 shrink-0">♥</span> {t}
            </p>
          ))}
        </div>
      )}

      {challenge.todayChallenge && (
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1.5">اليوم سأراقب نفسي</p>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-ink-800">
            {challenge.todayChallenge.map((c, i) => (
              <p key={i} className="flex items-start gap-1">
                <span className="text-rose-400 shrink-0">☐</span> {c}
              </p>
            ))}
          </div>
        </div>
      )}

      {challenge.reminder && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 mb-3 text-center">
          <p className="text-[11px] text-ink-800 leading-relaxed italic">{challenge.reminder}</p>
        </div>
      )}

      <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3 mb-3">
        <p className="font-bold text-rose-700 text-[12px] mb-2">{challenge.trackerLabel || "تتبعي الأسبوعي"}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {DAY_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => toggleChallengeDay(week, i)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[10px] font-bold transition-all ${
                weekData.challengeTracker[i]
                  ? "bg-rose-600 border-rose-600 text-white"
                  : "bg-white border-blush-300 text-ink-700"
              }`}
            >
              {label}
              <span>{weekData.challengeTracker[i] ? "✓" : "○"}</span>
            </button>
          ))}
        </div>
      </div>

      {challenge.reflectionFields && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 space-y-2">
          {challenge.reflectionFields.map((f) => (
            <div key={f.key}>
              <p className="text-[11px] font-bold text-rose-700 mb-1">{f.label}</p>
              {f.type === "textarea" ? (
                <JournalArea
                  rows={2}
                  value={weekData.challengeReflections[f.key]}
                  onChange={(v) => setChallengeReflection(week, f.key, v)}
                  placeholder="..."
                />
              ) : (
                <LineInput
                  value={weekData.challengeReflections[f.key]}
                  onChange={(v) => setChallengeReflection(week, f.key, v)}
                  placeholder="..."
                />
              )}
            </div>
          ))}
        </div>
      )}
    </BookPageFrame>
  );
}

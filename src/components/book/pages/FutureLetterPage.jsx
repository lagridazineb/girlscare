import BookPageFrame from "./BookPageFrame";
import { JournalArea } from "../../common/Inputs";
import { useAppStore } from "../../../store/useAppStore";

const FIELDS = [
  { key: "remember", label: "أتمنى أن تتذكري..." },
  { key: "neverReturn", label: "أتمنى ألا تعودي أبداً إلى..." },
  { key: "continueIn", label: "أريدك أن تستمري في..." },
  { key: "promise", label: "وأعدك أنني سأظل..." },
];

export default function FutureLetterPage() {
  const answers = useAppStore((s) => s.futureLetterAnswers);
  const setAnswer = useAppStore((s) => s.setFutureLetterAnswer);

  return (
    <BookPageFrame>
      <h2 className="font-display text-2xl sm:text-3xl text-rose-700 text-center mb-1">رسالة إلى نفسي المستقبلية</h2>
      <p className="text-center text-rose-500 text-[11px] mb-4">♥ إلى المرأة التي أصبحتُها... ♥</p>
      <p className="text-center text-[11px] text-ink-700/70 mb-4 leading-relaxed">
        هذه الكلمات هي وعد بيننا اليوم، وتذكير لك بالرحلة التي خضتها، وبالمرأة التي اخترتِ أن تكونيها.
      </p>

      <div className="space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key} className="border-b border-blush-200 pb-2">
            <p className="text-rose-600 font-bold text-[12px] mb-1">♥ {f.label}</p>
            <JournalArea
              rows={2}
              value={answers[f.key]}
              onChange={(v) => setAnswer(f.key, v)}
              placeholder="..."
            />
          </div>
        ))}
      </div>

      <p className="text-center text-rose-700 font-bold text-[12px] mt-5">بكل حب، أنا القديمة ♥</p>
    </BookPageFrame>
  );
}

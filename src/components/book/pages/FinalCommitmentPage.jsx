import BookPageFrame from "./BookPageFrame";
import { LineInput, JournalArea } from "../../common/Inputs";
import { useAppStore } from "../../../store/useAppStore";

export default function FinalCommitmentPage() {
  const commitment = useAppStore((s) => s.finalCommitment);
  const setFinalCommitment = useAppStore((s) => s.setFinalCommitment);

  return (
    <BookPageFrame>
      <h2 className="font-display text-2xl sm:text-3xl text-rose-700 text-center mb-1">هذه المرة سأكمل</h2>
      <p className="text-center text-[11px] text-ink-700/70 mb-4 leading-relaxed">
        بعد 66 يوماً من الرحلة، لا أعد بالبداية... أعد بالاستمرار. لقد اخترت نفسي، يوماً بعد يوم، تعلمت، تغيرت، ونمت،
        وأسست لعادات جديدة. الآن سأستمر في ما بدأته، لأن هذه النسخة من نفسي تستحق الاستمرار.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1">♥ عادة واحدة سأحافظ عليها</p>
          <JournalArea rows={2} value={commitment.habit} onChange={(v) => setFinalCommitment({ habit: v })} />
        </div>
        <div className="rounded-2xl bg-blush-100/60 border border-blush-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1">♥ هدف واحد سأواصل عليه</p>
          <JournalArea rows={2} value={commitment.goal} onChange={(v) => setFinalCommitment({ goal: v })} />
        </div>
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1">♥ شيء لن أسمح لنفسي بالعودة إليه</p>
          <JournalArea rows={2} value={commitment.noReturn} onChange={(v) => setFinalCommitment({ noReturn: v })} />
        </div>
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3">
          <p className="font-bold text-rose-700 text-[12px] mb-1">♥ وعدي لنفسي</p>
          <JournalArea rows={2} value={commitment.promise} onChange={(v) => setFinalCommitment({ promise: v })} />
        </div>
      </div>

      <div className="rounded-2xl bg-blush-100/70 border border-blush-200 p-3 text-center mb-3">
        <p className="text-[12px] text-ink-800 leading-relaxed">
          أتعهد أمام نفسي ... أن أستمر في اختيار نفسي كل يوم، أن أكون صورة ولطيفة مع نفسي، وأتذكر أن التقدم الحقيقي
          لا يُقاس بالكمال، بل بالاستمرارية. أنا أواصل رحلتي بثقة، وهدوء، وإيمان بأنني أستحق أفضل حياة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-blush-200 pt-3">
        <div>
          <p className="text-[11px] text-rose-600 font-bold mb-1">اسمي</p>
          <LineInput value={commitment.signature} onChange={(v) => setFinalCommitment({ signature: v })} placeholder="اسمك" />
        </div>
        <div>
          <p className="text-[11px] text-rose-600 font-bold mb-1">تاريخ اليوم</p>
          <LineInput value={commitment.date} onChange={(v) => setFinalCommitment({ date: v })} placeholder="../../.." />
        </div>
        <div>
          <p className="text-[11px] text-rose-600 font-bold mb-1">توقيعي</p>
          <LineInput
            value={commitment.signature}
            onChange={(v) => setFinalCommitment({ signature: v })}
            className="font-display text-lg text-rose-700"
          />
        </div>
      </div>

      <p className="text-center text-rose-700 font-bold text-[12px] mt-4">أنا لا أبدأ من جديد ... أنا أواصل ♥</p>
    </BookPageFrame>
  );
}

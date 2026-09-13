import BookPageFrame from "./BookPageFrame";
import { LineInput } from "../../common/Inputs";
import { useAppStore } from "../../../store/useAppStore";
import { formatDateDMY } from "../../../utils/dayUtils";

const PLEDGE_ITEMS = [
  "أختار نفسي كل يوم، وأمنحها الحب والرحمة التي تستحقها.",
  "ألتزم بخطوات صغيرة، ثابتة، مستمرة نحو التحسن والتطور.",
  "أحترم وقتي، وأستثمره فيما يقربني من أهدافي وأحلامي.",
  "أغذي جسدي بعناية، لأصبح بصحة جيدة وطاقة إيجابية.",
  "أعتني بعقلي وروحي، وأغذيهما بالعلم، والإيمان، والكلمات الطيبة.",
  "أحسن الظن بنفسي، وأؤمن أن التغيير ممكن، وإنني أستطيع.",
  "لا أستسلم للعثرات، فكل يوم فرصة جديدة للبدء من جديد.",
  "أحتفل بإنجازاتي مهما كانت صغيرة، لأنها تقربني من نسختي الأفضل.",
  "أطلب العون من الله في كل خطوة، وأتوكل عليه في كل أموري.",
];

export default function PledgePage() {
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);

  return (
    <BookPageFrame>
      <h2 className="font-display text-3xl sm:text-4xl text-rose-700 text-center mb-1">عهدي مع نفسي</h2>
      <p className="text-center text-rose-500 text-[11px] sm:text-xs mb-3">♥ بسم الله، وعلى الله توكلت ♥</p>

      <div className="rounded-2xl bg-blush-100/70 border border-blush-200 p-3 mb-3 text-center">
        <p className="text-[12px] sm:text-[13px] leading-relaxed text-ink-800">
          أنا أبدأ هذه الرحلة بقلب صادق وعزيمة قوية، وأتعهد أمام الله ثم أمام نفسي أن أكون صادقة، ثابتة، ولطيفة مع
          نفسي في كل خطوة.
        </p>
      </div>

      <p className="font-bold text-rose-700 text-sm mb-1.5">أتعهد أنني:</p>
      <ul className="space-y-1.5 mb-4">
        {PLEDGE_ITEMS.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-ink-800">
            <span className="text-rose-500 shrink-0 mt-0.5">♥</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 text-center mb-4">
        <p className="font-bold text-rose-700 text-[13px] mb-1">أعد نفسي بأن:</p>
        <p className="text-[12px] text-ink-800 leading-relaxed">
          أكون مصبورة مع نفسي، لا أقسو عليها، وأعود إلى طريقي كلما ابتعدت. لأنني أستحق أن أعيش حياة أفضل، وأصبح أفضل
          نسخة من نفسي بإذن الله.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-blush-200 pt-3">
        <div>
          <p className="text-[11px] text-rose-600 font-bold mb-1">اسمي</p>
          <LineInput
            value={profile.name}
            onChange={(v) => setProfile({ name: v })}
            placeholder="اكتبي اسمك"
          />
        </div>
        <div>
          <p className="text-[11px] text-rose-600 font-bold mb-1">تاريخ البداية</p>
          <p className="text-[13px] text-ink-800 py-1">{formatDateDMY(profile.startDate)}</p>
        </div>
        <div>
          <p className="text-[11px] text-rose-600 font-bold mb-1">توقيعي</p>
          <LineInput
            value={profile.pledgeSignature}
            onChange={(v) => setProfile({ pledgeSignature: v })}
            placeholder="وقعي هنا"
            className="font-display text-lg text-rose-700"
          />
        </div>
      </div>

      <p className="text-center text-rose-700 font-bold text-xs mt-4">♥ أنا ألتزم ... أنا أستمر ... أنا أستطيع ♥</p>
    </BookPageFrame>
  );
}

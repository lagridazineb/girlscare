import BookPageFrame from "./BookPageFrame";
import { JournalArea } from "../../common/Inputs";
import { useAppStore } from "../../../store/useAppStore";

const FIELDS = [
  { key: "whoAmI", title: "من أنا؟", desc: "اكتبي بإيجاز من أنت، وما هي صفاتك، وما الذي يميزك عن نفسك." },
  { key: "trueWish", title: "ما هي أمنيتي الحقيقية؟", desc: "ما الذي أطمح إليه حقاً في حياتي؟ كيف أريد أن أبدو، وأشعر، وأعيش في نهاية هذه الرحلة؟" },
  { key: "spiritualGoal", title: "أهدافي الروحية ♥", desc: "ما الذي أريد تقويته في علاقتي مع الله؟ وكيف أطمح أن أطور حياتي الروحية؟" },
  { key: "emotionalGoal", title: "أهدافي النفسية ♥", desc: "كيف أريد أن أكون أكثر سلاماً وتوازناً وسعادة؟" },
  { key: "physicalGoal", title: "أهدافي الجسدية ♥", desc: "ما هي العادات الصحية التي أريد تبنيها؟ وكيف أطمح أن أهتم بجسدي؟" },
  { key: "careerGoal", title: "أهدافي العلمية / المهنية ♥", desc: "ما الذي أريد تحقيقه في دراستي، عملي أو مهاراتي؟" },
  { key: "financialGoal", title: "أهدافي المادية ♥", desc: "كيف أريد أن أطور وضعي المالي، وأحقق الاستقلال المادي؟" },
  { key: "futureGoal", title: "أهدافي المستقبلية ♥", desc: "ما هي أحلامي الكبيرة على المدى المتوسط والبعيد؟" },
  { key: "values", title: "قيمتي وأولوياتي ♥", desc: "ما هي القيم التي أؤمن بها وأريد أن أطبقها في حياتي؟" },
  { key: "challenges", title: "تحدياتي الحالية ♥", desc: "ما هي العقبات أو العادات التي أريد التخلص منها أو تطويرها؟" },
  { key: "legacy", title: "رسالتي وأثري الذي أقدمه ♥", desc: "كيف أريد أن أساهم وأؤثر في حياة الآخرين؟ وما هي بصمتي التي أريد أن أتركها؟" },
];

export default function SelfAssessmentPage() {
  const quiz = useAppStore((s) => s.profile.quiz);
  const setQuizAnswer = useAppStore((s) => s.setQuizAnswer);

  return (
    <BookPageFrame>
      <h2 className="font-display text-3xl sm:text-4xl text-rose-700 text-center mb-1">اختبار من أنا؟</h2>
      <p className="text-center text-[11px] sm:text-xs text-ink-700/80 mb-4 leading-relaxed">
        قبل انطلاق رحلتك في تحدي 66 يوم، خذي لحظة للتأمل والتفكير العميق في نفسك. هذا الاختبار سيساعدك على التعرف على
        ذاتك، وتحديد أهدافك، وصناعة نسخة أفضل منك.
      </p>
      <div className="heart-divider mb-4 text-xs">✦</div>

      <div className="grid sm:grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <div key={f.key} className="rounded-2xl bg-blush-100/70 border border-blush-200 p-3">
            <p className="font-bold text-rose-700 text-[13px] sm:text-sm">{f.title}</p>
            <p className="text-[11px] text-ink-700/70 mb-1.5">{f.desc}</p>
            <JournalArea
              rows={2}
              value={quiz[f.key]}
              onChange={(v) => setQuizAnswer(f.key, v)}
              placeholder="اكتبي هنا..."
            />
          </div>
        ))}
      </div>

      <p className="text-center text-rose-700 text-[11px] sm:text-xs font-bold mt-4">
        كل هدف تكتبينه اليوم هو خطوة نحو حياة أجمل. فكوني صادقة مع نفسك، واكتبي بقلبك، ولتكن رؤيتك واضحة.
      </p>
    </BookPageFrame>
  );
}

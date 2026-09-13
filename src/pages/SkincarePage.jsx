import { useAppStore } from "../store/useAppStore";
import Card from "../components/common/Card";
import Checkbox from "../components/common/Checkbox";
import ProgressBar from "../components/common/ProgressBar";

const MORNING_STEPS = ["غسول للوجه", "تونر", "سيروم", "مرطب", "واقي شمس"];
const EVENING_STEPS = ["تنظيف مزدوج", "تونر", "علاج / سيروم ليلي", "مرطب ليلي"];

export default function SkincarePage() {
  const currentDay = useAppStore((s) => s.currentDay);
  const dayData = useAppStore((s) => s.days[currentDay]);
  const updateDay = useAppStore((s) => s.updateDay);
  const toggleCheck = useAppStore((s) => s.toggleCheck);

  const routine = dayData?.skincareSteps || { morning: Array(MORNING_STEPS.length).fill(false), evening: Array(EVENING_STEPS.length).fill(false) };

  function toggleStep(period, idx) {
    const current = routine[period] || [];
    const next = [...current];
    next[idx] = !next[idx];
    updateDay(currentDay, { skincareSteps: { ...routine, [period]: next } });
  }

  const totalSteps = MORNING_STEPS.length + EVENING_STEPS.length;
  const doneSteps = (routine.morning || []).filter(Boolean).length + (routine.evening || []).filter(Boolean).length;
  const percent = Math.round((doneSteps / totalSteps) * 100);

  const waterChecked = !!dayData?.checklist?.["body.water"];
  const selfCareChecked = !!dayData?.checklist?.["selfcare.skincare"];

  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl text-rose-700 mb-1">العناية ببشرتي 🧴</h1>
      <p className="text-ink-700/60 text-sm mb-4">روتين اليوم — اعتني بنفسك، أنتِ تستحقين ذلك.</p>

      <Card className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-rose-700 text-sm">تقدم روتين اليوم</p>
          <span className="text-rose-600 font-bold text-sm">{percent}%</span>
        </div>
        <ProgressBar percent={percent} />
      </Card>

      <div className="grid sm:grid-cols-2 gap-3">
        <Card>
          <p className="font-bold text-rose-700 text-sm mb-2">☀️ روتين الصباح</p>
          {MORNING_STEPS.map((step, i) => (
            <Checkbox key={step} label={step} checked={!!routine.morning?.[i]} onChange={() => toggleStep("morning", i)} />
          ))}
        </Card>
        <Card>
          <p className="font-bold text-rose-700 text-sm mb-2">🌙 روتين المساء</p>
          {EVENING_STEPS.map((step, i) => (
            <Checkbox key={step} label={step} checked={!!routine.evening?.[i]} onChange={() => toggleStep("evening", i)} />
          ))}
        </Card>
      </div>

      <Card className="mt-3">
        <p className="font-bold text-rose-700 text-sm mb-2">عادات مكملة</p>
        <Checkbox label="شرب كمية كافية من الماء" checked={waterChecked} onChange={() => toggleCheck(currentDay, "body", "water")} />
        <Checkbox label="10 دقائق عناية إضافية لنفسي" checked={selfCareChecked} onChange={() => toggleCheck(currentDay, "selfcare", "skincare")} />
      </Card>
    </div>
  );
}

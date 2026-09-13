import { useAppStore } from "../store/useAppStore";
import Card from "../components/common/Card";
import Checkbox from "../components/common/Checkbox";
import { JournalArea, LineInput } from "../components/common/Inputs";

const FIELDS = [
  { key: "goals", label: "أهدافي لهذا الشهر" },
  { key: "homework", label: "التزامات قادمة" },
  { key: "exams", label: "محطات ومواعيد مهمة" },
  { key: "learn", label: "أحلامي وطموحاتي المستقبلية" },
];

export default function SchoolPage() {
  const currentDay = useAppStore((s) => s.currentDay);
  const dayData = useAppStore((s) => s.days[currentDay]);
  const updateDay = useAppStore((s) => s.updateDay);
  const toggleCheck = useAppStore((s) => s.toggleCheck);

  const study = dayData?.studyNotes || {};
  const checklist = dayData?.checklist || {};

  function setField(key, value) {
    updateDay(currentDay, { studyNotes: { ...study, [key]: value } });
  }

  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl text-rose-700 mb-1">مستقبلي ✨</h1>
      <p className="text-ink-700/60 text-sm mb-4">خطوة صغيرة كل شهر تقربك من المستقبل الذي تحلمين به.</p>

      <Card className="mb-3">
        <p className="font-bold text-rose-700 text-sm mb-2">خطواتي هذا الشهر</p>
        <Checkbox
          label="قراءة كتاب أو تعلم شيء جديد"
          checked={!!checklist["study.learnNew"]}
          onChange={() => toggleCheck(currentDay, "study", "learnNew")}
        />
        <Checkbox
          label="خطوة نحو هدفي المستقبلي"
          checked={!!checklist["study.goalStep"]}
          onChange={() => toggleCheck(currentDay, "study", "goalStep")}
        />
      </Card>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        {FIELDS.map((f) => (
          <Card key={f.key}>
            <p className="font-bold text-rose-700 text-sm mb-1.5">{f.label}</p>
            <JournalArea rows={3} value={study[f.key]} onChange={(v) => setField(f.key, v)} placeholder="..." />
          </Card>
        ))}
      </div>

      <Card>
        <p className="font-bold text-rose-700 text-sm mb-1.5">الوقت الذي خصصته لأهدافي هذا الشهر (بالدقيقة)</p>
        <LineInput value={study.timeMinutes} onChange={(v) => setField("timeMinutes", v)} placeholder="مثال: 45" />
      </Card>
    </div>
  );
}

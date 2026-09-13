import { useState } from "react";
import { useAppStore, TOTAL_DAYS } from "../store/useAppStore";
import Card from "../components/common/Card";
import { LineInput } from "../components/common/Inputs";

export default function SettingsPage() {
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);
  const currentDay = useAppStore((s) => s.currentDay);
  const setCurrentDay = useAppStore((s) => s.setCurrentDay);
  const resetAll = useAppStore((s) => s.resetAll);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl text-rose-700 mb-1">الإعدادات ⚙️</h1>
      <p className="text-ink-700/60 text-sm mb-4">خصصي تجربتك في Fatislaaay.</p>

      <Card className="mb-3">
        <p className="font-bold text-rose-700 text-sm mb-2">الملف الشخصي</p>
        <p className="text-[11px] text-ink-700/60 mb-1">اسمي</p>
        <LineInput value={profile.name} onChange={(v) => setProfile({ name: v })} placeholder="اسمك" />
      </Card>

      <Card className="mb-3">
        <p className="font-bold text-rose-700 text-sm mb-2">اليوم الحالي</p>
        <p className="text-[11px] text-ink-700/60 mb-2">
          حددي يومك الحالي في التحدي (1 إلى {TOTAL_DAYS}) لمزامنة الصفحة الرئيسية.
        </p>
        <input
          type="number"
          min={1}
          max={TOTAL_DAYS}
          value={currentDay}
          onChange={(e) => setCurrentDay(Number(e.target.value))}
          className="w-24 rounded-full border border-blush-300 bg-white px-3 py-2 text-sm text-center outline-none focus:border-rose-400"
        />
      </Card>

      <Card>
        <p className="font-bold text-rose-700 text-sm mb-2">إعادة تعيين البيانات</p>
        <p className="text-[11px] text-ink-700/60 mb-3">
          سيؤدي هذا إلى حذف كل بياناتك (اليوميات، المهام، التقدم) بشكل نهائي من هذا الجهاز.
        </p>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-full rounded-full border border-rose-300 text-rose-600 font-bold text-sm py-2.5"
          >
            حذف كل البيانات
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                resetAll();
                setConfirming(false);
              }}
              className="flex-1 rounded-full bg-rose-600 text-white font-bold text-sm py-2.5"
            >
              تأكيد الحذف
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="flex-1 rounded-full border border-blush-300 text-ink-700 font-bold text-sm py-2.5"
            >
              إلغاء
            </button>
          </div>
        )}
      </Card>

      <p className="text-center text-ink-700/40 text-[11px] mt-6">Fatislaaay ♥ تحدي 66 يوماً</p>
    </div>
  );
}

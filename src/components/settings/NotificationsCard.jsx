import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import Card from "../common/Card";
import {
  getPushSupport,
  getCurrentSubscription,
  enablePush,
  disablePush,
  sendTestPush,
} from "../../utils/push";

const ERRORS = {
  permission_denied: "لم يتم السماح بالإشعارات. فعّليها من إعدادات المتصفح ثم حاولي مجدداً.",
  missing_vapid_config: "إعدادات الإشعارات غير مكتملة على الخادم.",
  invalid_code: "تعذر التحقق من كود الدخول.",
};

export default function NotificationsCard() {
  const name = useAppStore((s) => s.profile.name);
  const startDate = useAppStore((s) => s.profile.startDate);
  const code = useAppStore((s) => s.access.code);

  const [support, setSupport] = useState(getPushSupport());
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getCurrentSubscription().then((s) => setSubscribed(Boolean(s))).catch(() => {});
  }, []);

  async function turnOn() {
    setBusy(true);
    setMsg("");
    try {
      await enablePush({ code, name, startDate });
      setSubscribed(true);
      await sendTestPush().catch(() => {});
      setMsg("تم التفعيل ✅ ستصلك رسالة كل صباح وكل مساء.");
    } catch (e) {
      setSupport(getPushSupport());
      setMsg(ERRORS[e.message] || "حدث خطأ، حاولي مرة أخرى.");
    } finally {
      setBusy(false);
    }
  }

  async function turnOff() {
    setBusy(true);
    await disablePush(code);
    setSubscribed(false);
    setMsg("تم إيقاف التذكيرات.");
    setBusy(false);
  }

  async function test() {
    setBusy(true);
    try {
      await sendTestPush();
      setMsg("أُرسل إشعار تجريبي 🔔");
    } catch {
      setMsg("تعذر إرسال الإشعار التجريبي.");
    }
    setBusy(false);
  }

  return (
    <Card className="mb-3">
      <p className="font-bold text-rose-700 text-sm mb-1">التذكيرات اليومية 🔔</p>
      <p className="text-[11px] text-ink-700/60 mb-3">
        إشعار كل صباح (أذكار الصباح) وكل مساء (أذكار المساء ومراجعة اليوم).
      </p>

      {support === "ios-install" && (
        <p className="text-[12px] text-ink-700 leading-relaxed bg-blush-100 rounded-2xl p-3">
          على الآيفون: افتحي الموقع في Safari ← اضغطي زر المشاركة ⬆️ ← «إضافة إلى الشاشة الرئيسية»، ثم افتحي
          التطبيق من الأيقونة الجديدة وفعّلي التذكيرات من هنا. (يتطلب iOS 16.4 أو أحدث)
        </p>
      )}

      {support === "unsupported" && (
        <p className="text-[12px] text-ink-700 bg-blush-100 rounded-2xl p-3">
          هذا المتصفح لا يدعم الإشعارات. جرّبي Chrome أو Safari (مضافاً للشاشة الرئيسية).
        </p>
      )}

      {support === "denied" && (
        <p className="text-[12px] text-ink-700 bg-blush-100 rounded-2xl p-3">
          الإشعارات محظورة لهذا الموقع. فعّليها من إعدادات المتصفح/الهاتف ثم أعيدي تحميل الصفحة.
        </p>
      )}

      {support === "ready" && !subscribed && (
        <button
          onClick={turnOn}
          disabled={busy}
          className="w-full rounded-full bg-rose-600 text-white font-bold text-sm py-2.5 disabled:opacity-60"
        >
          {busy ? "جارٍ التفعيل…" : "تفعيل التذكيرات"}
        </button>
      )}

      {support === "ready" && subscribed && (
        <div className="flex gap-2">
          <button
            onClick={test}
            disabled={busy}
            className="flex-1 rounded-full border border-blush-300 text-ink-700 font-bold text-sm py-2.5 disabled:opacity-60"
          >
            إشعار تجريبي
          </button>
          <button
            onClick={turnOff}
            disabled={busy}
            className="flex-1 rounded-full border border-rose-300 text-rose-600 font-bold text-sm py-2.5 disabled:opacity-60"
          >
            إيقاف
          </button>
        </div>
      )}

      {msg && <p className="text-[12px] text-rose-700 font-bold mt-2">{msg}</p>}
    </Card>
  );
}

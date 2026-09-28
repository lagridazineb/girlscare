import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { normalizeCode } from "../data/accessCodes";

const ERROR_MESSAGES = {
  invalid: "الكود غير صحيح، تأكدي من كتابته كما وصلك بالضبط ♥",
  already_used: "هذا الكود تم استخدامه من قبل على جهاز آخر. تواصلي مع من أرسل لكِ الكود.",
  network: "تعذر التحقق من الكود، تأكدي من اتصالك بالإنترنت وحاولي مرة أخرى.",
};

export default function AccessCodeGate() {
  const verifyAccessCode = useAppStore((s) => s.verifyAccessCode);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  function fail(reasonKey) {
    setError(ERROR_MESSAGES[reasonKey] || ERROR_MESSAGES.invalid);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const normalized = normalizeCode(code);
    if (!normalized || loading) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/redeem-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: normalized }),
      });
      const data = await res.json();
      if (data.ok) {
        verifyAccessCode(data.code);
      } else {
        fail(data.reason);
      }
    } catch {
      fail("network");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-blush-100 via-blush-50 to-white relative overflow-hidden">
      <span className="absolute top-10 right-8 text-xl animate-sparkle">✦</span>
      <span className="absolute top-24 left-10 text-lg animate-sparkle" style={{ animationDelay: "0.7s" }}>
        ✦
      </span>
      <span className="absolute bottom-16 left-10 text-2xl animate-float">🌸</span>
      <span className="absolute bottom-28 right-8 text-xl animate-float" style={{ animationDelay: "1s" }}>
        💗
      </span>

      <img src="/assets/logo.png" alt="Fatislaaay" className="w-36 sm:w-44 mb-3 animate-float" />

      <p className="text-rose-600 font-bold text-sm mb-1">أهلاً بكِ ✨</p>
      <h1 className="font-display text-3xl text-rose-700 mb-2">هذا المكان خاص بكِ وحدك</h1>
      <p className="text-ink-700/70 text-sm max-w-xs mb-8 leading-relaxed">
        أدخلي كود الدخول الخاص الذي وصلك، لتفتحي رحلتك في تحدي 66 يوماً ♥
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div
          className={`rounded-full border-2 bg-white transition-all ${
            error ? "border-rose-500" : "border-blush-300 focus-within:border-rose-400"
          } ${shake ? "animate-[shake_0.4s]" : ""}`}
        >
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError("");
            }}
            placeholder="FATI-XXXXX"
            dir="ltr"
            disabled={loading}
            className="w-full bg-transparent px-5 py-3.5 text-center text-sm tracking-[0.2em] font-bold text-rose-700 placeholder:text-blush-300 outline-none rounded-full disabled:opacity-60"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {error && <p className="text-rose-500 text-[12px] font-bold mt-2.5">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white font-bold text-sm py-3.5 shadow-lg disabled:opacity-70"
        >
          {loading ? "جارٍ التحقق..." : "افتحي المساحة الخاصة بكِ 🔐"}
        </button>
      </form>

      <p className="text-ink-700/40 text-[11px] mt-8 max-w-xs">
        ما توصلك الكود؟ تواصلي مع من أرسل لكِ رابط هذا التطبيق للحصول عليه.
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";

export default function Hero() {
  const navigate = useNavigate();
  const name = useAppStore((s) => s.profile.name);

  return (
    <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-b from-blush-100 to-blush-200 border border-blush-200 shadow-[var(--shadow-soft)] px-5 pt-6 pb-7 text-center">
      <span className="absolute top-4 right-5 text-xl animate-sparkle">✦</span>
      <span className="absolute top-10 left-6 text-lg animate-sparkle" style={{ animationDelay: "0.6s" }}>
        ✦
      </span>
      <span className="absolute bottom-6 left-8 text-2xl animate-float">🌸</span>

      <p className="text-rose-600 font-bold text-sm mb-1">{name ? `أهلاً ${name}` : "أهلاً بكِ"} ✨</p>
      <img src="/assets/logo.png" alt="Fatislaaay" className="w-32 sm:w-40 mx-auto drop-shadow-sm" />
      <p className="text-ink-700/70 text-sm mt-1 max-w-xs mx-auto leading-relaxed">
        رحلتك الخاصة نحو أفضل نسخة من نفسك، في 66 يوماً ♥
      </p>

      <img
        src="/assets/challenge-66-days.png"
        alt="تحدي 66 يوماً"
        className="w-40 sm:w-48 mx-auto my-3"
      />

      <button
        onClick={() => navigate("/book")}
        className="mx-auto flex items-center gap-2 bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg"
      >
        📖 اقرأ الكتاب قبل بداية التحدي
      </button>
    </div>
  );
}

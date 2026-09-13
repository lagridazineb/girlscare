import { useState } from "react";
import { useAppStore } from "../store/useAppStore";

export default function OnboardingPage({ onDone }) {
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [name, setName] = useState("");

  function handleStart() {
    completeOnboarding(name.trim());
    onDone?.();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-blush-100 via-blush-50 to-white">
      <img src="/assets/logo.png" alt="Fatislaaay" className="w-40 sm:w-48 mb-2 animate-float" />
      <p className="text-ink-700/70 text-sm max-w-xs mb-8 leading-relaxed">
        رحلتك الخاصة نحو أفضل نسخة من نفسك، في 66 يوماً من الالتزام، والتعلم، والنمو ♥
      </p>

      <img src="/assets/challenge-66-days.png" alt="تحدي 66 يوماً" className="w-44 sm:w-52 mb-4" />

      <div className="w-full max-w-xs">
        <p className="text-rose-600 font-bold text-sm mb-2">ما اسمك؟</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اكتبي اسمك هنا"
          className="w-full rounded-full border border-blush-300 bg-white px-5 py-3 text-center text-sm outline-none focus:border-rose-400 mb-4"
        />
        <button
          onClick={handleStart}
          className="w-full rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white font-bold text-sm py-3.5 shadow-lg"
        >
          ابدئي رحلتك ✨
        </button>
      </div>
    </div>
  );
}

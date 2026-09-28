import { useNavigate } from "react-router-dom";

export default function FocusPageShell({ label, children }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pb-6">
      <div className="w-full max-w-md flex items-center justify-between mb-3 px-1">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-rose-600 font-bold text-sm active:scale-95 transition-transform"
        >
          <span className="w-7 h-7 rounded-full bg-white border border-blush-300 flex items-center justify-center shadow-sm">
            ✕
          </span>
          الرئيسية
        </button>
        {label && <p className="text-rose-700/70 font-bold text-[11px]">{label}</p>}
      </div>

      <div className="w-full max-w-md book-shadow rounded-[10px]" style={{ height: "min(76vh, 700px)" }}>
        {children}
      </div>
    </div>
  );
}

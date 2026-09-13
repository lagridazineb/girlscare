export default function Checkbox({ checked, onChange, label, size = "md" }) {
  const dim = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center justify-between gap-3 w-full text-right group py-1.5"
    >
      <span
        className={`text-[13px] sm:text-sm leading-snug transition-colors ${
          checked ? "text-rose-700 line-through decoration-rose-300" : "text-ink-800"
        }`}
      >
        {label}
      </span>
      <span
        className={`shrink-0 ${dim} rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          checked
            ? "bg-rose-600 border-rose-600 scale-105"
            : "bg-white border-blush-400 group-active:scale-90"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
            <path
              d="M4 10.5L8 14.5L16 5.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

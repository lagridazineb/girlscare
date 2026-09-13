export function LineInput({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-transparent border-b border-dotted border-rose-300 focus:border-rose-500 outline-none py-1 text-[13px] sm:text-sm text-ink-800 placeholder:text-ink-700/30 transition-colors ${className}`}
    />
  );
}

export function JournalArea({ value, onChange, placeholder, rows = 3, className = "" }) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full resize-none bg-[repeating-linear-gradient(transparent,transparent_1.6em,#f3c8d4_1.6em,#f3c8d4_calc(1.6em_+_1px))] leading-[1.6em] outline-none text-[13px] sm:text-sm text-ink-800 placeholder:text-ink-700/30 rounded-lg p-1 ${className}`}
    />
  );
}

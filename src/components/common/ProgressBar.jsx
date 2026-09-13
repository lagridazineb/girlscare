export default function ProgressBar({ percent = 0, height = "h-3", showLabel = false }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full">
      <div className={`w-full ${height} rounded-full bg-blush-200/70 overflow-hidden`}>
        <div
          className="h-full rounded-full bg-gradient-to-l from-rose-600 via-rose-500 to-blush-400 transition-all duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && <p className="text-xs text-ink-700/70 mt-1">{clamped}% مكتمل</p>}
    </div>
  );
}

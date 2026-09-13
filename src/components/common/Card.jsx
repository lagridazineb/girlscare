export default function Card({ children, className = "", pad = true, ...props }) {
  return (
    <div
      className={`rounded-[1.5rem] bg-white/80 backdrop-blur-sm border border-blush-200/70 shadow-[var(--shadow-card)] ${
        pad ? "p-4" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default function BookPageFrame({ children, badge, className = "" }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-[10px] border-[3px] border-rose-300/80 bg-gradient-to-b from-[#fff8f6] to-[#fdeef0] ${className}`}
    >
      {badge && (
        <div className="absolute top-2.5 left-2.5 z-20 bg-rose-700 text-white text-[10px] sm:text-xs font-bold rounded-2xl px-2.5 py-1 text-center leading-tight shadow-md">
          {badge}
        </div>
      )}

      {/* Decorations live INSIDE the scrolling area (not the fixed frame) so
          they scroll away with the page content instead of floating on top
          of whatever the reader has scrolled to. */}
      <div className="relative z-10 h-full overflow-y-auto no-scrollbar px-4 sm:px-6 pt-5 pb-4">
        <img
          src="/assets/corner-flower.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-0 right-0 w-20 sm:w-28 opacity-80 -z-10"
          style={{ transform: "scaleX(-1)" }}
        />

        <div className="relative">{children}</div>

        <div className="relative h-14 mt-2 -mx-4 sm:-mx-6">
          <img
            src="/assets/corner-flower.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute bottom-0 left-0 w-16 sm:w-24 opacity-70 -z-10"
            style={{ transform: "rotate(180deg)" }}
          />
          <span className="absolute inset-x-0 bottom-1 text-center font-display tracking-wide text-rose-400/70 text-[10px] sm:text-xs">
            FATI SLAAY
          </span>
        </div>
      </div>
    </div>
  );
}

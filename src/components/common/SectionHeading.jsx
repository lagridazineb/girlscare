import Icon from "./Icon";

export default function SectionHeading({ icon, title, tone = "rose" }) {
  const bg = tone === "rose" ? "bg-rose-600" : "bg-gold-500";
  return (
    <div className="flex items-center gap-2 mb-2">
      {icon && (
        <span className={`${bg} text-white rounded-full p-1.5 shrink-0 shadow-sm`}>
          <Icon name={icon} size={13} />
        </span>
      )}
      <h4 className="font-bold text-[13px] sm:text-sm text-rose-800">{title}</h4>
      <span className="text-rose-400">♥</span>
    </div>
  );
}

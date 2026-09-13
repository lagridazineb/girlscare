import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";

const CARDS = [
  { to: "/todo", label: "مهامي اليوم", icon: "FaCheckSquare", color: "from-rose-400 to-rose-500" },
  { to: "/skincare", label: "العناية ببشرتي", icon: "FaSpa", color: "from-pink-300 to-rose-400" },
  { to: "/prayer", label: "أذكاري", icon: "FaMosque", color: "from-rose-300 to-rose-500" },
  { to: "/school", label: "مستقبلي", icon: "FaBookReader", color: "from-blush-400 to-rose-400" },
  { to: "/journal", label: "امتنان وتوكيدات", icon: "FaFeatherAlt", color: "from-rose-400 to-blush-500" },
  { to: "/progress", label: "تقدمي", icon: "FaChartLine", color: "from-gold-400 to-rose-400" },
];

export default function QuickCards() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-4">
      {CARDS.map((c) => (
        <button
          key={c.to}
          onClick={() => navigate(c.to)}
          className="flex flex-col items-center gap-1.5 rounded-2xl bg-white border border-blush-200 shadow-[var(--shadow-card)] py-3.5 px-1 active:scale-95 transition-transform"
        >
          <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${c.color} text-white flex items-center justify-center`}>
            <Icon name={c.icon} size={16} />
          </span>
          <span className="text-[11px] font-bold text-ink-800 text-center leading-tight">{c.label}</span>
        </button>
      ))}
    </div>
  );
}

import { NavLink } from "react-router-dom";
import Icon from "../common/Icon";

const ITEMS = [
  { to: "/", label: "الرئيسية", icon: "FaHome" },
  { to: "/book", label: "كتابي", icon: "FaBookOpen" },
  { to: "/journal", label: "امتنان وتوكيدات", icon: "FaFeatherAlt" },
  { to: "/todo", label: "قائمة مهامي", icon: "FaCheckSquare" },
  { to: "/skincare", label: "العناية ببشرتي", icon: "FaSpa" },
  { to: "/prayer", label: "أذكاري", icon: "FaMosque" },
  { to: "/school", label: "مستقبلي", icon: "FaBookReader" },
  { to: "/progress", label: "تقدمي", icon: "FaChartLine" },
  { to: "/settings", label: "الإعدادات", icon: "FaCog" },
];

export default function Sidebar() {
  return (
    <aside className="hidden sm:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-l border-blush-200 bg-white/70 backdrop-blur-md px-4 py-6">
      <div className="mb-8 px-2 flex items-center gap-2">
        <img src="/assets/logo.png" alt="Fatislaaay" className="w-11 h-11" />
        <div>
          <p className="font-display text-2xl text-rose-600 leading-none">Fatislaaay</p>
          <p className="text-[11px] text-ink-700/60 mt-1">تحدي 66 يوماً ♥</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isActive ? "bg-rose-600 text-white shadow-md" : "text-ink-700 hover:bg-blush-100"
              }`
            }
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-2 pt-4">
        <p className="text-[10px] text-ink-700/40 text-center">صُنع بحب لأجلك ♥</p>
      </div>
    </aside>
  );
}

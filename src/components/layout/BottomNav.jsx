import { NavLink } from "react-router-dom";
import Icon from "../common/Icon";

const ITEMS = [
  { to: "/", label: "الرئيسية", icon: "FaHome" },
  { to: "/book", label: "كتابي", icon: "FaBookOpen" },
  { to: "/todo", label: "مهامي", icon: "FaCheckSquare" },
  { to: "/progress", label: "تقدمي", icon: "FaChartLine" },
  { to: "/settings", label: "إعدادات", icon: "FaCog" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-blush-200 sm:hidden">
      <div className="flex items-center justify-around py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive ? "text-rose-600" : "text-ink-700/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                    isActive ? "bg-rose-100" : ""
                  }`}
                >
                  <Icon name={item.icon} size={17} />
                </span>
                <span className="text-[10px] font-bold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

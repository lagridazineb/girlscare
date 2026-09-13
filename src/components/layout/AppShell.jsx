import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function AppShell() {
  return (
    <div className="min-h-screen flex flex-row-reverse">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-20 sm:pb-6">
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 pb-5"
          style={{ paddingTop: "max(1.5rem, calc(env(safe-area-inset-top) + 0.75rem))" }}
        >
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

import { HashRouter, Routes, Route } from "react-router-dom";
import { useAppStore } from "./store/useAppStore";
import AppShell from "./components/layout/AppShell";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import TodoPage from "./pages/TodoPage";
import SkincarePage from "./pages/SkincarePage";
import PrayerPage from "./pages/PrayerPage";
import SchoolPage from "./pages/SchoolPage";
import JournalPage from "./pages/JournalPage";
import ProgressPage from "./pages/ProgressPage";
import SettingsPage from "./pages/SettingsPage";
import OnboardingPage from "./pages/OnboardingPage";

export default function App() {
  const onboarded = useAppStore((s) => s.profile.onboarded);

  if (!onboarded) {
    return <OnboardingPage onDone={() => {}} />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/skincare" element={<SkincarePage />} />
          <Route path="/prayer" element={<PrayerPage />} />
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

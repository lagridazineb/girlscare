import { useEffect } from "react";
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
import DayFocusPage from "./pages/DayFocusPage";
import ChallengeFocusPage from "./pages/ChallengeFocusPage";
import ProgressPage from "./pages/ProgressPage";
import SettingsPage from "./pages/SettingsPage";
import OnboardingPage from "./pages/OnboardingPage";
import AccessCodeGate from "./pages/AccessCodeGate";
import { syncSubscription } from "./utils/push";

export default function App() {
  const accessVerified = useAppStore((s) => s.access.verified);
  const onboarded = useAppStore((s) => s.profile.onboarded);
  const code = useAppStore((s) => s.access.code);
  const name = useAppStore((s) => s.profile.name);
  const startDate = useAppStore((s) => s.profile.startDate);

  // Keep the server's copy of name / start date fresh (only if notifications are on).
  useEffect(() => {
    if (accessVerified && onboarded) syncSubscription({ code, name, startDate });
  }, [accessVerified, onboarded, code, name, startDate]);

  if (!accessVerified) {
    return <AccessCodeGate />;
  }

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
          <Route path="/day/:day" element={<DayFocusPage />} />
          <Route path="/challenge/:week" element={<ChallengeFocusPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

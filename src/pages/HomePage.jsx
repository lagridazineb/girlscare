import Hero from "../components/home/Hero";
import ProgressCard from "../components/home/ProgressCard";
import TodayGlance from "../components/home/TodayGlance";
import QuickCards from "../components/home/QuickCards";

export default function HomePage() {
  return (
    <div className="pb-4">
      <Hero />
      <ProgressCard />
      <TodayGlance />
      <QuickCards />
    </div>
  );
}

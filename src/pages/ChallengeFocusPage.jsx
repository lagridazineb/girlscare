import { useParams, Navigate } from "react-router-dom";
import FocusPageShell from "../components/book/FocusPageShell";
import WeeklyChallengePage from "../components/book/pages/WeeklyChallengePage";
import { TOTAL_WEEK_BLOCKS } from "../utils/dayUtils";
import { getChallengeForWeek } from "../data/weeklyChallenges";

export default function ChallengeFocusPage() {
  const { week } = useParams();
  const weekNum = Number(week);

  if (!Number.isInteger(weekNum) || weekNum < 1 || weekNum > TOTAL_WEEK_BLOCKS || !getChallengeForWeek(weekNum)) {
    return <Navigate to="/" replace />;
  }

  return (
    <FocusPageShell label={`تحدي الأسبوع ${weekNum} من كتابك`}>
      <WeeklyChallengePage week={weekNum} />
    </FocusPageShell>
  );
}

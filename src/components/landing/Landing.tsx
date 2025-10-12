import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { PageBackground } from "../PageBackground";
import {
  LandingContainer,
  BackgroundEffects,
  WelcomeHeader,
  WelcomeTitle,
  WelcomeSubtitle,
} from "./LandingContainer";
import {
  LandingCardContainer,
  StatsContainer,
  StatCard,
  StatValue,
  StatLabel,
} from "./LandingCardContainer";
import { LandingCard } from "./LandingCard";
import {
  faClipboardList,
  faTasksAlt,
  faChartLine,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { RoutePaths } from "../../common/constants/routes";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { useGetTotalScore } from "../../hooks/questionnaire/useGetTotalScore";
import { useFetchHabits } from "../../hooks/habits/useFetchHabits";
import { useQuestionnaireData } from "../../hooks/questionnaire/useQuestionnaireData";
import { LoadingSpinner } from "../common/LoadingSpinner";

// Modern functional component for the Landing Dashboard
export function Landing() {
  const { user } = useContext(AuthContext);

  // Get user's first name, fallback to "there" if not available
  const userName = user?.firstName || "there";

  // Fetch real user data
  const { data: oralHealthScore, isLoading: isLoadingScore } =
    useGetTotalScore();
  const { data: habits, isLoading: isLoadingHabits } = useFetchHabits();
  const { data: questionnaireData, isLoading: isLoadingQuestionnaire } =
    useQuestionnaireData();

  // Calculate stats from real data
  const totalHabits = habits?.length || 0;
  const lastCompletedDate = questionnaireData?.lastCompleted || "Not completed";

  // Show loading state
  if (isLoadingScore || isLoadingHabits || isLoadingQuestionnaire) {
    return (
      <PageBackground>
        <BackgroundEffects />
        <LandingContainer>
          <WelcomeHeader>
            <WelcomeTitle>Welcome, {userName}</WelcomeTitle>
            <WelcomeSubtitle>Loading your dashboard...</WelcomeSubtitle>
          </WelcomeHeader>
          <StatsContainer>
            {[...Array(3)].map((_, index) => (
              <StatCard key={index}>
                <LoadingSpinner size="sm" />
              </StatCard>
            ))}
          </StatsContainer>
        </LandingContainer>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <WelcomeHeader>
          <WelcomeTitle>Welcome, {userName}</WelcomeTitle>
          <WelcomeSubtitle>
            Track your oral health journey with our comprehensive tools and
            insights
          </WelcomeSubtitle>
        </WelcomeHeader>

        <StatsContainer>
          <StatCard>
            <StatValue>
              {oralHealthScore ? `${oralHealthScore}%` : "N/A"}
            </StatValue>
            <StatLabel>Oral Health Score</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalHabits}</StatValue>
            <StatLabel>Habits Tracked</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{lastCompletedDate}</StatValue>
            <StatLabel>Last Assessment</StatLabel>
          </StatCard>
        </StatsContainer>

        <LandingCardContainer>
          <LandingCard
            title="Oral Health Assessment"
            description="Complete our comprehensive oral health assessment to get personalized recommendations and track your progress over time."
            buttonLink={RoutePaths.QUESTIONNAIRE}
            icon={faClipboardList}
            badge={
              questionnaireData?.lastCompleted ? "Completed" : "Incomplete"
            }
          />
          <LandingCard
            title="Habit Tracker"
            description="Monitor your daily oral health routines with our smart tracking system and visualize your progress with detailed analytics."
            buttonLink={RoutePaths.HABITS}
            icon={faTasksAlt}
          />
        </LandingCardContainer>
      </LandingContainer>
    </PageBackground>
  );
}

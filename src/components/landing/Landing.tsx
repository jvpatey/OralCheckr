import "bootstrap/dist/css/bootstrap.min.css";
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

// Modern functional component for the Landing Dashboard
export function Landing() {
  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <WelcomeHeader>
          <WelcomeTitle>Welcome to Your Dashboard</WelcomeTitle>
          <WelcomeSubtitle>
            Track your oral health journey with our comprehensive tools and
            insights
          </WelcomeSubtitle>
        </WelcomeHeader>

        <StatsContainer>
          <StatCard>
            <StatValue>95%</StatValue>
            <StatLabel>Health Score</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>12</StatValue>
            <StatLabel>Habits Tracked</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>28</StatValue>
            <StatLabel>Day Streak</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>A+</StatValue>
            <StatLabel>Progress Grade</StatLabel>
          </StatCard>
        </StatsContainer>

        <LandingCardContainer>
          <LandingCard
            title="Health Assessment"
            description="Complete our comprehensive oral health questionnaire to get personalized recommendations and track your progress over time."
            buttonLink={RoutePaths.QUESTIONNAIRE}
            icon={faClipboardList}
            badge="Updated"
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

import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { PageBackground } from "../PageBackground";
import { LandingContainer, LandingHeroSection } from "./LandingContainer";
import {
  BackgroundEffects,
  HeroCopy,
  HeroEyebrow,
  HeroTitle,
  HeroTitleAccent,
  HeroSubtitle,
  HeroDescription,
} from "../../containers/welcome/styles/WelcomeStyles";
import {
  LandingCardContainer,
  StatsContainer,
  StatCard,
  StatValue,
  StatLabel,
} from "./LandingCardContainer";
import { LandingCard } from "./LandingCard";
import { faClipboardList, faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths } from "../../common/constants/routes";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { useGetTotalScore } from "../../hooks/questionnaire/useGetTotalScore";
import { useFetchHabits } from "../../hooks/habits/useFetchHabits";
import { useQuestionnaireData } from "../../hooks/questionnaire/useQuestionnaireData";
import { LoadingSpinner } from "../common/LoadingSpinner";

// Authenticated dashboard — visual language aligned with the welcome page
export function Landing() {
  const { user } = useContext(AuthContext);

  const userName = user?.firstName || "there";

  const { data: oralHealthScore, isLoading: isLoadingScore } =
    useGetTotalScore();
  const { data: habits, isLoading: isLoadingHabits } = useFetchHabits();
  const { data: questionnaireData, isLoading: isLoadingQuestionnaire } =
    useQuestionnaireData();

  const totalHabits = habits?.length || 0;
  const lastCompletedDate = questionnaireData?.lastCompleted ?? "--";

  if (isLoadingScore || isLoadingHabits || isLoadingQuestionnaire) {
    return (
      <PageBackground>
        <BackgroundEffects />
        <LandingContainer>
          <LandingHeroSection>
            <HeroCopy>
              <HeroEyebrow>Your dashboard</HeroEyebrow>
              <HeroTitle>
                Welcome, <HeroTitleAccent>{userName}</HeroTitleAccent>
              </HeroTitle>
              <HeroDescription>Loading your dashboard…</HeroDescription>
            </HeroCopy>
          </LandingHeroSection>
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
        <LandingHeroSection>
          <HeroCopy>
            <HeroEyebrow>Your dashboard</HeroEyebrow>
            <HeroTitle>
              Welcome, <HeroTitleAccent>{userName}</HeroTitleAccent>
            </HeroTitle>
            <HeroSubtitle>
              Track your oral health journey with our comprehensive tools and
              insights.
            </HeroSubtitle>
          </HeroCopy>
        </LandingHeroSection>

        <StatsContainer>
          <StatCard>
            <StatValue>
              {oralHealthScore ? `${oralHealthScore}%` : "N/A"}
            </StatValue>
            <StatLabel>Oral health score</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalHabits}</StatValue>
            <StatLabel>Habits tracked</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{lastCompletedDate}</StatValue>
            <StatLabel>Last assessment</StatLabel>
          </StatCard>
        </StatsContainer>

        <LandingCardContainer>
          <LandingCard
            title="Oral Health Questionnaire"
            description="Complete our comprehensive oral health questionnaire to get personalized recommendations and track your progress over time."
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

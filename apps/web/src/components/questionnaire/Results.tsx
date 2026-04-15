import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OralHealthStatus } from "./OralHealthStatus";
import { Recommendations } from "../../containers/questionnaire/Recommendations";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import { BackgroundEffects, HeroTitleAccent } from "../../containers/welcome/styles/WelcomeStyles";
import {
  QuestionnairePageShell,
  QuestionnaireStackHeader,
  QuestionnaireGuestSignupCta,
} from "./styles/QuestionnaireFlowLayout";
import {
  HeaderMainRow,
  HeaderTitleColumn,
  HabitHeroEyebrow,
  HeaderText,
  HeaderSubtitle,
} from "../habit-tracker/habits/HabitComponents";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { SignUpModal } from "../../containers/welcome/SignUpModal";
import { useQuestionnaireData } from "../../hooks/questionnaire/useQuestionnaireData";
import { RoutePaths } from "../../common/constants/routes";
import {
  BentoGrid,
  LargeBentoCard,
  SmallBentoCard,
  BentoCardContent,
  ModernActionSection,
  DateDisplayText,
  AssessLabel,
  ResultsQuestionnaireCta,
  ResultsHeaderActions,
  ResultsHeaderIconCta,
} from "./styles/ResultsStyles";

export function Results() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();
  const { data: questionnaireData, hasNoData } = useQuestionnaireData();

  const hasCompletedQuestionnaire =
    !hasNoData && Boolean(questionnaireData?.lastCompleted);

  const handleQuestionnaireCta = () => {
    navigate(RoutePaths.QUESTIONNAIRE);
  };

  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <QuestionnairePageShell $isAuthenticated={isAuthenticated}>
          <QuestionnaireStackHeader>
            <HeaderMainRow>
              <HeaderTitleColumn>
                <HabitHeroEyebrow>Improve</HabitHeroEyebrow>
                <HeaderText>
                  Oral Health <HeroTitleAccent>Summary</HeroTitleAccent>
                </HeaderText>
                <HeaderSubtitle>
                  Your oral health score, last assessment, and personalized
                  recommendations.
                </HeaderSubtitle>
              </HeaderTitleColumn>
              <ResultsHeaderActions>
                <ResultsHeaderIconCta
                  to={RoutePaths.APPOINTMENT_SUMMARY}
                  aria-label="Open Oral Health Report"
                  title="Oral Health Report"
                >
                  <FontAwesomeIcon icon={faFileLines} />
                </ResultsHeaderIconCta>
              </ResultsHeaderActions>
            </HeaderMainRow>
          </QuestionnaireStackHeader>

          <BentoGrid>
            <LargeBentoCard>
              <BentoCardContent>
                <OralHealthStatus />
              </BentoCardContent>
            </LargeBentoCard>

            <SmallBentoCard>
              <BentoCardContent>
                <DateDisplayText>
                  {questionnaireData?.lastCompleted ?? "--"}
                </DateDisplayText>
                <AssessLabel>Last assess</AssessLabel>
                <ResultsQuestionnaireCta onClick={handleQuestionnaireCta}>
                  {hasCompletedQuestionnaire
                    ? "Retake questionnaire"
                    : "Take questionnaire"}
                </ResultsQuestionnaireCta>
              </BentoCardContent>
            </SmallBentoCard>

            <Recommendations />
          </BentoGrid>

          {user && user.role === "guest" && (
            <ModernActionSection>
              <QuestionnaireGuestSignupCta
                onClick={() => setShowSignUpModal(true)}
              >
                Want a more personalized experience? Create an account today.
              </QuestionnaireGuestSignupCta>
            </ModernActionSection>
          )}
        </QuestionnairePageShell>
      </LandingContainer>

      {showSignUpModal && (
        <SignUpModal
          show={showSignUpModal}
          handleClose={() => setShowSignUpModal(false)}
        />
      )}
    </PageBackground>
  );
}

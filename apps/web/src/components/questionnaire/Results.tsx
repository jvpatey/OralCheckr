import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OralHealthStatus } from "./OralHealthStatus";
import { Recommendations } from "../../containers/questionnaire/Recommendations";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import { BackgroundEffects } from "../../containers/welcome/styles/WelcomeStyles";
import {
  HeroEyebrow,
  HeroTitleAccent,
} from "../../containers/welcome/styles/WelcomeStyles";
import {
  QuestionnairePageShell,
  QuestionnaireHeroCopy,
  QuestionnairePageTitle,
  QuestionnaireGuestSignupCta,
} from "./styles/QuestionnaireFlowLayout";
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
          <QuestionnaireHeroCopy>
            <HeroEyebrow>Improve</HeroEyebrow>
            <QuestionnairePageTitle>
              Questionnaire <HeroTitleAccent>Results</HeroTitleAccent>
            </QuestionnairePageTitle>
          </QuestionnaireHeroCopy>

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

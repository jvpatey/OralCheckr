import { useState, useContext } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { OralHealthStatus } from "./OralHealthStatus";
import { Recommendations } from "../../containers/questionnaire/Recommendations";
import { PageBackground } from "../PageBackground";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { SignUpModal } from "../../containers/welcome/SignUpModal";
import { useGetTotalScore } from "../../hooks/questionnaire/useGetTotalScore";
import { useQuestionnaireData } from "../../hooks/questionnaire/useQuestionnaireData";
import { getScoreColor } from "../../containers/questionnaire/utils/oral-health-status-utils";
import { RoutePaths } from "../../common/constants/routes";
import {
  ModernResultsContainer,
  ResultsHeroTitle,
  BentoGrid,
  LargeBentoCard,
  SmallBentoCard,
  BentoCardContent,
  ModernActionSection,
  ModernSignUpButton,
  ModernRetakeButton,
  DateDisplayText,
  AssessmentLabel,
} from "./styles/ResultsStyles";

export function Results() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: score } = useGetTotalScore();
  const { data: questionnaireData } = useQuestionnaireData();

  const scoreColor = score ? getScoreColor(score as number, theme) : theme.blue;

  const handleRetakeAssessment = () => {
    navigate(RoutePaths.QUESTIONNAIRE);
  };

  return (
    <PageBackground>
      <ModernResultsContainer $isAuthenticated={isAuthenticated}>
        <ResultsHeroTitle>Questionnaire Results</ResultsHeroTitle>

        <BentoGrid>
          <LargeBentoCard $scoreColor={scoreColor}>
            <BentoCardContent>
              <OralHealthStatus />
            </BentoCardContent>
          </LargeBentoCard>

          <SmallBentoCard>
            <BentoCardContent>
              <DateDisplayText>
                {questionnaireData?.lastCompleted || "Not available"}
              </DateDisplayText>
              <AssessmentLabel>Last Questionnaire</AssessmentLabel>
              <ModernRetakeButton onClick={handleRetakeAssessment}>
                Retake Questionnaire
              </ModernRetakeButton>
            </BentoCardContent>
          </SmallBentoCard>

          <Recommendations />
        </BentoGrid>

        {/* If the user is a guest, display a sign up button*/}
        {user && user.role === "guest" && (
          <ModernActionSection>
            <ModernSignUpButton onClick={() => setShowSignUpModal(true)}>
              Want a more personalized experience? Create an account today.
            </ModernSignUpButton>
          </ModernActionSection>
        )}
      </ModernResultsContainer>

      {showSignUpModal && (
        <SignUpModal
          show={showSignUpModal}
          handleClose={() => setShowSignUpModal(false)}
        />
      )}
    </PageBackground>
  );
}

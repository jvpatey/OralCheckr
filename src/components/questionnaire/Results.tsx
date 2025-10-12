import { useState, useContext } from "react";
import { useTheme } from "styled-components";
import { OralHealthStatus } from "./OralHealthStatus";
import { Recommendations } from "../../containers/questionnaire/Recommendations";
import { PageBackground } from "../PageBackground";
import { AuthContext } from "../../containers/authentication/AuthContext";
import { SignUpModal } from "../../containers/welcome/SignUpModal";
import { useGetTotalScore } from "../../hooks/questionnaire/useGetTotalScore";
import { getScoreColor } from "../../containers/questionnaire/utils/oral-health-status-utils";
import {
  ModernResultsContainer,
  ResultsHeroTitle,
  BentoGrid,
  LargeBentoCard,
  RegularBentoCard,
  BentoCardHeader,
  BentoCardContent,
  ModernActionSection,
  ModernSignUpButton,
} from "./styles/ResultsStyles";

export function Results() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const theme = useTheme();
  const { data: score } = useGetTotalScore();

  const scoreColor = score ? getScoreColor(score as number, theme) : theme.blue;

  return (
    <PageBackground>
      <ModernResultsContainer $isAuthenticated={isAuthenticated}>
        <ResultsHeroTitle>Assessment Results</ResultsHeroTitle>

        <BentoGrid>
          <LargeBentoCard $scoreColor={scoreColor}>
            <BentoCardHeader>Your Oral Health Score</BentoCardHeader>
            <BentoCardContent>
              <OralHealthStatus />
            </BentoCardContent>
          </LargeBentoCard>

          <RegularBentoCard>
            <BentoCardHeader>Personalized Recommendations</BentoCardHeader>
            <BentoCardContent>
              <Recommendations />
            </BentoCardContent>
          </RegularBentoCard>
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

import { Link } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import { StartQuestionnaireProps } from "../../common/types/questionnaire/start-questionnaire.types";
import {
  ModernContainer,
  HeroTitle,
  DescriptionText,
  ActionSection,
  GradientButton,
} from "./styles/StartQuestionnaireStyles";

// Modern fluid start questionnaire component
export function StartQuestionnaire({
  isAuthenticated,
}: StartQuestionnaireProps) {
  return (
    <PageBackground>
      <LandingContainer>
        <ModernContainer $isAuthenticated={isAuthenticated}>
          <HeroTitle>Oral Health Questionnaire</HeroTitle>

          <DescriptionText>
            Take our comprehensive oral health questionnaire to evaluate your
            dental well-being and get personalized insights.
          </DescriptionText>

          <DescriptionText>
            Receive a detailed score and tailored recommendations based on your
            answers to improve your oral health journey.
          </DescriptionText>

          <ActionSection>
            <GradientButton as={Link} to={`${RoutePaths.QUESTIONNAIRE}/1`}>
              Begin Questionnaire
            </GradientButton>
          </ActionSection>
        </ModernContainer>
      </LandingContainer>
    </PageBackground>
  );
}

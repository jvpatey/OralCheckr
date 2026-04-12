import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import {
  BackgroundEffects,
  HeroEyebrow,
  HeroTitleAccent,
  HeroSubtitle,
  HeroDescription,
} from "../../containers/welcome/styles/WelcomeStyles";
import { StartQuestionnaireProps } from "../../common/types/questionnaire/start-questionnaire.types";
import {
  QuestionnaireFlowContainer,
  QuestionnaireHeroCopy,
  QuestionnairePageTitle,
  QuestionnaireCtaSection,
  QuestionnaireCtaLink,
} from "./styles/QuestionnaireFlowLayout";

export function StartQuestionnaire({
  isAuthenticated,
}: StartQuestionnaireProps) {
  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <QuestionnaireFlowContainer $isAuthenticated={isAuthenticated}>
          <QuestionnaireHeroCopy>
            <HeroEyebrow>Assess</HeroEyebrow>
            <QuestionnairePageTitle>
              Oral Health <HeroTitleAccent>Questionnaire</HeroTitleAccent>
            </QuestionnairePageTitle>
            <HeroSubtitle>
              Take our comprehensive oral health questionnaire to evaluate your
              dental well-being and get personalized insights.
            </HeroSubtitle>
            <HeroDescription>
              Receive a detailed score and tailored recommendations based on your
              answers to improve your oral health journey.
            </HeroDescription>
            <QuestionnaireCtaSection>
              <QuestionnaireCtaLink to={`${RoutePaths.QUESTIONNAIRE}/1`}>
                Begin questionnaire
              </QuestionnaireCtaLink>
            </QuestionnaireCtaSection>
          </QuestionnaireHeroCopy>
        </QuestionnaireFlowContainer>
      </LandingContainer>
    </PageBackground>
  );
}

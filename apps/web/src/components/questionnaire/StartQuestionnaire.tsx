import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import {
  BackgroundEffects,
  HeroTitleAccent,
  HeroDescription,
} from "../../containers/welcome/styles/WelcomeStyles";
import { StartQuestionnaireProps } from "../../common/types/questionnaire/start-questionnaire.types";
import {
  QuestionnaireFlowContainer,
  QuestionnaireStackHeader,
  QuestionnaireFlowBodyCentered,
  QuestionnaireCtaSectionCentered,
  QuestionnaireCtaLink,
} from "./styles/QuestionnaireFlowLayout";
import {
  HeaderMainRow,
  HeaderTitleColumn,
  HabitHeroEyebrow,
  HeaderText,
  HeaderSubtitle,
} from "../habit-tracker/habits/HabitComponents";

export function StartQuestionnaire({
  isAuthenticated,
}: StartQuestionnaireProps) {
  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <QuestionnaireFlowContainer $isAuthenticated={isAuthenticated}>
          <QuestionnaireStackHeader>
            <HeaderMainRow>
              <HeaderTitleColumn>
                <HabitHeroEyebrow>Assess</HabitHeroEyebrow>
                <HeaderText>
                  Oral Health <HeroTitleAccent>Questionnaire</HeroTitleAccent>
                </HeaderText>
                <HeaderSubtitle>
                  Take our comprehensive oral health questionnaire to evaluate
                  your dental well-being and get personalized insights.
                </HeaderSubtitle>
              </HeaderTitleColumn>
            </HeaderMainRow>
          </QuestionnaireStackHeader>
          <QuestionnaireFlowBodyCentered>
            <HeroDescription>
              Receive a detailed score and tailored recommendations based on your
              answers to improve your oral health journey.
            </HeroDescription>
            <QuestionnaireCtaSectionCentered>
              <QuestionnaireCtaLink to={`${RoutePaths.QUESTIONNAIRE}/1`}>
                Begin questionnaire
              </QuestionnaireCtaLink>
            </QuestionnaireCtaSectionCentered>
          </QuestionnaireFlowBodyCentered>
        </QuestionnaireFlowContainer>
      </LandingContainer>
    </PageBackground>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import { QuestionnaireCardContainer } from "./styles/QuestionnaireCardContainer";
import { QuestionnaireCard } from "./styles/QuestionnaireCard";
import { StartQuestionnaireProps } from "../../common/types/questionnaire/start-questionnaire.types";
import {
  TitleText,
  CardText,
  ButtonContainer,
  StartButton,
} from "./styles/StartQuestionnaireStyles";

// Functional component for the page to start the questionnaire if not completed previously
export function StartQuestionnaire({
  isAuthenticated,
}: StartQuestionnaireProps) {
  return (
    <PageBackground>
      <LandingContainer>
        <QuestionnaireCardContainer $isAuthenticated={isAuthenticated}>
          <QuestionnaireCard>
            <TitleText>Oral Health Questionnaire</TitleText>
            <CardText>
              Take our oral health questionnaire to evaluate your dental
              well-being.
            </CardText>
            <CardText>
              Receive a personalized score and tailored recommendations based on
              your answers to gain valuable insights and improve your oral
              health.
            </CardText>
            <ButtonContainer>
              <StartButton as={Link} to={`${RoutePaths.QUESTIONNAIRE}/1`}>
                Begin
              </StartButton>
            </ButtonContainer>
          </QuestionnaireCard>
        </QuestionnaireCardContainer>
      </LandingContainer>
    </PageBackground>
  );
}

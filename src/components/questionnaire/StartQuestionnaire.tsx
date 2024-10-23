import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import styled from "styled-components";
import { PageBackground } from "../PageBackground";
import { LandingContainer } from "../landing/LandingContainer";
import { QuestionnaireCardContainer } from "./QuestionnaireCardContainer";
import { QuestionnaireCard } from "./QuestionnaireCard";
import { NavigationButton } from "./NavigationButton";

// Styled-components for Start Questionnaire Page

const TitleText = styled.h1`
  color: ${({ theme }) => theme.blue};
  margin-top: 20px;
  margin-bottom: 60px;
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const CardText = styled.h5`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 20px;
  margin-right: 40px;
  margin-left: 40px;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const StartButton = styled(NavigationButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%; // Wider button
  padding: 20px 30px;
  font-size: 1.5rem;
  text-align: center;
  border: solid 2px;
  border-color: ${({ theme }) => theme.green};
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.accentBackgroundColor};

  @media (max-width: 768px) {
    width: 80%;
    padding: 15px 20px;
    font-size: 1.25rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border: solid 2px;
    border-color: ${({ theme }) => theme.green};
  }
`;

// Functional component for the page to start the questionnaire if not completed previously
export function StartQuestionnaire({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
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

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../common/Routes";
import { getFullPath } from "../../common/Routes";
import styled from "styled-components";
import { PageBackground } from "../shared/PageBackground";
import { DashboardContainer } from "../dashboard/DashboardContainer";
import { QuestionnaireCardContainer } from "./QuestionnaireCardContainer";
import { QuestionnaireCard } from "./QuestionnaireCard";
import { NavigationButton } from "./NavigationButton";
import { colors } from "../../common/color-utils";

// Styled-components for Start Questionnaire Page

const TitleText = styled.h1`
  color: ${colors.blue};
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
  color: ${colors.textGrey};
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
  border-color: ${colors.green};
  background-color: ${colors.green};
  color: ${colors.bgWhite};

  @media (max-width: 768px) {
    width: 80%;
    padding: 15px 20px;
    font-size: 1.25rem;
  }

  &:hover {
    background-color: ${colors.bgWhite};
    color: ${colors.green};
    border: solid 2px;
    border-color: ${colors.green};
  }
`;

// Functional component for the page to start the questionnaire if not completed previously
export function StartQuestionnaire() {
  return (
    <PageBackground>
      <DashboardContainer>
        <QuestionnaireCardContainer>
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
              <StartButton
                as={Link}
                to={`${getFullPath(RoutePaths.QUESTIONNAIRE)}/1`}
              >
                Begin
              </StartButton>
            </ButtonContainer>
          </QuestionnaireCard>
        </QuestionnaireCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

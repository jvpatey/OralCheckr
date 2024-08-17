import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { RoutePaths } from "../common/Routes";
import { getFullPath } from "../common/Routes";
import styled from "styled-components";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";
import { NavigationButton } from "../components/styled/NavigationButton";
import { colors } from "../common/color-utils";

// styled-component styles for Start Questionnaire Page

const TitleText = styled.h1`
  color: ${colors.blue};
  margin-top: 20px;
  margin-bottom: 20px;
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

const StartButton = styled(NavigationButton)`
  width: 25%;
  text-align: center;
  border: solid;
  border-color: ${colors.blue};
  color: ${colors.bgWhite};

  @media (max-width: 768px) {
    width: 40%;
  }

  &:hover {
    background-color: ${colors.bgWhite};
    color: ${colors.blue};
    border: solid;
    border-color: ${colors.blue};
  }
`;

export function StartQuestionnaire() {
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
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
            <CardText>
              Utilize our recommendations and track your progress using our
              integrated habit tracker.
            </CardText>
            <StartButton
              as={Link}
              to={`${getFullPath(RoutePaths.QUESTIONNAIRE)}/1`}
            >
              Begin
            </StartButton>
          </QuestionnaireCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

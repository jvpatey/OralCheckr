import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { RoutePaths } from "../common/Routes";
import { getFullPath } from "../common/Routes";
import styled from "styled-components";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";

// styled-component styles for Start Questionnaire Page

const TitleText = styled.h1`
  color: #07889b;
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
  color: #222831;
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

const Button = styled.button<{ $start?: boolean }>`
  background-color: ${(props) => (props.$start ? "#07889B" : "white")};
  color: ${(props) => (props.$start ? "#F5F5F5" : "#07889B")};
  font-weight: bold;
  border: 2px solid ${(props) => (props.$start ? "#07889B" : "#07889B")};
  width: 25%; /* Increased button width */
  margin: 20px auto;
  border-radius: 50px;
  padding: 0.5em 1em;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${(props) => (props.$start ? "#F5F5F5" : "#07889B")};
    color: ${(props) => (props.$start ? "#07889B" : "#F5F5F5")};
    border-color: #07889b;
    border-width: 2px;
  }

  @media (max-width: 768px) {
    width: 40%;
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
            <Button $start as={Link} to={getFullPath(RoutePaths.QUESTIONNAIRE)}>
              Begin
            </Button>
          </QuestionnaireCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

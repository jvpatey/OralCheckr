import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RoutePaths } from "../common/Routes";
import { getFullPath } from "../common/Routes";

// styled-component styles for Start Questionnaire Page

const PageBackground = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    max-width: 100vw;
  }
`;

const DashboardCardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;

  @media (max-width: 1100px) {
    margin-left: 0;
    padding: 10px;
  }

  @media (max-height: 700px) {
    padding: 10px;
  }
`;

const StyledCard = styled(Card)`
  width: 80vw;
  max-width: 1400px;
  height: 80vh;
  min-height: 60vh;
  background-color: #e0e0e0;
  border: transparent;
  border-radius: 20px;
  margin-top: 68px;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @media (max-height: 700px) {
    height: auto;
    margin-top: 20px;
  }
`;

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
          <StyledCard>
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
          </StyledCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

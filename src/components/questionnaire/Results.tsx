import styled, { keyframes } from "styled-components";
import { Card } from "react-bootstrap";
import { OralHealthStatus } from "./OralHealthStatus";
import { Recommendations } from "../../containers/questionnaire/Recommendations";
import { PageBackground } from "../PageBackground";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultsCard = styled(Card)`
  width: 100%;
  max-width: 1200px;
  height: auto;
  max-height: calc(100vh - 120px);
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border: transparent;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  animation: ${fadeUp} 1s ease-out;

  @media (max-width: 1024px) {
    max-width: 700px;
  }

  @media (max-width: 768px) {
    max-width: 600px;
    max-height: calc(100vh - 140px);
  }

  @media (max-width: 375px) {
    max-width: 90vw;
    max-height: calc(100vh - 100px);
  }
`;

export const ResultsCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  width: calc(100% - 200px);
  margin-left: 200px;
  padding: 20px;
  margin-top: 70px;

  @media (max-width: 768px) {
    width: calc(100% - 50px);
    margin-left: 50px;
    padding: 10px;
  }

  @media (max-width: 375px) {
    padding: 5px;
    margin-top: 50px;
  }

  @media (max-height: 700px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const TilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 10px;
    gap: 15px;
  }
`;

const TileWrapper = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  height: 400px;

  @media (max-width: 1024px) {
    width: 100%;
    height: 380px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 375px) {
    height: 320px;
    min-height: 320px;
    max-height: 320px;
  }
`;

export function Results() {
  return (
    <PageBackground>
      <ResultsCardContainer>
        <ResultsCard>
          <TilesContainer>
            <TileWrapper>
              <OralHealthStatus />
            </TileWrapper>
            <TileWrapper>
              <Recommendations />
            </TileWrapper>
          </TilesContainer>
        </ResultsCard>
      </ResultsCardContainer>
    </PageBackground>
  );
}

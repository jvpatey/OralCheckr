import styled from "styled-components";
import { Card } from "react-bootstrap";
import { OralHealthStatus } from "./OralHealthStatus";
import { Recommendations } from "../../containers/questionnaire/Recommendations";
import { colors } from "../../common/color-utils";
import { PageBackground } from "../shared/PageBackground";

// Container to hold the tiles inside the Questionnaire Card
const ResultsCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  height: auto;
  max-height: calc(100vh - 120px);
  background-color: ${colors.disabledBgGrey};
  border: transparent;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 20px;

  @media (max-width: 1024px) {
    padding: 10px;
    gap: 15px;
  }
`;

const TileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.bgWhite};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 400px;

  @media (max-width: 1024px) {
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

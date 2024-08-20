import styled from "styled-components";
import { QuestionnaireCardContainer } from "../components/styled/QuestionnaireCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";
import { OralHealthStatus } from "../components/OralHealthStatus";
import { Recommendations } from "../components/Recommendations";
import { colors } from "../common/color-utils";
import { PageBackground } from "../components/styled/PageBackground";

// Container to hold the tiles inside the Questionnaire Card
const TilesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 40px;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 5px;
  }
`;

const TileWrapper = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgWhite};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;

  @media (max-width: 950px) {
    width: 100%;
    height: 280px;
  }
`;

export function Results() {
  return (
    <PageBackground>
      <QuestionnaireCardContainer>
        <QuestionnaireCard>
          <TilesContainer>
            <TileWrapper>
              <OralHealthStatus />
            </TileWrapper>
            <TileWrapper>
              <Recommendations />
            </TileWrapper>
          </TilesContainer>
        </QuestionnaireCard>
      </QuestionnaireCardContainer>
    </PageBackground>
  );
}

import styled from "styled-components";
import { Card } from "react-bootstrap";
import { colors } from "../../common/color-utils";

// Styled component for the Card that contains the Questionnaire
export const QuestionnaireCard = styled(Card)`
  width: 75vw;
  max-width: 1100px;
  height: auto;
  max-height: calc(100vh - 140px);
  min-height: 60vh;
  background-color: ${colors.disabledBgGrey};
  border: transparent;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (min-height: 700px) {
    min-height: 70vh;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  @media (max-width: 768px) {
    width: 90vw;
    max-width: 90vw;
    max-height: calc(100vh - 100px);
  }
`;

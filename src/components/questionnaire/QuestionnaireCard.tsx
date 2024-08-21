import styled from "styled-components";
import { Card } from "react-bootstrap";
import { colors } from "../../common/color-utils";

// Styled component for the QuestionnaireCard

export const QuestionnaireCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
  max-width: 800px;
  height: auto;
  max-height: calc(100vh - 100px);
  min-height: 60vh;
  background-color: ${colors.disabledBgGrey};
  border: transparent;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 1200px) {
    max-width: 900px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 80vw;
    max-width: 750px;
    max-height: calc(100vh - 80px);
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 85vw;
    max-width: 700px;
    padding: 10px;
    max-height: calc(100vh - 100px);
  }

  @media (max-width: 375px) {
    width: 70vw;
    padding: 8px;
  }
`;

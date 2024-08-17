import styled from "styled-components";
import { Card } from "react-bootstrap";
import { colors } from "../../common/color-utils";

// Styled component for the Card that contains the Questionnaire
export const QuestionnaireCard = styled(Card)`
  width: 80vw;
  max-width: 1400px;
  height: 80vh;
  min-height: 60vh;
  background-color: ${colors.disabledBgGrey};
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

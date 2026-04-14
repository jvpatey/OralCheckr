import styled from "styled-components";
import { AUTH_QUESTIONNAIRE_MARGIN_LEFT } from "../../../styles/SharedStyles";

interface QuestionnaireCardContainerProps {
  $isAuthenticated: boolean;
}

// Styled component to contain the questionnaire card
export const QuestionnaireCardContainer = styled.div<QuestionnaireCardContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? `calc(100% - ${AUTH_QUESTIONNAIRE_MARGIN_LEFT})` : "100%"};
  margin-left: ${({ $isAuthenticated }) =>
    $isAuthenticated ? AUTH_QUESTIONNAIRE_MARGIN_LEFT : "0"};
  padding: 40px 20px;
  min-height: calc(100vh - 120px);

  @media (max-width: 1199px) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 800px) {
    padding: 24px 16px;
    min-height: calc(100vh - 100px);
  }

  @media (max-width: 375px) {
    padding: 12px 10px;
  }

  @media (max-height: 700px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

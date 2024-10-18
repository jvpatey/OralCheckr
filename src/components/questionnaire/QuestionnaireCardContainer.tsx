import styled from "styled-components";

// Prop to determine if the user is authenticated
interface QuestionnaireCardContainerProps {
  isAuthenticated: boolean;
}

// Styled component to contain the questionnaire card
export const QuestionnaireCardContainer = styled.div<QuestionnaireCardContainerProps>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  width: ${({ isAuthenticated }) => (isAuthenticated ? 'calc(100% - 200px)' : '100%')};
  margin-left: ${({ isAuthenticated }) => (isAuthenticated ? '200px' : '0')};
  padding: 20px;
  margin-top: 70px;

  @media (max-width: 768px) {
    width: ${({ isAuthenticated }) => (isAuthenticated ? 'calc(100% - 50px)' : '100%')};
    margin-left: ${({ isAuthenticated }) => (isAuthenticated ? '50px' : '0')};
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

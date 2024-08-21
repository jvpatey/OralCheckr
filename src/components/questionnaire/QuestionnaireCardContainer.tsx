import styled from "styled-components";

// Styled component to contain the questionnaire card
export const QuestionnaireCardContainer = styled.div`
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

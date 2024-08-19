import styled from "styled-components";

// Styled component to contain the questionnaire card
export const QuestionnaireCardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: calc(100% - 200px);
  margin-left: 200px;
  padding: 20px;
  margin-top: 70px;

  @media (max-width: 768px) {
    width: calc(100% - 90px);
    margin-left: 90px;
    padding: 10px;
    margin-top: 70px;
  }

  @media (max-height: 700px) {
    padding: 10px;
    overflow-y: auto;
    flex-direction: column;
  }
`;

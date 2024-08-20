import { Card, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { colors } from "../common/color-utils";

// Styled-component styles for Oral Health Status Component
const StyledHeader = styled(Card.Header)`
  background-color: ${colors.bgWhite};
  color: ${colors.blue};
  font-size: 25px;
  font-weight: bold;
  border: none;
  text-align: center;
  margin-top: 50px;

  @media (max-width: 950px) {
    font-size: 18px;
  }
`;

const StyledText = styled.p`
  color: ${colors.textGrey};
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 18px;

  @media (max-width: 950px) {
    font-size: 16px;
  }
`;

const ScoreSpan = styled.span`
  color: ${colors.green};
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 950px) {
    font-size: 18px;
  }
`;

const CustomProgressBar = styled(ProgressBar)`
  height: 30px;
  margin-top: 60px;
  .progress-bar {
    background-color: ${colors.green};
    font-size: 16px;
    border-radius: 20px;
  }

  @media (max-width: 950px) {
    margin-bottom: 20px;
  }
`;

const MessageText = styled.p`
  color: ${colors.textGrey};
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 15px;

  @media (max-width: 950px) {
    font-size: 16px;
  }
`;

// Functional component for the Oral Health Status Card
export function OralHealthStatus() {
  const storedScore = localStorage.getItem("totalScore");
  const score = storedScore ? parseInt(storedScore, 10) : 0;

  return (
    <>
      <StyledHeader>Oral Health Status</StyledHeader>
      <Card.Body>
        {score === 0 ? (
          <MessageText>
            Please complete the oral health questionnaire to get your oral
            health score.
          </MessageText>
        ) : (
          <>
            <StyledText>
              Your current oral health score is <ScoreSpan>{score}</ScoreSpan>.
            </StyledText>
            <CustomProgressBar now={score} label={`${score}%`} />
          </>
        )}
      </Card.Body>
    </>
  );
}

import { Card, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { colors } from "../../common/utilities/color-utils";

// Styled-component styles for Oral Health Status Component
const StyledHeader = styled(Card.Header)`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${colors.blue};
  font-size: 25px;
  font-weight: bold;
  border: none;
  text-align: center;
  margin-top: 50px;

  @media (max-width: 375px) {
    margin-top: 20px;
    font-size: 22px;
  }

  @media (max-width: 430px) {
    margin-top: 10px;
    font-size: 18px;
  }
`;

const StyledText = styled.p`
  color: ${colors.textGrey};
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 18px;

  @media (max-width: 950px) {
    font-size: 16px;
  }
`;

const ScoreSpan = styled.span<{ $scoreColor: string }>`
  color: ${(props) => props.$scoreColor};
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 950px) {
    font-size: 18px;
  }
`;

const CustomProgressBar = styled(ProgressBar)<{ $scoreColor: string }>`
  height: 20px;
  margin-top: 20px;
  .progress-bar {
    background-color: ${(props) => props.$scoreColor};
    font-size: 14px;
    border-radius: 20px;
  }

  @media (max-width: 950px) {
    margin-bottom: 10px;
  }
`;

const MessageText = styled.p`
  color: ${colors.textGrey};
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;

  @media (max-width: 950px) {
    font-size: 14px;
  }
`;

// Helper function to determine the color based on the score
const getScoreColor = (score: number) => {
  if (score >= 70) {
    return colors.green;
  } else if (score >= 50) {
    return colors.yellow;
  }
    return colors.red;
};

// Functional component for the Oral Health Status Card
export function OralHealthStatus() {
  const storedScore = localStorage.getItem("totalScore");
  const score = storedScore ? parseInt(storedScore, 10) : 0;

  const scoreColor = getScoreColor(score);

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
              Your current oral health score is{" "}
              <ScoreSpan $scoreColor={scoreColor}>{score}</ScoreSpan>.
            </StyledText>
            <CustomProgressBar
              now={score}
              label={`${score}%`}
              $scoreColor={scoreColor}
            />
          </>
        )}
      </Card.Body>
    </>
  );
}

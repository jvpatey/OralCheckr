import { Card, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { useTheme } from "styled-components";
import { useGetTotalScore } from "../../hooks/questionnaire/useGetTotalScore";

// Styled-component styles for Oral Health Status Component
const StyledHeader = styled(Card.Header)`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.blue};
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
  color: ${({ theme }) => theme.textGrey};
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
  height: 25px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.accentBackgroundColor};

  .progress-bar {
    color: ${({ theme }) => theme.accentBackgroundColor};
    background-color: ${(props) => props.$scoreColor};
    font-size: 15px;
    font-weight: bold;
    border-radius: 20px;
  }

  @media (max-width: 950px) {
    margin-bottom: 10px;
  }
`;

const MessageText = styled.p`
  color: ${({ theme }) => theme.textGrey};
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
export const getScoreColor = (score: number) => {
  const theme = useTheme();
  if (score >= 70) {
    return theme.green;
  } else if (score >= 50) {
    return theme.yellow;
  }
  return theme.red;
};

// Functional component for the Oral Health Status Card
export function OralHealthStatus() {
  // Use react query hook to fetch the total score
  const { data: score, isLoading, error } = useGetTotalScore();
  const scoreColor = getScoreColor(score ?? 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || score === null) {
    return <div>Error loading your score.</div>;
  }

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
              <ScoreSpan $scoreColor={scoreColor}>{score}</ScoreSpan>
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

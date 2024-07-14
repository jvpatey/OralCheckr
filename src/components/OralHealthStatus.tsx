import { Card, ProgressBar } from "react-bootstrap";
import { DashboardTile } from "./styled/DashboardTile";
import styled from "styled-components";

// styled-component styles for Oral Health Status Component

const StyledHeader = styled(Card.Header)`
  background-color: #f5f5f5;
  color: #07889b;
  font-size: 22px;
  font-weight: bold;
  border: transparent;
  margin-top: 20px;
  text-align: center;
`;

const StyledText = styled.p`
  margin-bottom: 40px;
  margin-top: 10px;
  font-size: 18px;
`;

const ScoreSpan = styled.span`
  color: #07889b;
  font-weight: bold;
`;

const CustomProgressBar = styled(ProgressBar)`
  height: 25px;
  .progress-bar {
    background-color: #07889b;
    font-size: 16px;
    border-radius: 20px;
  }
`;

const MessageText = styled.p`
  font-size: 18px;
  text-align: left;
  text-align: center;
  margin-top: 30px;
`;

export function OralHealthStatus() {
  const storedScore = localStorage.getItem("totalScore");
  const score = storedScore ? parseInt(storedScore, 10) : 0;

  return (
    <DashboardTile>
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
    </DashboardTile>
  );
}

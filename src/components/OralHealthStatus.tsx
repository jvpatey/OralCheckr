import { Card, ProgressBar } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background-color: #f5f5f5;
  border: transparent;
  border-radius: 20px;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const StyledHeader = styled(Card.Header)`
  background-color: #f5f5f5;
  color: #07889b;
  font-size: 20px;
  font-weight: bold;
  border: transparent;
  margin-top: 20px;
`;

const StyledText = styled.p`
  margin-bottom: 40px;
  margin-top: 10px;
  font-size: 16px;
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

export function OralHealthStatus() {
  const storedScore = localStorage.getItem("totalScore");
  const score = storedScore ? parseInt(storedScore, 10) : 0;

  return (
    <StyledCard>
      <StyledHeader>Oral Health Status</StyledHeader>
      <Card.Body>
        <StyledText>
          Your current oral health score is <ScoreSpan>{score}</ScoreSpan>.
        </StyledText>
        <CustomProgressBar now={score} label={`${score}%`} />
      </Card.Body>
    </StyledCard>
  );
}

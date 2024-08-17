import { Card, ProgressBar } from "react-bootstrap";
import { DashboardTile } from "./styled/DashboardTile";
import styled from "styled-components";
import { colors } from "../common/color-utils";

// styled-component styles for Oral Health Status Component

const StyledHeader = styled(Card.Header)`
  background-color: ${colors.bgWhite};
  color: ${colors.blue};
  font-size: 22px;
  font-weight: bold;
  border: transparent;
  margin-top: 20px;
  text-align: center;
`;

const StyledText = styled.p`
  color: ${colors.textGrey};
  margin-bottom: 40px;
  margin-top: 10px;
  font-size: 18px;
`;

const ScoreSpan = styled.span`
  color: ${colors.blue};
  font-weight: bold;
`;

const CustomProgressBar = styled(ProgressBar)`
  height: 30px;
  .progress-bar {
    background-color: ${colors.blue};
    font-size: 16px;
    border-radius: 20px;
  }
`;

const MessageText = styled.p`
  color: ${colors.textGrey};
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  height: 50%;
  padding: 15px;
`;

// Functional component for the Oral Health Status Card on the Dashboard
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

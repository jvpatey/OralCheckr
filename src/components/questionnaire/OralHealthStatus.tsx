import { Card } from "react-bootstrap";
import { useTheme } from "styled-components";
import { useGetTotalScore } from "../../hooks/questionnaire/useGetTotalScore";
import { getScoreColor } from "../../common/utilities/questionnaire/oral-health-status-utils";
import { StyledHeader, MessageText } from "./styles/SharedQuestionnaireStyles";
import {
  StyledText,
  ScoreSpan,
  CustomProgressBar,
} from "./styles/OralHealthStatusStyles";

// Functional component for the Oral Health Status Card
export function OralHealthStatus() {
  // Use react query hook to fetch the total score
  const { data: score, isLoading, error } = useGetTotalScore();
  const theme = useTheme();
  const scoreColor = getScoreColor(score ?? 0, theme);

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

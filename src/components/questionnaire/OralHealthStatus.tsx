import { Card } from "react-bootstrap";
import { useTheme } from "styled-components";
import { useGetTotalScore } from "../../hooks/questionnaire/useGetTotalScore";
import { getScoreColor } from "../../containers/questionnaire/utils/oral-health-status-utils";
import { StyledHeader, MessageText } from "./styles/SharedQuestionnaireStyles";
import { LoadingSpinner } from "../common/LoadingSpinner";
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

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  if (error) {
    return <div>Error loading your score.</div>;
  }

  // Show message if no score or score is 0
  if (!score) {
    return (
      <>
        <StyledHeader>Oral Health Status</StyledHeader>
        <Card.Body>
          <MessageText>
            Please complete the oral health questionnaire to get your oral
            health score.
          </MessageText>
        </Card.Body>
      </>
    );
  }

  // At this point, we know score is a number
  const numericScore = score as number;
  const scoreColor = getScoreColor(numericScore, theme);

  return (
    <>
      <StyledHeader>Oral Health Status</StyledHeader>
      <Card.Body>
        <StyledText>
          Your current oral health score is{" "}
          <ScoreSpan $scoreColor={scoreColor}>{numericScore}</ScoreSpan>
        </StyledText>
        <CustomProgressBar
          now={numericScore}
          label={`${numericScore}%`}
          $scoreColor={scoreColor}
        />
      </Card.Body>
    </>
  );
}

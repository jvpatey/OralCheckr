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
  ModernScoreDisplay,
  ModernScoreNumber,
  ModernScoreLabel,
  ModernProgressBar,
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
      <ModernScoreDisplay>
        <ModernScoreLabel>
          Please complete the oral health assessment to get your score.
        </ModernScoreLabel>
      </ModernScoreDisplay>
    );
  }

  // At this point, we know score is a number
  const numericScore = score as number;
  const scoreColor = getScoreColor(numericScore, theme);

  return (
    <ModernScoreDisplay>
      <ModernScoreNumber>{numericScore}</ModernScoreNumber>
      <ModernScoreLabel>out of 100</ModernScoreLabel>
      <ModernProgressBar
        $scoreColor={scoreColor}
        style={
          { "--progress-width": `${numericScore}%` } as React.CSSProperties
        }
      />
    </ModernScoreDisplay>
  );
}

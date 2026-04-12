import {
  TileContainer,
  TileDescription,
  TileHeading,
  TileMainContent,
  TileProgressFill,
  TileSubContent,
} from "../styles/SharedAnalyticsStyles";

// Interface for the analytics tile props
interface AnalyticsTileProps {
  heading: string;
  mainContent: string | number;
  subContent: string;
  /** One short sentence explaining the metric in everyday language */
  description?: string;
  /** 0–100: habit-style fill width (e.g. completion rate) */
  progressPercent?: number;
  isMissedDays?: boolean;
  isLoading?: boolean;
}

// Functional component for the analytics tiles for the month view
export function AnalyticsTile({
  heading,
  mainContent,
  subContent,
  description,
  progressPercent,
  isMissedDays = false,
  isLoading = false,
}: AnalyticsTileProps) {
  const showProgressFill =
    progressPercent !== undefined && !isLoading && !isMissedDays;
  const clampedProgress = showProgressFill
    ? Math.min(100, Math.max(0, progressPercent))
    : 0;
  const progressComplete = clampedProgress >= 100;

  return (
    <TileContainer>
      {showProgressFill && (
        <TileProgressFill
          aria-hidden
          $progress={clampedProgress}
          $isComplete={progressComplete}
        />
      )}
      <TileMainContent
        $isMissedDays={isMissedDays}
        $isLoading={isLoading}
        $overProgressFill={showProgressFill}
      >
        {mainContent}
      </TileMainContent>
      <TileHeading $overProgressFill={showProgressFill}>{heading}</TileHeading>
      {subContent && <TileSubContent>{subContent}</TileSubContent>}
      {description && (
        <TileDescription $overProgressFill={showProgressFill}>
          {description}
        </TileDescription>
      )}
    </TileContainer>
  );
}

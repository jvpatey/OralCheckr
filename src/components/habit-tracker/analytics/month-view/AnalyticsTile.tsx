import {
  TileContainer,
  TileHeading,
  TileMainContent,
  TileSubContent,
} from "../styles/SharedAnalyticsStyles";

// Interface for the analytics tile props
interface AnalyticsTileProps {
  heading: string;
  mainContent: string | number;
  subContent?: string;
  isMissedDays?: boolean;
}

// Functional component for the analytics tiles for the month view
export function AnalyticsTile({
  heading,
  mainContent,
  subContent,
  isMissedDays,
}: AnalyticsTileProps) {
  return (
    <TileContainer>
      <TileHeading>{heading}</TileHeading>
      <TileMainContent $isMissedDays={isMissedDays}>
        {mainContent}
      </TileMainContent>
      {subContent && <TileSubContent>{subContent}</TileSubContent>}
    </TileContainer>
  );
}

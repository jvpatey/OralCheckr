import styled from "styled-components";

// Interface for the analytics tile props
interface AnalyticsTileProps {
  heading: string;
  mainContent: string | number;
  subContent?: string;
  isMissedDays?: boolean;
}

// Styled components for the analytics tile
const TileContainer = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 180px;
  height: 160px;
`;

const TileHeading = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.blue};
  margin-top: 10px;
  text-align: center;
`;

const TileMainContent = styled.div<{ $isMissedDays?: boolean }>`
  font-size: 40px;
  font-weight: bold;
  color: ${({ $isMissedDays, theme }) => ($isMissedDays ? theme.red : theme.green)};
  margin-top: 10px;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const TileSubContent = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 5px;
`;

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

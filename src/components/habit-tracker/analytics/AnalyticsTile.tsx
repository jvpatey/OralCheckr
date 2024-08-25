import styled from "styled-components";
import { colors } from "../../../common/utilities/color-utils";

// interface for the analytics tile props
interface AnalyticsTileProps {
  heading: string;
  mainContent: string | number;
  subContent?: string;
}

// styled components for the analytics tile
const TileContainer = styled.div`
  background-color: ${colors.white};
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
  color: ${colors.blue};
  margin-top: 10px;
  text-align: center;
`;

const TileMainContent = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${colors.green};
  margin-top: 10px;
  margin-bottom: 8px;
`;

const TileSubContent = styled.div`
  font-size: 12px;
  color: ${colors.textGrey};
`;

// Functional component for the analytics tiles for the month view
export function AnalyticsTile({
  heading,
  mainContent,
  subContent,
}: AnalyticsTileProps) {
  return (
    <TileContainer>
      <TileHeading>{heading}</TileHeading>
      <TileMainContent>{mainContent}</TileMainContent>
      {subContent && <TileSubContent>{subContent}</TileSubContent>}
    </TileContainer>
  );
}

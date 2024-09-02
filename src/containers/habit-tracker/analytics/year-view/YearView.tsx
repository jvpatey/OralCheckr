import styled, { keyframes } from "styled-components";
import { HabitDropdown } from "../HabitDropdown";
import { Habit } from "../../habits/Habits";
import { colors } from "../../../../common/utilities/color-utils";
import { YearSelector } from "./YearSelector";
import { Heatmap } from "./Heatmap"; // Import the updated Heatmap component
import { HeatmapEntry } from "../../../../common/utilities/heatmap-utils";

// Keyframes for the fade-up animation
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components for the layout
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  animation: ${fadeUp} 1s ease-out;
`;

const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.green};
  margin-bottom: 8px;
  margin-top: 10px;
`;

interface YearViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  heatmapData: HeatmapEntry[];
  onYearChange: (date: Date) => void;
  selectedYear: Date;
}

// YearView component for displaying the heatmap for the selected year
export function YearView({
  habits,
  onSelectHabit,
  heatmapData,
  onYearChange,
  selectedYear,
}: YearViewProps) {
  const handleSelectHabit = (habitName: string) => {
    onSelectHabit(habitName);
  };

  return (
    <ViewContainer>
      <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      <HabitsTitle>Habits:</HabitsTitle>
      <HabitDropdown habits={habits} onSelectHabit={handleSelectHabit} />
      <Heatmap data={heatmapData} />
    </ViewContainer>
  );
}

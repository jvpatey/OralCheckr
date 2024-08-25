import styled, { keyframes } from "styled-components";
import { HabitDropdown } from "./HabitDropdown";
import { Habit } from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";
import { YearSelector } from "./YearSelector";
import { Heatmap } from "./Heatmap";
import { useState } from "react";

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

interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  heatmapData: { date: string; count: number }[];
}

export function YearView({ habits, onSelectHabit, heatmapData }: ViewProps) {
  const [selectedYear, setSelectedYear] = useState(new Date());

  // Handle the year change
  const handleYearChange = (date: Date) => {
    setSelectedYear(date);
  };

  return (
    <ViewContainer>
      <YearSelector
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />
      <HabitsTitle>Habits:</HabitsTitle>
      <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
      <Heatmap data={heatmapData} />
    </ViewContainer>
  );
}

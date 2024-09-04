import styled, { keyframes } from "styled-components";
import { HabitDropdown } from "../HabitDropdown";
import { Habit } from "../../habits/Habits";
import { colors } from "../../../../common/utilities/color-utils";
import { Heatmap } from "./Heatmap";
import { HeatmapEntry } from "../../../../common/utilities/heatmap-utils";
import { Logging } from "../../habits/Habits";
import { useMemo, useState } from "react";
import { generateHeatmapData } from "../../../../common/utilities/heatmap-utils";
import { ViewType } from "../AnalyticsDateSelector";
import { AnalyticsDateSelector } from "../AnalyticsDateSelector";

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
  animation: ${fadeUp} 0.5s ease-out;
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
  habitsLog: Logging;
  selectedHabit: string;
}

// YearView component for displaying the heatmap for the selected year
export function YearView({
  habits,
  onSelectHabit,
  habitsLog,
  selectedHabit,
}: YearViewProps) {
  const [selectedYear, setSelectedYear] = useState<Date>(new Date());

  // Memoized generation of heatmap data for the selected habit and year
  const heatmapData: HeatmapEntry[] = useMemo(() => {
    return generateHeatmapData(
      habitsLog,
      selectedHabit,
      selectedYear.getFullYear()
    );
  }, [habitsLog, selectedHabit, selectedYear]);

  const handleSelectHabit = (habitName: string) => {
    onSelectHabit(habitName);
  };

  // Update the selected year when changed
  const handleYearChange = (date: Date) => {
    setSelectedYear(date);
  };

  return (
    <ViewContainer>
      <AnalyticsDateSelector
        selectedDate={selectedYear}
        onDateChange={handleYearChange}
        viewType={ViewType.YEAR}
      />
      <HabitsTitle>Habits:</HabitsTitle>
      <HabitDropdown habits={habits} onSelectHabit={handleSelectHabit} />
      <Heatmap data={heatmapData} />
    </ViewContainer>
  );
}

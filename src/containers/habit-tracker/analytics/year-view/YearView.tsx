import styled, { keyframes } from "styled-components";
import { HabitDropdown } from "../HabitDropdown";
import { Habit, Logging } from "../../habits/Habits";
import { Heatmap } from "./Heatmap";
import { useMemo, useState } from "react";
import { generateHeatmapData, HeatmapSeries } from "../../../../common/utilities/heatmap-utils";
import { AnalyticsDateSelector } from "../AnalyticsDateSelector";
import { ViewType } from "../AnalyticsDateSelector";

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

// Styled component for the main container of the view
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  animation: ${fadeUp} 0.5s ease-out;
  width: 90%;
  max-width: 1200px;

  @media (min-width: 1280px) {
    max-width: 1200px;
  }

  @media (min-width: 1024px) {
    max-width: 1100px;
  }
`;

const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  margin-bottom: 8px;
  margin-top: 10px;
`;

// Interface for the props that YearView accepts
interface YearViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  habitsLog: Logging;
  selectedHabit: string;
  hideAnalytics: boolean;
}

// Functional component to display the heatmap view for the year
export function YearView({
  habits,
  onSelectHabit,
  habitsLog,
  selectedHabit,
  hideAnalytics,
}: YearViewProps) {
  const [selectedYear, setSelectedYear] = useState<Date>(new Date());

  // Memoized heatmap data generation to avoid recalculating on every render
  const heatmapData: HeatmapSeries[] = useMemo(
    () =>
      generateHeatmapData(habitsLog, selectedHabit, selectedYear.getFullYear()),
    [habitsLog, selectedHabit, selectedYear]
  );

  // Function to handle habit selection
  const handleSelectHabit = (habitName: string) => {
    onSelectHabit(habitName);
  };

  // Function to handle changes to the selected year
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
      {!hideAnalytics && (
        <Heatmap data={heatmapData} />
      )}
    </ViewContainer>
  );
}

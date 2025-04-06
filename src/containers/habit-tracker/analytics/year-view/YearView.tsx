import { useMemo } from "react";
import { HabitDropdown } from "../HabitDropdown";
import { Habit } from "../../../../services/habitService";
import { Logging } from "../Analytics";
import { Heatmap } from "./Heatmap";
import {
  generateHeatmapData,
  HeatmapSeries,
} from "../../../../common/utilities/heatmap-utils";
import { AnalyticsDateSelector } from "../AnalyticsDateSelector";
import { ViewType } from "../AnalyticsDateSelector";
import { useHabitContext } from "../../../../contexts/HabitContext";
import { ViewContainer } from "../../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";
import {
  HeatmapContainer,
  HeatmapTitle,
} from "../../../../components/habit-tracker/analytics/styles/YearViewStyles";

// Interface for the props that YearView accepts
interface YearViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  habitsLog: Logging;
  hideAnalytics: boolean;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

// Functional component to display the heatmap view for the year
export function YearView({
  habits,
  onSelectHabit,
  habitsLog,
  hideAnalytics,
  selectedDate,
  onDateChange,
}: YearViewProps) {
  const { selectedHabit } = useHabitContext();
  const year = selectedDate.getFullYear();

  // Generate heatmap data for the selected habit and year
  const heatmapData: HeatmapSeries[] = useMemo(() => {
    if (!selectedHabit || hideAnalytics) return [];
    return generateHeatmapData(habitsLog, selectedHabit, year);
  }, [habitsLog, selectedHabit, year, hideAnalytics]);

  // Function to handle habit selection
  const handleSelectHabit = (habitName: string) => {
    onSelectHabit(habitName);
  };

  return (
    <ViewContainer>
      {!hideAnalytics && (
        <>
          <AnalyticsDateSelector
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            viewType={ViewType.YEAR}
          />
          <HabitDropdown habits={habits} onSelectHabit={handleSelectHabit} />
          <HeatmapContainer>
            <HeatmapTitle>
              {selectedHabit
                ? `${selectedHabit} Activity in ${year}`
                : "Select a habit to view activity"}
            </HeatmapTitle>
            <Heatmap data={heatmapData} />
          </HeatmapContainer>
        </>
      )}
      {hideAnalytics && (
        <HabitDropdown habits={habits} onSelectHabit={handleSelectHabit} />
      )}
    </ViewContainer>
  );
}

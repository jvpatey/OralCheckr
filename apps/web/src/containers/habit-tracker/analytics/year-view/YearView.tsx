import { useMemo } from "react";
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
  HeatmapHeader,
  YearPickerContainer,
} from "../../../../components/habit-tracker/analytics/styles/YearViewStyles";

interface YearViewProps {
  habitsLog: Logging;
  hideAnalytics: boolean;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function YearView({
  habitsLog,
  hideAnalytics,
  selectedDate,
  onDateChange,
}: YearViewProps) {
  const { selectedHabit } = useHabitContext();
  const year = selectedDate.getFullYear();

  const heatmapData: HeatmapSeries[] = useMemo(() => {
    if (!selectedHabit || hideAnalytics) return [];
    return generateHeatmapData(habitsLog, selectedHabit, year);
  }, [habitsLog, selectedHabit, year, hideAnalytics]);

  if (hideAnalytics) {
    return null;
  }

  return (
    <ViewContainer>
      <HeatmapContainer>
        <HeatmapHeader>
          <div />
          <YearPickerContainer>
            <AnalyticsDateSelector
              selectedDate={selectedDate}
              onDateChange={onDateChange}
              viewType={ViewType.YEAR}
            />
          </YearPickerContainer>
          <div />
        </HeatmapHeader>
        <Heatmap data={heatmapData} />
      </HeatmapContainer>
    </ViewContainer>
  );
}

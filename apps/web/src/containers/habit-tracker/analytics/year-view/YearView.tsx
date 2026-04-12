import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { Logging } from "../Analytics";
import { Heatmap } from "./Heatmap";
import {
  generateHeatmapData,
  HeatmapSeries,
} from "../../../../common/utilities/heatmap-utils";
import { AnalyticsDateSelector } from "../AnalyticsDateSelector";
import { ViewType } from "../AnalyticsDateSelector";
import { useHabitContext } from "../../../../contexts/HabitContext";
import { AnalyticsViewRoot } from "../../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";
import {
  HeatmapContainer,
  HeatmapHeader,
  YearPickerContainer,
} from "../../../../components/habit-tracker/analytics/styles/YearViewStyles";
import {
  analyticsOpacityVariants,
  useAnalyticsOpacityTransition,
} from "../analyticsMotion";

const HeatmapBodyMotion = styled(motion.div)`
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

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
  const heatmapDateTransition = useAnalyticsOpacityTransition();

  const heatmapData: HeatmapSeries[] = useMemo(() => {
    if (!selectedHabit || hideAnalytics) return [];
    return generateHeatmapData(habitsLog, selectedHabit, year);
  }, [habitsLog, selectedHabit, year, hideAnalytics]);

  if (hideAnalytics) {
    return null;
  }

  return (
    <AnalyticsViewRoot>
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
        <AnimatePresence mode="wait" initial={false}>
          <HeatmapBodyMotion
            key={year}
            variants={analyticsOpacityVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={heatmapDateTransition}
          >
            <Heatmap data={heatmapData} />
          </HeatmapBodyMotion>
        </AnimatePresence>
      </HeatmapContainer>
    </AnalyticsViewRoot>
  );
}

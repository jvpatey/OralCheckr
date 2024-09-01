import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { PageBackground } from "../../../components/PageBackground";
import { ToggleButton } from "../../../components/habit-tracker/analytics/ToggleButton";
import { MonthView } from "./month-view/MonthView";
import { YearView } from "./year-view/YearView";
import { Habit, Logging } from "../habits/Habits";
import { LocalStorage } from "../../../common/constants/local-storage";
import {
  generateHeatmapData,
  HeatmapEntry,
} from "../../../common/utilities/heatmap-utils";

// Enum for view modes
enum ViewMode {
  MONTH = "month",
  YEAR = "year",
}

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

// Styled component for the main container of the analytics page
const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 190px);
  height: calc(100vh - 56px);
  overflow-y: auto;
  position: absolute;
  top: 56px;
  left: 190px;
  padding: 20px;
  box-sizing: border-box;
  animation: ${fadeUp} 1s ease-out;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

// The main functional component for the Analytics page of the habit tracker
export function Analytics() {
  // State to manage the current view (month or year)
  const [view, setView] = useState<ViewMode>(ViewMode.MONTH);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitsLog, setHabitsLog] = useState<Logging>({});
  const [selectedHabit, setSelectedHabit] = useState<string>("");

  useEffect(() => {
    // Fetch habits and logging data from local storage when the component mounts
    const storedHabits = localStorage.getItem(LocalStorage.HABITS);
    const storedLogging = localStorage.getItem(LocalStorage.HABITS_LOG);

    if (storedHabits) {
      setHabits(JSON.parse(storedHabits) as Habit[]);
    }

    if (storedLogging) {
      setHabitsLog(JSON.parse(storedLogging) as Logging);
    }
  }, []);

  // Memoized generation of heatmap data for the selected habit
  const heatmapData: HeatmapEntry[] = useMemo(() => {
    return generateHeatmapData(habitsLog, selectedHabit);
  }, [habitsLog, selectedHabit]);

  const toggleOptions = [
    { label: "Month View", value: ViewMode.MONTH },
    { label: "Year View", value: ViewMode.YEAR },
  ];

  const handleSelectHabit = (habitName: string) => {
    setSelectedHabit(habitName);
  };

  return (
    <PageBackground>
      <AnalyticsContainer>
        <ToggleButton
          options={toggleOptions}
          activeValue={view}
          onChange={(newView) => setView(newView as ViewMode)}
        />
        {view === ViewMode.MONTH ? (
          <MonthView
            habits={habits}
            onSelectHabit={handleSelectHabit}
            habitsLog={habitsLog}
            selectedHabit={selectedHabit}
          />
        ) : (
          <YearView
            habits={habits}
            onSelectHabit={handleSelectHabit}
            heatmapData={heatmapData}
          />
        )}
      </AnalyticsContainer>
    </PageBackground>
  );
}

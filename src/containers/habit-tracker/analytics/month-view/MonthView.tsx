import { useState } from "react";
import { HabitDropdown } from "../HabitDropdown";
import { Habit } from "../../../../services/habitService";
import { Logging } from "../Analytics";
import { HabitCalendar } from "./HabitCalendar";
import {
  calculateTotalCount,
  calculateMonthlyCompletion,
  calculateLongestStreak,
  calculateMissedDays,
} from "../../../../common/utilities/habit-analytics";
import { AnalyticsTile } from "../../../../components/habit-tracker/analytics/month-view/AnalyticsTile";
import { AnalyticsDateSelector } from "../AnalyticsDateSelector";
import { ViewType } from "../AnalyticsDateSelector";
import { useHabitContext } from "../../../../contexts/HabitContext";
import {
  ViewContainer,
  ControlsContainer,
  AnalyticsGrid,
  TilesSection,
  CalendarSection,
  TilesContainer,
} from "../../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";
import { CalendarContainer } from "../../../../components/habit-tracker/analytics/styles/MonthViewStyles";

// Interface for the MonthView component props
interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  habitsLog: Logging;
  hideAnalytics: boolean;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isLoading?: boolean;
}

// The MonthView functional component for displaying monthly analytics
export function MonthView({
  habits,
  onSelectHabit,
  habitsLog,
  hideAnalytics,
  selectedDate,
  onDateChange,
  isLoading = false,
}: ViewProps) {
  const { selectedHabit } = useHabitContext();
  const [showChart, setShowChart] = useState(false);

  // Handle month change from the date selector
  const onMonthChange = (date: Date) => {
    onDateChange(date);
  };

  // Handle toggle between calendar and chart view
  const handleToggleView = () => {
    setShowChart(!showChart);
  };

  // Handle today button click
  const handleTodayClick = () => {
    const today = new Date();
    onDateChange(today);
  };

  // Get the current month and year from the selected date
  const currentMonth = selectedDate
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const currentYear = selectedDate.getFullYear();

  // Get the habit count (for completion rate calculation)
  const habitCount = habits.find((h) => h.name === selectedHabit)?.count || 1;

  // Calculate analytics metrics for the selected habit and month
  const totalCount = selectedHabit
    ? calculateTotalCount(habitsLog, selectedHabit, currentYear, currentMonth)
    : 0;

  const completionRate = calculateMonthlyCompletion(
    totalCount,
    habitCount,
    currentYear,
    currentMonth
  );

  const longestStreak = selectedHabit
    ? calculateLongestStreak(
        habitsLog,
        selectedHabit,
        currentYear,
        currentMonth,
        habitCount
      )
    : 0;

  const missedDays = selectedHabit
    ? calculateMissedDays(habitsLog, selectedHabit, currentYear, currentMonth)
    : 0;

  // Get the logs for the selected habit, month, and year for the calendar
  const habitLogs =
    selectedHabit && habitsLog[selectedHabit]
      ? habitsLog[selectedHabit][currentYear]?.[currentMonth] || {}
      : {};

  // Convert habitLogs to the format expected by HabitCalendar
  const formattedHabitLogs: Logging = {};
  if (selectedHabit) {
    formattedHabitLogs[selectedHabit] = {};
    formattedHabitLogs[selectedHabit][currentYear] = {};
    formattedHabitLogs[selectedHabit][currentYear][currentMonth] = habitLogs;
  }

  return (
    <ViewContainer>
      {!hideAnalytics && (
        <>
          <ControlsContainer>
            <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
          </ControlsContainer>

          <AnalyticsGrid>
            <TilesSection>
              <TilesContainer>
                <AnalyticsTile
                  heading="Total Logs"
                  mainContent={isLoading ? "..." : totalCount}
                  subContent=""
                  isLoading={isLoading}
                />
                <AnalyticsTile
                  heading="Completion Rate"
                  mainContent={isLoading ? "..." : `${completionRate}%`}
                  subContent=""
                  isLoading={isLoading}
                />
                <AnalyticsTile
                  heading="Longest Streak"
                  mainContent={isLoading ? "..." : longestStreak}
                  subContent=""
                  isLoading={isLoading}
                />
                <AnalyticsTile
                  heading="Missed Days"
                  mainContent={isLoading ? "..." : missedDays}
                  subContent=""
                  isMissedDays={true}
                  isLoading={isLoading}
                />
              </TilesContainer>
            </TilesSection>

            <CalendarSection>
              <CalendarContainer>
                <HabitCalendar
                  habitsLog={formattedHabitLogs}
                  year={currentYear}
                  month={currentMonth}
                  habitCount={habitCount}
                  selectedMonth={selectedDate}
                  showChart={showChart}
                  onToggleView={handleToggleView}
                  isLoading={isLoading}
                  onTodayClick={handleTodayClick}
                  dateSelector={
                    <AnalyticsDateSelector
                      selectedDate={selectedDate}
                      onDateChange={onMonthChange}
                      viewType={ViewType.MONTH}
                    />
                  }
                />
              </CalendarContainer>
            </CalendarSection>
          </AnalyticsGrid>
        </>
      )}
      {hideAnalytics && (
        <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
      )}
    </ViewContainer>
  );
}

import { useState, useEffect } from "react";
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
import { formatDateLong } from "../../../../common/utilities/date-utils";
import { LoadingComponent } from "../../../../components/habit-tracker/analytics/LoadingComponent";
import { useHabitContext } from "../../../../contexts/HabitContext";
import {
  ViewContainer,
  TilesAndCalendarContainer,
  TilesContainer,
} from "../../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";
import {
  CalendarContainer,
  ToggleContainer,
} from "../../../../components/habit-tracker/analytics/styles/MonthViewStyles";

// Interface for the MonthView component props
interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  habitsLog: Logging;
  hideAnalytics: boolean;
}

// The MonthView functional component for displaying monthly analytics
export function MonthView({
  habits,
  onSelectHabit,
  habitsLog,
  hideAnalytics,
}: ViewProps) {
  const { selectedHabit } = useHabitContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set loading state to false after component mounts
  useEffect(() => {
    setIsLoading(false);
    return () => {};
  }, []);

  // Handle month change from the date selector
  const onMonthChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle toggle between calendar and chart view
  const handleToggleView = () => {
    setShowChart(!showChart);
  };

  // If loading, show loading component
  if (isLoading) {
    return <LoadingComponent />;
  }

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
          <AnalyticsDateSelector
            selectedDate={selectedDate}
            onDateChange={onMonthChange}
            viewType={ViewType.MONTH}
          />
          <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
          <TilesAndCalendarContainer>
            <TilesContainer>
              <AnalyticsTile
                heading="Total Logs"
                mainContent={totalCount}
                subContent={`for ${formatDateLong(selectedDate)}`}
              />
              <AnalyticsTile
                heading="Completion Rate"
                mainContent={`${completionRate}%`}
                subContent=""
              />
              <AnalyticsTile
                heading="Longest Streak"
                mainContent={longestStreak}
                subContent="consecutive days"
              />
              <AnalyticsTile
                heading="Missed Days"
                mainContent={missedDays}
                subContent=""
                isMissedDays={true}
              />
            </TilesContainer>
            <CalendarContainer>
              <ToggleContainer>
                <HabitCalendar
                  habitsLog={formattedHabitLogs}
                  year={currentYear}
                  month={currentMonth}
                  habitCount={habitCount}
                  selectedMonth={selectedDate}
                  showChart={showChart}
                  onToggleView={handleToggleView}
                />
              </ToggleContainer>
            </CalendarContainer>
          </TilesAndCalendarContainer>
        </>
      )}
      {hideAnalytics && (
        <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
      )}
    </ViewContainer>
  );
}

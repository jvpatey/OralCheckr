import { useState, useEffect, useMemo } from "react";
import { PageBackground } from "../../../components/PageBackground";
import { ToggleButton } from "../../../components/habit-tracker/analytics/ToggleButton";
import { MonthView } from "./month-view/MonthView";
import { YearView } from "./year-view/YearView";
import { Habit } from "../../../services/habitService";
import { faCalendarAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useFetchHabits } from "../../../hooks/habits";
import { useHabitLogsForAllHabits } from "../../../hooks/habitLogs";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useHabitContext } from "../../../contexts/HabitContext";
import { LoadingComponent } from "../../../components/habit-tracker/analytics/LoadingComponent";
import {
  AnalyticsContainer,
  NoHabitMessage,
} from "../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";

// Enum for view modes
enum ViewMode {
  MONTH = "month",
  YEAR = "year",
}

// Define the Logging type to match the structure from the database
export type Logging = Record<
  string,
  Record<number, Record<string, Record<number, number>>>
>;

// Local timezone
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Helper function to transform habitLogsMap
const transformHabitLogsToAnalyticsFormat = (
  habits: Habit[],
  habitLogsMap: Record<number, Record<string, number>>
): Logging => {
  const result: Logging = {};

  habits.forEach((habit) => {
    if (!habit.habitId) return;

    const habitId = habit.habitId;
    const habitName = habit.name;

    if (!result[habitName]) {
      result[habitName] = {};
    }

    // Get all logs for this habit
    const logs = habitLogsMap[habitId] || {};

    // Group logs by year and month
    Object.entries(logs).forEach(([dateStr, count]) => {
      try {
        // Parse the date string and apply timezone
        const date = new Date(dateStr + "T00:00:00");
        const zonedDate = toZonedTime(date, TIMEZONE);

        const year = zonedDate.getFullYear();
        const month = format(zonedDate, "MMMM").toLowerCase();
        const day = zonedDate.getDate();

        if (!result[habitName][year]) {
          result[habitName][year] = {};
        }

        if (!result[habitName][year][month]) {
          result[habitName][year][month] = {};
        }

        result[habitName][year][month][day] = count;
      } catch (error) {
        console.error(`Error processing date: ${dateStr}`, error);
      }
    });
  });

  return result;
};

// Helper function to create toggle options
const createToggleOption = (
  icon: IconDefinition,
  label: string,
  value: ViewMode
) => ({
  label: (
    <>
      <FontAwesomeIcon icon={icon} /> {label}
    </>
  ),
  value,
});

const toggleOptions = [
  createToggleOption(faCalendarAlt, "Monthly Overview", ViewMode.MONTH),
  createToggleOption(faCalendar, "Yearly Overview", ViewMode.YEAR),
];

// The main functional component for the Analytics page of the habit tracker
export function Analytics() {
  const [view, setView] = useState<ViewMode>(ViewMode.MONTH);
  const { selectedHabit, setSelectedHabit } = useHabitContext();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Get the selected month and year for fetching logs
  const month = format(selectedDate, "MMMM");
  const year = selectedDate.getFullYear();

  // Fetch habits using React Query
  const {
    data: habits = [],
    isLoading: isLoadingHabits,
    error: habitsError,
  } = useFetchHabits();

  // Get a list of habit IDs
  const habitIds = useMemo(
    () => habits.map((h) => h.habitId).filter(Boolean) as number[],
    [habits]
  );

  // Fetch logs for all habits - for month view
  const {
    habitLogsMap: monthLogsMap,
    isLoading: isLoadingMonthLogs,
    isError: isMonthLogsError,
  } = useHabitLogsForAllHabits(habitIds, year, month);

  // Fetch logs for all habits - for year view
  const {
    habitLogsMap: yearLogsMap,
    isLoading: isLoadingYearLogs,
    isError: isYearLogsError,
  } = useHabitLogsForAllHabits(habitIds, year, "");

  // Transform habitLogsMap based on the current view
  const habitsLog = useMemo(() => {
    const logsMap = view === ViewMode.MONTH ? monthLogsMap : yearLogsMap;
    return transformHabitLogsToAnalyticsFormat(habits, logsMap);
  }, [habits, monthLogsMap, yearLogsMap, view]);

  const isLoading =
    isLoadingHabits ||
    (view === ViewMode.MONTH ? isLoadingMonthLogs : isLoadingYearLogs);
  const isError =
    habitsError ||
    (view === ViewMode.MONTH ? isMonthLogsError : isYearLogsError);

  useEffect(() => {
    // If no habit is selected or the selected habit doesn't exist, select the first one
    if (!selectedHabit && habits.length > 0) {
      setSelectedHabit(habits[0].name);
    } else if (
      selectedHabit &&
      !habits.some((habit) => habit.name === selectedHabit) &&
      habits.length > 0
    ) {
      setSelectedHabit(habits[0].name);
    }
  }, [habits, selectedHabit, setSelectedHabit]);

  const handleSelectHabit = (habitName: string) => {
    setSelectedHabit(habitName);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Show loading state
  if (isLoading) {
    return (
      <PageBackground>
        <AnalyticsContainer>
          <LoadingComponent />
        </AnalyticsContainer>
      </PageBackground>
    );
  }

  // Show error state
  if (isError) {
    return (
      <PageBackground>
        <AnalyticsContainer>
          <div>Error loading analytics data. Please try again later.</div>
        </AnalyticsContainer>
      </PageBackground>
    );
  }

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
            hideAnalytics={!selectedHabit}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            isLoading={isLoadingMonthLogs}
          />
        ) : (
          <YearView
            habits={habits}
            onSelectHabit={handleSelectHabit}
            habitsLog={habitsLog}
            hideAnalytics={!selectedHabit}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        )}
        {!selectedHabit && (
          <NoHabitMessage>
            Please select a habit to display analytics.
          </NoHabitMessage>
        )}
      </AnalyticsContainer>
    </PageBackground>
  );
}

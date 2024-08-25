import styled from "styled-components";
import { useState } from "react";
import { HabitDropdown } from "./HabitDropdown";
import {
  Habit,
  Logging,
} from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";
import { MonthSelector } from "./MonthSelector";
import { HabitCalendar } from "../../../containers/habit-tracker/analytics/HabitCalendar";
import { LineChart } from "./LineChart";
import {
  calculateTotalCount,
  calculateMonthlyCompletion,
  calculateLongestStreak,
  calculateMissedDays,
} from "../../../common/utilities/habit-analytics";
import { AnalyticsTile } from "./AnalyticsTile";
import { CalendarChartToggle } from "./CalendarChartToggle";

// Container for the entire view, centering all contents
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`;

// Container for the tiles and calendar
const TilesAndCalendarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin-top: 20px;
  height: calc(100vh - 220px);
`;

// Wrapper for the grid of tiles
const TileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3px;
  width: 47%;
  justify-content: center;
  align-items: start;
`;

// Wrapper for the calendar or chart
const CalendarWrapper = styled.div`
  width: 60%;
  position: relative;
`;

// Styling for the calendar card
const CalendarCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 80%;
  max-height: 80%;
`;

// Container for the habits dropdown and title, centered horizontally
const HabitsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

// Styling for the habits title
const HabitsTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
  color: ${colors.green};
  margin-top: 10px;
  margin-right: 10px;
`;

// Interface defining the props for the MonthView component
interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  habitsLog: Logging;
  selectedHabit: string;
}

// Functional component for the month view of the analytics page in the habit tracker
export function MonthView({
  habits,
  onSelectHabit,
  habitsLog,
  selectedHabit,
}: ViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [isCalendarView, setIsCalendarView] = useState(true);

  const habitCount =
    habits.find((habit) => habit.name === selectedHabit)?.count || 1;

  const year = selectedMonth.getFullYear();
  const month = selectedMonth
    .toLocaleDateString("en-US", { month: "long" })
    .toLowerCase();
  const daysInMonth = new Date(year, selectedMonth.getMonth() + 1, 0).getDate();

  // Total count calculation
  const totalCount = calculateTotalCount(habitsLog, selectedHabit, year, month);

  // Monthly completion percentage calculation
  const monthlyCompletion = calculateMonthlyCompletion(
    totalCount,
    habitCount,
    daysInMonth
  );

  // Longest streak calculation
  const longestStreak = calculateLongestStreak(
    habitsLog,
    selectedHabit,
    year,
    month,
    daysInMonth
  );

  // Missed days calculation
  const missedDays = calculateMissedDays(
    habitsLog,
    selectedHabit,
    year,
    month,
    daysInMonth
  );

  return (
    <ViewContainer>
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <HabitsContainer>
        <HabitsTitle>Habits: </HabitsTitle>
        <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
      </HabitsContainer>

      <TilesAndCalendarContainer>
        <TileWrapper>
          <AnalyticsTile heading="Total Count" mainContent={totalCount} />
          <AnalyticsTile
            heading="Monthly Completion"
            mainContent={`${monthlyCompletion}%`}
          />
          <AnalyticsTile
            heading="Longest Streak"
            mainContent={longestStreak}
            subContent="days"
          />
          <AnalyticsTile
            heading="Missed Days"
            mainContent={missedDays}
            subContent="days"
          />
        </TileWrapper>

        <CalendarWrapper>
          <CalendarCard>
            <CalendarChartToggle
              isCalendarView={isCalendarView}
              setIsCalendarView={setIsCalendarView}
            />
            {isCalendarView ? (
              <HabitCalendar
                habitsLog={habitsLog}
                selectedHabit={selectedHabit}
                year={year}
                month={month}
                habitCount={habitCount}
                selectedMonth={selectedMonth}
              />
            ) : (
              <LineChart
                habitsLog={habitsLog}
                selectedHabit={selectedHabit}
                year={year}
                month={month}
              />
            )}
          </CalendarCard>
        </CalendarWrapper>
      </TilesAndCalendarContainer>
    </ViewContainer>
  );
}

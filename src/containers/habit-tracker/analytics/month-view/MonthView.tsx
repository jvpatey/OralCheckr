import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { HabitDropdown } from "../HabitDropdown";
import { Habit, Logging } from "../../habits/Habits";
import { colors } from "../../../../common/utilities/color-utils";
import { MonthSelector } from "./MonthSelector";
import { HabitCalendar } from "./HabitCalendar";
import { LineChart } from "../../../../components/habit-tracker/analytics/month-view/LineChart";
import {
  calculateTotalCount,
  calculateMonthlyCompletion,
  calculateLongestStreak,
  calculateMissedDays,
} from "../../../../common/utilities/habit-analytics";
import { AnalyticsTile } from "../../../../components/habit-tracker/analytics/month-view/AnalyticsTile";
import { CalendarChartToggle } from "../../../../components/habit-tracker/analytics/month-view/CalendarChartToggle";

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

// Container for the entire view, centering all contents
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  animation: ${fadeUp} 1s ease-out;
`;

// Container for the tiles and calendar
const TilesAndCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 90%;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 1250px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

// Wrapper for the grid of tiles
const TileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// Wrapper for the calendar or chart
const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

// Styling for the calendar card
const CalendarCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 380px;
  max-height: 100%;

  @media (max-width: 1024px) {
    height: auto;
    max-height: none;
  }

  @media (max-width: 600px) {
    height: auto;
    max-height: none;
  }
`;

// Container for the habits dropdown and title, centered horizontally
const HabitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
    margin-top: 5px;
  }
`;

// Styling for the habits title
const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.green};
  margin-top: 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 18px;
  }
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

  // Total count calculation
  const totalCount = calculateTotalCount(habitsLog, selectedHabit, year, month);

  // Monthly completion percentage calculation
  const monthlyCompletion = calculateMonthlyCompletion(
    totalCount,
    habitCount,
    year,
    month
  );

  // Longest streak calculation
  const longestStreak = calculateLongestStreak(
    habitsLog,
    selectedHabit,
    year,
    month
  );

  // Missed days calculation
  const missedDays = calculateMissedDays(habitsLog, selectedHabit, year, month);

  return (
    <ViewContainer>
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <HabitsContainer>
        <HabitsTitle>Habits:</HabitsTitle>
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
            isMissedDays={true}
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

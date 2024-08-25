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
import { AnalyticsTile } from "./AnalyticsTile";
import {
  calculateTotalCount,
  calculateMonthlyCompletion,
  calculateLongestStreak,
} from "../../../common/utilities/habit-analytics";

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

// Wrapper for the calendar
const CalendarWrapper = styled.div`
  width: 60%;
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

// Adjusted styling for individual analytics tiles
const AnalyticsTileAdjusted = styled(AnalyticsTile)`
  height: auto;
  max-height: 180px;
  max-width: 180px;
  margin: 0 auto;
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

// Main component for the MonthView, displaying the month selector, habits dropdown, and tiles with calendar
export function MonthView({
  habits,
  onSelectHabit,
  habitsLog,
  selectedHabit,
}: ViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const habitCount =
    habits.find((habit) => habit.name === selectedHabit)?.count || 1;

  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();

  const month = selectedMonth
    .toLocaleDateString("en-US", { month: "long" })
    .toLowerCase();

  const totalCount = calculateTotalCount(
    habitsLog,
    selectedHabit,
    selectedMonth.getFullYear(),
    month
  );

  const monthlyCompletion = calculateMonthlyCompletion(
    totalCount,
    habitCount,
    daysInMonth
  );

  const longestStreak = calculateLongestStreak(
    habitsLog,
    selectedHabit,
    selectedMonth.getFullYear(),
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
          <AnalyticsTileAdjusted
            heading="Total Count"
            mainContent={totalCount}
          />
          <AnalyticsTileAdjusted
            heading="Monthly Completion"
            mainContent={`${Math.round(monthlyCompletion)}%`}
          />
          <AnalyticsTileAdjusted
            heading="Longest Streak"
            mainContent={longestStreak}
            subContent="days"
          />
        </TileWrapper>

        <CalendarWrapper>
          <CalendarCard>
            {selectedHabit && (
              <HabitCalendar
                habitsLog={habitsLog}
                selectedHabit={selectedHabit}
                year={selectedMonth.getFullYear()}
                month={month}
                habitCount={habitCount}
                selectedMonth={selectedMonth}
              />
            )}
          </CalendarCard>
        </CalendarWrapper>
      </TilesAndCalendarContainer>
    </ViewContainer>
  );
}

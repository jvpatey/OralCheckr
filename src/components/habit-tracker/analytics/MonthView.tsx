import styled from "styled-components";
import { useState } from "react";
import { HabitDropdown } from "./HabitDropdown";
import {
  Habit,
  Logging,
} from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";
import { MonthSelector } from "./MonthSelector"; // Import the new unified MonthSelector
import { HabitCalendar } from "../../../containers/habit-tracker/analytics/HabitCalendar";

// Container for the entire month view
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

// Wrapper to align the calendar to the right side
const CalendarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

// Card to contain the monthly calendar
const CalendarCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

// Title for the Habits section
const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.green};
  margin-top: 20px;
`;

// Props interface for the MonthView component
interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  habitsLog: Logging;
  selectedHabit: string;
}

// The MonthView component for displaying the monthly analytics view of the habit tracker
export function MonthView({
  habits,
  onSelectHabit,
  habitsLog,
  selectedHabit,
}: ViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const habitCount =
    habits.find((habit) => habit.name === selectedHabit)?.count || 1;

  return (
    <ViewContainer>
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <HabitsTitle>Habits</HabitsTitle>
      <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
      {selectedHabit && (
        <CalendarWrapper>
          <CalendarCard>
            <HabitCalendar
              habitsLog={habitsLog}
              selectedHabit={selectedHabit}
              year={selectedMonth.getFullYear()}
              month={selectedMonth
                .toLocaleDateString("en-US", { month: "long" })
                .toLowerCase()}
              habitCount={habitCount}
              selectedMonth={selectedMonth}
            />
          </CalendarCard>
        </CalendarWrapper>
      )}
    </ViewContainer>
  );
}

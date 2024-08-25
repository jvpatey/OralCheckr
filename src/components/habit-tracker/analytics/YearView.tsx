import styled from "styled-components";
import { HabitDropdown } from "./HabitDropdown";
import { Habit } from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";
import { YearSelector } from "./YearSelector"; // Import the YearSelector component
import { useState } from "react";

// Styled component for the container of the YearView
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;

// Styled component for the title of the habits section
const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.green};
  margin-bottom: 8px;
  margin-top: 10px;
`;

// Interface for the YearVIew props
interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
}

// Functional component for the yearview of the analytics page in the habit tracker
export function YearView({ habits, onSelectHabit }: ViewProps) {
  const [selectedYear, setSelectedYear] = useState(new Date());

  // Function to handle the change in selected year
  const handleYearChange = (date: Date) => {
    setSelectedYear(date);
  };

  return (
    <ViewContainer>
      <YearSelector
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />
      <HabitsTitle>Habits:</HabitsTitle>
      <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
    </ViewContainer>
  );
}

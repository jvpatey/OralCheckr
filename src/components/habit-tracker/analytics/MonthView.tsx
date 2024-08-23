import styled from "styled-components";
import { useState } from "react";
import { HabitDropdown } from "./HabitDropdown";
import { Habit } from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";
import { MonthPicker } from "./MonthPicker";
import { IconButton } from "../../../components/habit-tracker/habits/IconButton";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Styled components for the layout
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.green};
  margin-top: 20px;
`;

const MonthPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
}

export function MonthView({ habits, onSelectHabit }: ViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
  };

  const decreaseMonth = () => {
    const prevMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() - 1,
      1
    );
    setSelectedMonth(prevMonth);
  };

  const increaseMonth = () => {
    const nextMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      1
    );
    setSelectedMonth(nextMonth);
  };

  return (
    <ViewContainer>
      <MonthPickerContainer>
        <IconButton
          icon={faChevronLeft}
          onClick={decreaseMonth}
          borderColor={colors.blue}
          backgroundColor={colors.bgWhite}
          color={colors.blue}
          hoverBackgroundColor={colors.blue}
          hoverColor={colors.bgWhite}
        />
        <MonthPicker
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
        <IconButton
          icon={faChevronRight}
          onClick={increaseMonth}
          borderColor={colors.blue}
          backgroundColor={colors.bgWhite}
          color={colors.blue}
          hoverBackgroundColor={colors.blue}
          hoverColor={colors.bgWhite}
        />
      </MonthPickerContainer>
      <HabitsTitle>Habits</HabitsTitle>
      <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
    </ViewContainer>
  );
}

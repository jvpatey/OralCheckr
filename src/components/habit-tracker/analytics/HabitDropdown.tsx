import { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { Habit } from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";

interface HabitDropdownProps {
  habits?: Habit[];
  onSelectHabit: (habitName: string) => void;
}

const SELECTED_HABIT_KEY = "selectedHabit";

// Custom styled components for the dropdown
const CustomDropdownToggle = styled(Dropdown.Toggle)`
  background-color: ${colors.bgWhite};
  color: ${colors.blue};
  border: 2px solid ${colors.blue};
  font-size: 16px;
  width: 150px;

  &:hover,
  &:focus {
    background-color: ${colors.blue};
    color: ${colors.bgWhite};
    border-color: ${colors.blue};
    box-shadow: none;
  }

  &:active {
    background-color: ${colors.blue};
    color: ${colors.bgWhite};
    border-color: ${colors.blue};
  }
`;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  background-color: ${colors.bgWhite};
  border: 1px solid ${colors.blue};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
`;

const CustomDropdownItem = styled(Dropdown.Item)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? colors.blue : colors.textGrey)};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  background-color: transparent; // No background change

  &:hover,
  &:focus {
    background-color: transparent;
    color: ${colors.blue};
    font-weight: bold;
  }
`;

export function HabitDropdown({
  habits = [],
  onSelectHabit,
}: HabitDropdownProps) {
  const [selectedHabit, setSelectedHabit] = useState<string>("Select Habit");

  useEffect(() => {
    // Retrieve the selected habit from localStorage when the component mounts
    const storedHabit = localStorage.getItem(SELECTED_HABIT_KEY);
    if (storedHabit && habits.some((habit) => habit.name === storedHabit)) {
      setSelectedHabit(storedHabit);
      onSelectHabit(storedHabit);
    }
  }, [habits, onSelectHabit]);

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedHabit(eventKey);
      localStorage.setItem(SELECTED_HABIT_KEY, eventKey);
      onSelectHabit(eventKey);
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <CustomDropdownToggle id="dropdown-basic">
        {selectedHabit}
      </CustomDropdownToggle>

      <CustomDropdownMenu>
        {habits.length === 0 ? (
          <CustomDropdownItem disabled $isActive={false}>
            No habits found
          </CustomDropdownItem>
        ) : (
          habits.map((habit, index) => (
            <CustomDropdownItem
              key={index}
              eventKey={habit.name}
              $isActive={habit.name === selectedHabit}
            >
              {habit.name}
            </CustomDropdownItem>
          ))
        )}
      </CustomDropdownMenu>
    </Dropdown>
  );
}

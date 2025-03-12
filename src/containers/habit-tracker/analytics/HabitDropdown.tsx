import { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { Habit } from "../../../services/habitService";
import { useTheme } from "styled-components";
import { useHabitContext } from "../../../contexts/HabitContext";

interface HabitDropdownProps {
  habits?: Habit[];
  onSelectHabit: (habitName: string) => void;
}

// Custom styled components for the dropdown
const CustomDropdownToggle = styled(Dropdown.Toggle)`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.blue};
  border: 2px solid ${({ theme }) => theme.blue};
  font-size: 16px;
  width: 150px;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.blue};
    box-shadow: none;
  }

  &:active {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.blue};
  }
`;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.blue};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
`;

const CustomDropdownItem = styled(Dropdown.Item)<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.blue : theme.textGrey)};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: transparent;
    color: ${({ theme }) => theme.blue};
    font-weight: bold;
  }
`;

export function HabitDropdown({
  habits = [],
  onSelectHabit,
}: HabitDropdownProps) {
  const theme = useTheme();
  const { selectedHabit } = useHabitContext();
  const [displayHabit, setDisplayHabit] = useState<string>("Select Habit");

  useEffect(() => {
    // Update the displayed habit when the selected habit changes
    if (selectedHabit && habits.some((habit) => habit.name === selectedHabit)) {
      setDisplayHabit(selectedHabit);
    } else if (habits.length > 0 && displayHabit === "Select Habit") {
      // If no habit is selected and we have habits, select the first one
      setDisplayHabit(habits[0].name);
      onSelectHabit(habits[0].name);
    }
  }, [habits, selectedHabit, onSelectHabit, displayHabit]);

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setDisplayHabit(eventKey);
      onSelectHabit(eventKey);
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <CustomDropdownToggle id="dropdown-basic">
        {displayHabit}
      </CustomDropdownToggle>

      <CustomDropdownMenu>
        {habits.length === 0 ? (
          <CustomDropdownItem disabled $isActive={false}>
            <span style={{ color: theme.blue }}>No habits found </span>
          </CustomDropdownItem>
        ) : (
          habits.map((habit, index) => (
            <CustomDropdownItem
              key={index}
              eventKey={habit.name}
              $isActive={habit.name === displayHabit}
            >
              {habit.name}
            </CustomDropdownItem>
          ))
        )}
      </CustomDropdownMenu>
    </Dropdown>
  );
}

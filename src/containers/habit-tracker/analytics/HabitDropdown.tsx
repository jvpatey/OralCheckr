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

// Modern gradient blue dropdown toggle
const CustomDropdownToggle = styled(Dropdown.Toggle)`
  background: ${({ theme }) => theme.primaryGradient};
  color: ${({ theme }) => theme.white};
  border: none;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  width: 100%;
  text-align: center;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadowMd},
    ${({ theme }) => theme.glowColor} 0 0 15px;

  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 12px;
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.primaryGradient};
    color: ${({ theme }) => theme.white};
    border: none;
    box-shadow: ${({ theme }) =>
      `${theme.shadowLg}, ${theme.glowColor} 0 0 25px`};
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    background: ${({ theme }) => theme.primaryGradient};
    color: ${({ theme }) => theme.white};
    border: none;
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px 14px;
  }
`;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadowLg};
  width: 215px;
  padding: 8px;
  margin-top: 8px;

  @media (max-width: 600px) {
    width: 145px;
  }
`;

const CustomDropdownItem = styled(Dropdown.Item)<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.primary : theme.textSecondary};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  background-color: transparent;
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: rgba(6, 182, 212, 0.1);
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
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

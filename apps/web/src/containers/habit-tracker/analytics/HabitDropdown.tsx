import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Dropdown } from "react-bootstrap";
import { Habit } from "../../../services/habitService";
import { useTheme } from "styled-components";
import { useHabitContext } from "../../../contexts/HabitContext";

export type HabitDropdownVariant = "primary" | "outline";

interface HabitDropdownProps {
  habits?: Habit[];
  onSelectHabit: (habitName: string) => void;
  variant?: HabitDropdownVariant;
  /** Match width of a sibling control (e.g. analytics month/year toggle). */
  fullWidth?: boolean;
}

const primaryToggleStyles = css`
  background: ${({ theme }) => theme.primaryGradient};
  color: ${({ theme }) => theme.white};
  border: none;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow:
    ${({ theme }) => theme.shadowMd},
    ${({ theme }) => theme.glowColor} 0 0 15px;

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
  &:focus,
  &:active {
    background: ${({ theme }) => theme.primaryGradient} !important;
    color: ${({ theme }) => theme.white} !important;
    border: none !important;
  }

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) =>
      `${theme.shadowLg}, ${theme.glowColor} 0 0 25px`};
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
    transition-duration: 0.1s;
  }
`;

const outlineToggleStyles = css`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: transparent !important;
  color: ${({ theme }) => theme.textPrimary} !important;
  border: 1px solid ${({ theme }) => `${theme.primary}45`} !important;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  width: auto;
  min-width: 180px;
  max-width: 280px;
  text-align: center;
  border-radius: 9999px;
  min-height: 40px;
  padding: 0 18px;
  box-shadow: none !important;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;

  &::after {
    margin-left: 0.5rem;
  }

  &:hover,
  &:focus,
  &:active {
    background: ${({ theme }) => `${theme.primary}0d`} !important;
    color: ${({ theme }) => theme.primary} !important;
    border-color: ${({ theme }) => `${theme.primary}65`} !important;
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset !important;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.99);
    }
  }

  @media (max-width: 768px) {
    min-height: 38px;
    padding: 0 16px;
    font-size: 0.8125rem;
  }
`;

const CustomDropdownToggle = styled(Dropdown.Toggle)<{
  $variant: HabitDropdownVariant;
  $fullWidth?: boolean;
}>`
  padding: 10px 20px;

  ${({ $variant }) =>
    $variant === "outline" ? outlineToggleStyles : primaryToggleStyles}

  ${({ $fullWidth, $variant }) =>
    $fullWidth &&
    $variant === "outline" &&
    css`
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
      box-sizing: border-box;
    `}

  @media (max-width: 600px) {
    ${({ $variant }) =>
      $variant === "primary" &&
      css`
        font-size: 14px;
        padding: 8px 14px;
      `}
  }
`;

const CustomDropdownMenu = styled(Dropdown.Menu)<{
  $fullWidth?: boolean;
  $variant: HabitDropdownVariant;
}>`
  padding: 6px;
  margin-top: 6px;

  ${({ $variant, theme }) =>
    $variant === "outline"
      ? css`
          background: ${theme.glassBg};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${theme.primary}45;
          border-radius: 16px;
          box-shadow: none;
        `
      : css`
          background: ${theme.glassBg};
          backdrop-filter: blur(${theme.glassBlur});
          -webkit-backdrop-filter: blur(${theme.glassBlur});
          border: 1px solid ${theme.borderLight}60;
          border-radius: 12px;
          box-shadow: ${theme.shadowLg};
        `}

  ${({ $fullWidth }) =>
    $fullWidth
      ? css`
          width: 100%;
          min-width: 100%;
        `
      : css`
          width: 215px;

          @media (max-width: 600px) {
            width: 145px;
          }
        `}
`;

const CustomDropdownItem = styled(Dropdown.Item)<{
  $isActive: boolean;
  $variant: HabitDropdownVariant;
}>`
  background-color: transparent;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    font-weight 0.2s ease;

  ${({ $variant, $isActive, theme }) =>
    $variant === "outline"
      ? css`
          color: ${$isActive ? theme.primary : theme.textSecondary};
          font-weight: ${$isActive ? 600 : 500};
          font-size: 0.875rem;
          letter-spacing: -0.02em;
          border-radius: 9999px;
          padding: 8px 14px;

          &:hover,
          &:focus {
            background-color: ${theme.primary}0d !important;
            color: ${theme.primary} !important;
            font-weight: 600;
            box-shadow: 0 0 0 1px ${theme.primary}22 inset;
          }
        `
      : css`
          color: ${$isActive ? theme.primary : theme.textSecondary};
          font-weight: ${$isActive ? "600" : "400"};
          border-radius: 8px;
          padding: 8px 12px;

          &:hover,
          &:focus {
            background-color: rgba(6, 182, 212, 0.1);
            color: ${theme.primary};
            font-weight: 600;
          }
        `}

  @media (max-width: 768px) {
    ${({ $variant }) =>
      $variant === "outline" &&
      css`
        font-size: 0.8125rem;
        padding: 7px 12px;
      `}
  }
`;

export function HabitDropdown({
  habits = [],
  onSelectHabit,
  variant = "primary",
  fullWidth = false,
}: HabitDropdownProps) {
  const theme = useTheme();
  const { selectedHabit } = useHabitContext();
  const [displayHabit, setDisplayHabit] = useState<string>("Select Habit");

  useEffect(() => {
    if (selectedHabit && habits.some((habit) => habit.name === selectedHabit)) {
      setDisplayHabit(selectedHabit);
    } else if (habits.length > 0 && displayHabit === "Select Habit") {
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
      <CustomDropdownToggle
        id="dropdown-basic"
        $variant={variant}
        $fullWidth={fullWidth}
      >
        {displayHabit}
      </CustomDropdownToggle>

      <CustomDropdownMenu $fullWidth={fullWidth} $variant={variant}>
        {habits.length === 0 ? (
          <CustomDropdownItem disabled $isActive={false} $variant={variant}>
            <span style={{ color: theme.textSecondary }}>No habits found</span>
          </CustomDropdownItem>
        ) : (
          habits.map((habit, index) => (
            <CustomDropdownItem
              key={index}
              eventKey={habit.name}
              $isActive={habit.name === displayHabit}
              $variant={variant}
            >
              {habit.name}
            </CustomDropdownItem>
          ))
        )}
      </CustomDropdownMenu>
    </Dropdown>
  );
}

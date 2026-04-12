import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { TodayButton } from "../../../components/habit-tracker/analytics/TodayButton";
import { DayBubbleSelector } from "./DayBubbleSelector";
import { weekToolbarCalendarButtonBox } from "./weekToolbarTokens";

// Day strip + week calendar + Today on one row — one height token for calendar + Today
const DateControlsRow = styled.div`
  --week-toolbar-control-height: 48px;
  /* Slightly smaller than Today — solid fill + shadow otherwise looks oversized in the row */
  --week-toolbar-calendar-size: max(
    32px,
    calc(var(--week-toolbar-control-height) - 8px)
  );
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-width: 0;

  @media (max-width: 768px) {
    --week-toolbar-control-height: 44px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    --week-toolbar-control-height: 40px;
    gap: 6px;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 2px;
  }
`;

// Modern styled wrapper for the week picker dropdown
const StyledWeekPickerWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  /* react-datepicker wraps customInput — keep wrapper from changing perceived control height */
  .react-datepicker-wrapper {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    border: 0 !important;
    line-height: 0 !important;
    vertical-align: middle;
  }

  .react-datepicker {
    background: ${({ theme }) => theme.glassBg} !important;
    backdrop-filter: blur(${({ theme }) => theme.glassBlur}) !important;
    border: 1px solid ${({ theme }) => `${theme.primary}35`} !important;
    border-radius: 16px !important;
    box-shadow: ${({ theme }) => theme.shadowXl} !important;
    padding: 12px 14px !important;
    font-family: inherit !important;
    overflow: hidden !important;
  }

  .react-datepicker__header {
    background: transparent !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    padding: 0 0 8px 0 !important;
    margin-bottom: 8px !important;
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.primary} !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    margin-bottom: 6px !important;
  }

  .react-datepicker__navigation {
    background: ${({ theme }) => theme.primaryGradient} !important;
    border: 1px solid ${({ theme }) => theme.primary} !important;
    border-radius: 10px !important;
    width: 30px !important;
    height: 30px !important;
    top: 8px !important;
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset !important;
    transition: all 0.25s ease !important;

    &:hover {
      box-shadow:
        0 4px 14px rgba(0, 0, 0, 0.14),
        0 0 0 1px rgba(255, 255, 255, 0.12) inset !important;
    }

    &::before {
      border-color: white !important;
      border-width: 2px 2px 0 0 !important;
    }
  }

  .react-datepicker__navigation--previous {
    left: 6px !important;
  }

  .react-datepicker__navigation--next {
    right: 6px !important;
  }

  .react-datepicker__month {
    margin: 0 !important;
  }

  /* Fixed square cells — full pill radius on narrow inline-blocks caused tall “bars” and hid week-range labels */
  .react-datepicker__day {
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 2.25rem !important;
    height: 2.25rem !important;
    line-height: 1 !important;
    padding: 0 !important;
    margin: 2px !important;
    border-radius: 8px !important;
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 500 !important;
    transition: background 0.2s ease, color 0.2s ease !important;
    border: 1px solid transparent !important;
    vertical-align: middle !important;

    &:hover {
      background: ${({ theme }) => `${theme.primary}18`} !important;
      color: ${({ theme }) => theme.primary} !important;
    }
  }

  .react-datepicker__day--selected {
    background: ${({ theme }) => theme.primaryGradient} !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    border: 1px solid ${({ theme }) => theme.primary} !important;
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset !important;

    &:hover {
      background: ${({ theme }) => theme.primaryGradient} !important;
      color: #ffffff !important;
    }
  }

  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background: ${({ theme }) => `${theme.primary}28`} !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    border: 1px solid ${({ theme }) => `${theme.primary}55`} !important;
    border-radius: 8px !important;
    opacity: 1 !important;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background: ${({ theme }) => theme.primaryGradient} !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    border: 1px solid ${({ theme }) => theme.primary} !important;
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset !important;
  }

  .react-datepicker__day--keyboard-selected {
    background: ${({ theme }) => `${theme.primary}35`} !important;
    color: #ffffff !important;
    border-radius: 8px !important;
  }

  .react-datepicker__day--keyboard-selected.react-datepicker__day--today {
    color: #ffffff !important;
  }

  .react-datepicker__day--today:not(.react-datepicker__day--selected) {
    background: ${({ theme }) => `${theme.secondary}22`} !important;
    color: ${({ theme }) => theme.secondary} !important;
    font-weight: 600 !important;
    border: 1px solid ${({ theme }) => `${theme.secondary}45`} !important;
    border-radius: 8px !important;
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.textTertiary} !important;
    opacity: 0.45 !important;
  }

  /* Week highlight often includes adjacent-month cells; keep numbers readable */
  .react-datepicker__day--outside-month.react-datepicker__day--in-range,
  .react-datepicker__day--outside-month.react-datepicker__day--selected,
  .react-datepicker__day--outside-month.react-datepicker__day--range-start,
  .react-datepicker__day--outside-month.react-datepicker__day--range-end {
    opacity: 1 !important;
    color: #ffffff !important;
  }

  .react-datepicker__day-name {
    display: inline-block !important;
    box-sizing: border-box !important;
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 600 !important;
    width: 2.25rem !important;
    line-height: 1.2 !important;
    padding: 4px 0 6px !important;
    margin: 2px !important;
    text-align: center !important;
    text-transform: uppercase !important;
    font-size: 10px !important;
    letter-spacing: 0.04em !important;
    vertical-align: middle !important;
  }

  /* Hide the default arrow */
  .react-datepicker__triangle {
    display: none !important;
  }
`;

// Icon-only trigger — same pill language as HabitHeaderButtonPrimary (circle)
const WeekPickerIconButton = styled.button<{ $disabled: boolean }>`
  ${weekToolbarCalendarButtonBox}
  font-family: var(--font-sans), system-ui, sans-serif;
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.disabledBackground : theme.primaryGradient};
  color: ${({ $disabled, theme }) => ($disabled ? theme.textGrey : "#ffffff")};
  border: 1px solid
    ${({ $disabled, theme }) =>
      $disabled ? theme.borderLight : theme.primary};
  border-radius: 9999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  box-sizing: border-box;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  /* Lighter than header primary pills so the control matches outline neighbors visually */
  box-shadow: ${({ $disabled }) =>
    $disabled
      ? "none"
      : `0 1px 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset`};
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
    border-radius: 9999px;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.primary};
    box-shadow:
      0 3px 10px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;

    &::before {
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.5;
    transform: none;
    box-shadow: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.99);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

interface WeekPickerProps {
  isEditMode: boolean;
  onDateChange: (date: Date) => void;
}

// Functional component for the WeekPicker used in the habits page of Analytics
export function WeekPicker({ isEditMode, onDateChange }: WeekPickerProps) {
  const today = new Date();
  const [selectedFullDate, setSelectedFullDate] = useState<Date>(today);

  // When the date changes, update the internal state and trigger the callback
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedFullDate(date);
      onDateChange(date);
    }
  };

  // Calculate the start of the week for the selected date to display on WeekPicker button and Daybubble
  const startOfWeek = new Date(selectedFullDate);
  startOfWeek.setDate(selectedFullDate.getDate() - selectedFullDate.getDay());

  // Create an array of dates for the current week to display on WeekPicker button and Daybubble
  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const WeekPickerIconTrigger = forwardRef<
    HTMLButtonElement,
    { onClick?: () => void; disabled?: boolean }
  >(function WeekPickerIconTrigger({ onClick, disabled }, ref) {
    return (
      <WeekPickerIconButton
        type="button"
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        $disabled={!!disabled}
        aria-label="Open calendar to select a week"
        title="Select week"
      >
        <FontAwesomeIcon icon={faCalendarAlt} aria-hidden />
      </WeekPickerIconButton>
    );
  });

  // Handle the click on the Today button to set the selected date to today
  const handleTodayClick = () => {
    setSelectedFullDate(today);
    onDateChange(today);
  };

  return (
    <DateControlsRow>
      <DayBubbleSelector
        daysInWeek={daysInWeek}
        selectedFullDate={selectedFullDate}
        setSelectedFullDate={setSelectedFullDate}
        onDateChange={onDateChange}
        isEditMode={isEditMode}
      />
      <StyledWeekPickerWrapper>
        <DatePicker
          selected={selectedFullDate}
          onChange={handleDateChange}
          dateFormat="w/yyyy"
          showWeekPicker
          customInput={<WeekPickerIconTrigger disabled={isEditMode} />}
          disabled={isEditMode}
          maxDate={today}
          popperPlacement="bottom-end"
        />
      </StyledWeekPickerWrapper>
      <TodayButton onClick={handleTodayClick} disabled={isEditMode} />
    </DateControlsRow>
  );
}

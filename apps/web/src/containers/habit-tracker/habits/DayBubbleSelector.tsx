import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DayBubble } from "../../../components/habit-tracker/habits/DayBubble";
import { formatDateShort } from "../../../common/utilities/date-utils";
import { addWeeks, isSameWeek, subWeeks } from "date-fns";

// Main container for the entire day selector (shares toolbar row with week icon + Today)
const DayBubbleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0;
  flex: 1 1 0;
  min-width: 0;
  width: auto;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    flex: 1 1 auto;
    min-width: min(100%, 280px);
  }
`;

// Pill track — outline style aligned with HabitHeaderButtonOutline
const SegmentedControlContainer = styled.div`
  background: transparent;
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  border-radius: 9999px;
  padding: 4px;
  box-shadow: none;

  display: flex;
  position: relative;
  overflow: hidden;
  flex: 1;
  min-width: 0;
  max-width: none;

  @media (max-width: 768px) {
    padding: 4px;
  }

  @media (max-width: 640px) {
    padding: 3px;
  }

  @media (max-width: 480px) {
    padding: 3px;
  }
`;

// Sliding indicator that moves between selected days
const SlidingIndicator = styled.div<{ $selectedIndex: number; $totalDays: number }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 8px) / ${({ $totalDays }) => $totalDays});
  background: ${({ theme }) => theme.primaryGradient};
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.primary};
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  transform: translateX(calc(${({ $selectedIndex }) => $selectedIndex} * 100%));
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 0;
  pointer-events: none;
  
  /* Performance optimization */
  will-change: transform;
  backface-visibility: hidden;

  @media (max-width: 768px) {
    top: 4px;
    bottom: 4px;
    left: 4px;
    width: calc((100% - 8px) / ${({ $totalDays }) => $totalDays});
  }

  @media (max-width: 640px) {
    top: 3px;
    bottom: 3px;
    left: 3px;
    width: calc((100% - 6px) / ${({ $totalDays }) => $totalDays});
  }

  @media (max-width: 480px) {
    top: 3px;
    bottom: 3px;
    left: 3px;
    width: calc((100% - 6px) / ${({ $totalDays }) => $totalDays});
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

// Circular outline pills — same language as HabitHeaderButtonOutline
const ArrowButton = styled.button<{ $disabled: boolean }>`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: transparent;
  border: 1px solid
    ${({ $disabled, theme }) =>
      $disabled ? theme.borderLight : `${theme.primary}45`};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.textGrey : theme.textPrimary};
  font-size: 0.75rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 9999px;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;
  box-shadow: none;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.99);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
    transform: none !important;
  }
`;

interface DayBubbleSelectorProps {
  daysInWeek: Date[];
  selectedFullDate: Date;
  setSelectedFullDate: (date: Date) => void;
  onDateChange: (date: Date) => void;
  isEditMode: boolean;
}

// Functional component for day bubbles and week navigation in the habits page of Analytics
export function DayBubbleSelector({
  daysInWeek,
  selectedFullDate,
  setSelectedFullDate,
  onDateChange,
  isEditMode,
}: DayBubbleSelectorProps) {
  const today = new Date();

  // Function to handle week navigation (previous or next) based on direction
  const handleWeekChange = (direction: number) => {
    const newDate =
      direction === -1
        ? subWeeks(selectedFullDate, 1)
        : addWeeks(selectedFullDate, 1);

    // If the new date is in the future when navigating, set it to today
    if (newDate > today) {
      setSelectedFullDate(today);
      onDateChange(today);
    } else {
      setSelectedFullDate(newDate);
      onDateChange(newDate);
    }
  };

  // Handler for DayBubble click
  const handleDayClick = (day: Date) => {
    if (!isEditMode && day <= today) {
      setSelectedFullDate(day);
      onDateChange(day);
    }
  };

  // Check if today is in the current week (if yes, disable next arrow)
  const isCurrentWeek = isSameWeek(today, selectedFullDate);

  // Calculate the selected day index for the sliding indicator
  const selectedIndex = daysInWeek.findIndex(
    (day) => formatDateShort(selectedFullDate) === formatDateShort(day)
  );

  return (
    <DayBubbleContainer>
      <ArrowButton
        onClick={() => handleWeekChange(-1)}
        $disabled={isEditMode}
        disabled={isEditMode}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </ArrowButton>

      <SegmentedControlContainer>
        {/* Sliding indicator that moves to selected day */}
        {!isEditMode && selectedIndex >= 0 && (
          <SlidingIndicator 
            $selectedIndex={selectedIndex} 
            $totalDays={daysInWeek.length}
          />
        )}
        
        {/* Render day segments for each day in the current week */}
        {daysInWeek.map((day, index) => (
          <DayBubble
            key={index}
            selected={
              formatDateShort(selectedFullDate) === formatDateShort(day) &&
              !isEditMode
            }
            onClick={() => handleDayClick(day)}
            date={day}
            isEditMode={isEditMode || day > today}
            isSegmented={true}
          />
        ))}
      </SegmentedControlContainer>

      <ArrowButton
        onClick={() => handleWeekChange(1)}
        $disabled={isEditMode || isCurrentWeek}
        disabled={isEditMode || isCurrentWeek}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </ArrowButton>
    </DayBubbleContainer>
  );
}

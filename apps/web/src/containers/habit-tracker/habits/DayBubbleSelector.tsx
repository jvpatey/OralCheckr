import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DayBubble } from "../../../components/habit-tracker/habits/DayBubble";
import { formatDateShort } from "../../../common/utilities/date-utils";
import { addWeeks, isSameWeek, subWeeks } from "date-fns";

// Main container for the entire day selector
const DayBubbleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  margin-top: 0px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 0px;
  }
`;

// iOS-style segmented control container with glassmorphism
const SegmentedControlContainer = styled.div`
  /* Glassmorphism background */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  padding: 6px;
  box-shadow: ${({ theme }) => theme.shadowMd};

  display: flex;
  position: relative;
  overflow: hidden;
  flex: 1;
  max-width: 650px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 4px;
    border-radius: 14px;
  }

  @media (max-width: 640px) {
    padding: 3px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 2px;
    border-radius: 10px;
  }
`;

// Sliding indicator that moves between selected days
const SlidingIndicator = styled.div<{ $selectedIndex: number; $totalDays: number }>`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: calc((100% - 12px) / ${({ $totalDays }) => $totalDays});
  background: ${({ theme }) => theme.primaryGradient};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadowMd};
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
    top: 2px;
    bottom: 2px;
    left: 2px;
    width: calc((100% - 4px) / ${({ $totalDays }) => $totalDays});
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

// Styled component for the arrow buttons integrated with segmented design
const ArrowButton = styled.button<{ $disabled: boolean }>`
  /* Glassmorphism background */
  background: ${({ $disabled, theme }) =>
    $disabled ? "transparent" : theme.glassBg};
  backdrop-filter: ${({ $disabled }) => ($disabled ? "none" : "blur(8px)")};
  -webkit-backdrop-filter: ${({ $disabled }) =>
    $disabled ? "none" : "blur(8px)"};
  border: 1px solid
    ${({ $disabled, theme }) =>
      $disabled ? theme.borderLight : theme.borderLight};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.textGrey : theme.primary};
  font-size: 1.125rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Smoother transition matching day bubbles */
  transition: all 0.4s cubic-bezier(0.34, 1.15, 0.64, 1);
  box-shadow: ${({ theme, $disabled }) =>
    $disabled ? "none" : theme.shadowSm};
  flex-shrink: 0;
  /* Performance optimization */
  will-change: ${({ $disabled }) => ($disabled ? "auto" : "transform")};
  transform: translateZ(0);

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
    transform: scale(1.08) translateZ(0);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  &:active:not(:disabled) {
    transform: scale(0.95) translateZ(0);
    transition-duration: 0.15s;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
  }
  
  /* Reduce motion for accessibility */
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

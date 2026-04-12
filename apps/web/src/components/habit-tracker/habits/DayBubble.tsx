import styled from "styled-components";
import { formatWeekdayShort } from "../../../common/utilities/date-utils";

// iOS-style segmented control segment
const DaySegment = styled.div<{
  selected: boolean;
  $isEditMode: boolean;
  $isFirst: boolean;
  $isLast: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 3px;
  position: relative;
  cursor: ${({ $isEditMode }) => ($isEditMode ? "not-allowed" : "pointer")};
  /* Smoother, more fluid transition with spring-like easing */
  transition: all 0.4s cubic-bezier(0.34, 1.15, 0.64, 1);
  min-width: 0;
  /* Keep content above the sliding indicator */
  z-index: 1;
  /* Performance optimization */
  will-change: ${({ selected }) => (selected ? "transform" : "auto")};
  transform: translateZ(0);
  backface-visibility: hidden;
  /* Transparent background - the sliding indicator handles the visual selection */
  background: transparent;

  /* Subtle divider between segments (except for selected and last segment) */
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    bottom: 20%;
    width: 1px;
    background: ${({ theme, selected, $isLast }) =>
      selected || $isLast ? "transparent" : theme.borderLight};
    opacity: ${({ selected }) => (selected ? 0 : 0.5)};
    /* Smoother opacity transition */
    transition: opacity 0.4s cubic-bezier(0.34, 1.15, 0.64, 1);
  }

  /* Hide divider on hover */
  &:hover::after {
    opacity: 0;
    transition-duration: 0.2s;
  }

  /* Hover effect - subtle scale for all */
  &:hover {
    ${({ $isEditMode }) =>
      !$isEditMode &&
      `
      transform: scale(1.03) translateZ(0);
    `}
  }

  @media (max-width: 768px) {
    padding: 6px 4px;
  }

  @media (max-width: 480px) {
    padding: 5px 3px;
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
    transform: none !important;
  }
`;

// Date number (larger, prominent)
const DateNumber = styled.div<{ selected: boolean; $isEditMode: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ selected, $isEditMode, theme }) =>
    selected ? "white" : $isEditMode ? theme.textGrey : theme.textPrimary};
  line-height: 1.2;
  margin-bottom: 2px;
  /* Smoother color transition */
  transition: color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: color;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9375rem;
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

// Day abbreviation (smaller, below date)
const DayName = styled.div<{ selected: boolean; $isEditMode: boolean }>`
  font-size: 0.625rem;
  font-weight: 600;
  color: ${({ selected, $isEditMode, theme }) =>
    selected ? "white" : $isEditMode ? theme.textGrey : theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1;
  /* Smoother color transition */
  transition: color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: color;

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

interface DayBubbleProps {
  selected: boolean;
  onClick: () => void;
  date: Date;
  isEditMode: boolean;
  isSegmented?: boolean;
}

// Functional component to render each day segment in the segmented control
export function DayBubble({
  selected,
  onClick,
  date,
  isEditMode,
}: DayBubbleProps) {
  // For segmented control, we need to determine if this is the first or last segment
  // This will be handled by the parent, but we can infer from the day of week
  const dayOfWeek = date.getDay();
  const isFirst = dayOfWeek === 0; // Sunday
  const isLast = dayOfWeek === 6; // Saturday

  return (
    <DaySegment
      selected={selected}
      onClick={onClick}
      $isEditMode={isEditMode}
      $isFirst={isFirst}
      $isLast={isLast}
    >
      <DateNumber selected={selected} $isEditMode={isEditMode}>
        {date.getDate()}
      </DateNumber>
      <DayName selected={selected} $isEditMode={isEditMode}>
        {formatWeekdayShort(date)}
      </DayName>
    </DaySegment>
  );
}

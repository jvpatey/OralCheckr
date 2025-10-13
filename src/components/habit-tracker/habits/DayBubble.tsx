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
  padding: 10px 8px;
  position: relative;
  cursor: ${({ $isEditMode }) => ($isEditMode ? "not-allowed" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
  z-index: ${({ selected }) => (selected ? "2" : "1")};

  /* Gradient background when selected */
  ${({ selected, theme }) =>
    selected &&
    `
    background: ${theme.primaryGradient};
    border-radius: 12px;
    box-shadow: ${theme.shadowMd};
  `}

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
    transition: opacity 0.3s ease;
  }

  /* Hide divider on hover */
  &:hover::after {
    opacity: 0;
  }

  /* Hover effect - subtle background for unselected */
  &:hover {
    ${({ selected, $isEditMode, theme }) =>
      !selected &&
      !$isEditMode &&
      `
      background: ${theme.primary}15;
      border-radius: 12px;
    `}
  }

  @media (max-width: 768px) {
    padding: 8px 6px;
  }

  @media (max-width: 480px) {
    padding: 6px 4px;
  }
`;

// Date number (larger, prominent)
const DateNumber = styled.div<{ selected: boolean; $isEditMode: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ selected, $isEditMode, theme }) =>
    selected ? "white" : $isEditMode ? theme.textGrey : theme.textPrimary};
  line-height: 1.2;
  margin-bottom: 2px;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Day abbreviation (smaller, below date)
const DayName = styled.div<{ selected: boolean; $isEditMode: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ selected, $isEditMode, theme }) =>
    selected ? "white" : $isEditMode ? theme.textGrey : theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    letter-spacing: 0.3px;
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
  isSegmented = false,
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

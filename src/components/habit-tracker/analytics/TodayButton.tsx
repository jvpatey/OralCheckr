import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { TodayButtonContainer } from "./styles/DateSelectorStyles";
import styled from "styled-components";

// Styled component that extends the shared TodayButtonContainer with gradient
const StyledTodayButton = styled(TodayButtonContainer)<{ disabled: boolean }>`
  /* Gradient background */
  background: ${({ disabled, theme }) =>
    disabled ? theme.disabledBackground : theme.secondaryGradient};
  color: ${({ disabled, theme }) => (disabled ? theme.textGrey : "white")};
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-bottom: 12px;
  font-weight: 600;
  box-shadow: ${({ theme, disabled }) => (disabled ? "none" : theme.shadowMd)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 14px;

  /* Subtle glow effect overlay */
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
    border-radius: 14px;
  }

  &:hover:not([disabled]) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};

    &::before {
      opacity: 1;
    }
  }

  &:active:not([disabled]) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  svg {
    margin-right: 8px;
  }
`;

interface TodayButtonProps {
  onClick: () => void;
  disabled?: boolean; // disabled prop for use in DateRangePicker component
}

// TodayButton functional component - used in YearSelector, MonthSelector, and DateRangePicker components
export function TodayButton({ onClick, disabled = false }: TodayButtonProps) {
  return (
    <StyledTodayButton onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={faCalendarDay} />
      Today
    </StyledTodayButton>
  );
}

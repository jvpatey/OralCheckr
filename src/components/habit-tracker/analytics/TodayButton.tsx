import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { TodayButtonContainer } from "./styles/DateSelectorStyles";
import styled from "styled-components";

// Styled component that extends the shared TodayButtonContainer
const StyledTodayButton = styled(TodayButtonContainer)<{ disabled: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.disabledBackground : theme.backgroundColor};
  color: ${({ disabled, theme }) => (disabled ? theme.textGrey : theme.green)};
  border: 2px solid
    ${({ disabled, theme }) =>
      disabled ? theme.disabledBackground : theme.green};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-bottom: 11px;

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.disabledBackground : theme.green};
    border: 2px solid
      ${({ disabled, theme }) =>
        disabled ? theme.disabledBackground : theme.green};
    color: ${({ disabled, theme }) =>
      disabled ? theme.textGrey : theme.backgroundColor};
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

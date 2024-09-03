import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../common/utilities/color-utils";

// Styled component for the "Today" button with an icon
const TodayButtonStyled = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled }) =>
    disabled ? colors.disabledBgGrey : colors.bgWhite};
  color: ${({ disabled }) => (disabled ? colors.textGrey : colors.green)};
  border: 2px solid
    ${({ disabled }) => (disabled ? colors.disabledBgGrey : colors.green)};
  padding: 0 15px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-left: 10px;
  margin-bottom: 11px;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? colors.disabledBgGrey : colors.green};
    border: 2px solid
      ${({ disabled }) => (disabled ? colors.disabledBgGrey : colors.green)};
    color: ${({ disabled }) => (disabled ? colors.textGrey : colors.bgWhite)};
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 0 10px;
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
    <TodayButtonStyled onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={faCalendarDay} />
      Today
    </TodayButtonStyled>
  );
}

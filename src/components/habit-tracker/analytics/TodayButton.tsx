import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../common/utilities/color-utils";

// Styled component for the "Today" button with an icon
const TodayButtonStyled = styled.button`
  background-color: ${colors.bgWhite};
  color: ${colors.green};
  border: 2px solid ${colors.green};
  padding: 0 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-left: 10px;
  margin-bottom: 11px;

  &:hover {
    background-color: ${colors.green};
    border: 2px solid ${colors.green};
    color: ${colors.bgWhite};
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 0 10px;
  }

  // Ensures proper spacing between icon and text
  svg {
    margin-right: 8px;
  }
`;

interface TodayButtonProps {
  onClick: () => void;
}

// TodayButton component that can be used in month and year selectors
export function TodayButton({ onClick }: TodayButtonProps) {
  return (
    <TodayButtonStyled onClick={onClick}>
      <FontAwesomeIcon icon={faCalendarDay} />
      Today
    </TodayButtonStyled>
  );
}

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../common/utilities/color-utils";

interface ToggleProps {
  isCalendarView: boolean;
  setIsCalendarView: (value: boolean) => void;
}

// Container for the toggle buttons
const ToggleButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    top: 15px;
    right: 10px;
  }
`;

// Styled component for each toggle button
const ToggleButton = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) =>
    $active ? colors.green : colors.bgGrey};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  color: ${colors.white};

  &:hover {
    background-color: ${colors.darkGrey};
  }
`;

// functional component to toggle between calendar and line chart view for analytics
export function CalendarChartToggle({
  isCalendarView,
  setIsCalendarView,
}: ToggleProps) {
  return (
    <ToggleButtonContainer>
      <ToggleButton
        $active={isCalendarView}
        onClick={() => setIsCalendarView(true)}
      >
        <FontAwesomeIcon icon={faCalendarAlt} />
      </ToggleButton>
      <ToggleButton
        $active={!isCalendarView}
        onClick={() => setIsCalendarView(false)}
      >
        <FontAwesomeIcon icon={faChartLine} />
      </ToggleButton>
    </ToggleButtonContainer>
  );
}

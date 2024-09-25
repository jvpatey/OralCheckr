import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../../common/utilities/color-utils";

interface ToggleProps {
  isCalendarView: boolean;
  onToggleView: (value: boolean) => void;
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
  background-color: ${({ $active, theme }) =>
    $active ? theme.green : theme.disabledBackground};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  color: ${colors.white};

  &:hover {
    color: ${({ theme }) => theme.green};
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

// functional component to toggle between calendar and line chart view for analytics
export function CalendarChartToggle({
  isCalendarView,
  onToggleView,
}: ToggleProps) {
  return (
    <ToggleButtonContainer>
      <ToggleButton $active={isCalendarView} onClick={() => onToggleView(true)}>
        <FontAwesomeIcon icon={faCalendarAlt} />
      </ToggleButton>
      <ToggleButton
        $active={!isCalendarView}
        onClick={() => onToggleView(false)}
      >
        <FontAwesomeIcon icon={faChartLine} />
      </ToggleButton>
    </ToggleButtonContainer>
  );
}

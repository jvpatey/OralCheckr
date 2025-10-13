import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";

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
  z-index: 10;

  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
  }
`;

// Modern styled component for each toggle button
const ToggleButton = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.secondaryGradient : theme.glassBg};
  backdrop-filter: ${({ $active }) => ($active ? "none" : "blur(8px)")};
  border: ${({ $active, theme }) =>
    $active ? "none" : `1px solid ${theme.primary}`};
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  color: ${({ $active, theme }) => ($active ? theme.white : theme.primary)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  position: relative;
  overflow: hidden;

  /* Subtle glow effect for active state */
  box-shadow: ${({ $active, theme }) =>
    $active ? `${theme.shadowSm}, ${theme.glowColor} 0 0 15px` : "none"};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.secondaryGradient : theme.primaryGradient};
    color: ${({ theme }) => theme.white};
    border-color: transparent;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) =>
      `${theme.shadowMd}, ${theme.glowColor} 0 0 20px`};
  }

  &:active {
    transform: translateY(0);
    transition-duration: 0.1s;
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

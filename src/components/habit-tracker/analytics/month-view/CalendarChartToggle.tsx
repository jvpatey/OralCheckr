import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";

interface ToggleProps {
  isCalendarView: boolean;
  onToggleView: (value: boolean) => void;
}

// Compact pill-shaped toggle container
const ToggleButtonContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  padding: 4px;
  box-shadow: ${({ theme }) => theme.shadowLg};
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.05;
    border-radius: 40px;
    pointer-events: none;
  }
`;

// Floating indicator for active state
const ToggleIndicator = styled.div<{ $activeIndex: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: ${({ theme }) => theme.primaryGradient};
  border-radius: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${({ $activeIndex }) => $activeIndex * 100}%);
  box-shadow: ${({ theme }) => theme.shadowMd},
    ${({ theme }) => theme.glowColor} 0 0 15px;
  z-index: 1;

  &::after {
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
    border-radius: 40px;
  }
`;

// Individual toggle buttons - smaller compact design
const ToggleButton = styled.button<{ $active: boolean }>`
  position: relative;
  background: transparent;
  color: ${({ $active, theme }) =>
    $active ? theme.white : theme.textSecondary};
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 14px;
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${({ $active, theme }) => ($active ? theme.white : theme.primary)};
    transform: translateY(-1px);

    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    padding: 6px;

    svg {
      font-size: 12px;
    }
  }
`;

// functional component to toggle between calendar and line chart view for analytics
export function CalendarChartToggle({
  isCalendarView,
  onToggleView,
}: ToggleProps) {
  const activeIndex = isCalendarView ? 0 : 1;

  return (
    <ToggleButtonContainer>
      <ToggleIndicator $activeIndex={activeIndex} />
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

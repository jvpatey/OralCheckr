import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";

interface ToggleProps {
  isCalendarView: boolean;
  onToggleView: (value: boolean) => void;
}

/** Same outline segmented pattern as analytics Month/Year ToggleButton */
const ToggleShell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px;
  box-sizing: border-box;
  min-height: 44px;
  width: fit-content;
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  border-radius: 9999px;
  box-shadow: none;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  @media (max-width: 768px) {
    min-height: 40px;
  }
`;

const ToggleIndicator = styled.div<{ $activeIndex: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc((100% - 8px - 2px) / 2);
  height: calc(100% - 8px);
  background: ${({ theme }) => `${theme.primary}0d`};
  border-radius: 9999px;
  box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(
    calc(${({ $activeIndex }) => $activeIndex} * (100% + 2px))
  );
  z-index: 1;
  pointer-events: none;
`;

const IconSegment = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  min-width: 40px;
  min-height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 9999px;
  color: ${({ $active, theme }) =>
    $active ? theme.primary : theme.textSecondary};
  cursor: pointer;
  z-index: 2;
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1.0625rem;
  }

  @media (max-width: 768px) {
    min-width: 40px;
    min-height: 36px;

    svg {
      font-size: 1rem;
    }
  }
`;

export function CalendarChartToggle({
  isCalendarView,
  onToggleView,
}: ToggleProps) {
  const activeIndex = isCalendarView ? 0 : 1;

  return (
    <ToggleShell>
      <ToggleIndicator $activeIndex={activeIndex} />
      <IconSegment
        type="button"
        $active={isCalendarView}
        onClick={() => onToggleView(true)}
        aria-label="Calendar view"
        aria-pressed={isCalendarView}
      >
        <FontAwesomeIcon icon={faCalendarAlt} />
      </IconSegment>
      <IconSegment
        type="button"
        $active={!isCalendarView}
        onClick={() => onToggleView(false)}
        aria-label="Chart view"
        aria-pressed={!isCalendarView}
      >
        <FontAwesomeIcon icon={faChartLine} />
      </IconSegment>
    </ToggleShell>
  );
}

import styled from "styled-components";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Logging } from "../Analytics";
import { CalendarChartToggle } from "../../../../components/habit-tracker/analytics/month-view/CalendarChartToggle";
import { LineChart } from "../../../../components/habit-tracker/analytics/month-view/LineChart";
import { useTheme } from "styled-components";
import { useHabitContext } from "../../../../contexts/HabitContext";

interface CalendarProgressProps {
  habitsLog: Logging;
  year: number;
  month: string;
  habitCount: number;
  selectedMonth: Date;
  showChart: boolean;
  onToggleView: () => void;
  isLoading?: boolean;
  dateSelector?: React.ReactNode;
  onTodayClick?: () => void;
}

// Container for the entire calendar component - improved spacing
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  padding: 0;
  overflow: hidden;
  gap: 0;

  .react-datepicker {
    width: 100%;
    max-width: 100%;
    border: none;
    background-color: transparent;
    font-family: var(--font-sans), system-ui, sans-serif;
    border-radius: 8px;
    padding: 0;
  }

  .react-datepicker__header {
    display: none;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__month {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    gap: 12px 0;
  }

  .react-datepicker__week {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    margin: 0;
    text-align: center;
    border: none;
    pointer-events: none;
    padding: 1px;
    box-sizing: border-box;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
    color: ${({ theme }) => theme.primary};
  }

  .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  .react-datepicker__day--today {
    background-color: transparent;
    color: ${({ theme }) => theme.primary};
  }

  /* Hide the navigation buttons */
  .react-datepicker__navigation {
    display: none;
  }
`;

const DaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  margin: 0 0 10px 0;
  gap: 4px;
  flex-shrink: 0;
`;

const DayName = styled.div<{ $isToday?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  min-height: 36px;
  font-weight: 600;
  color: ${({ $isToday, theme }) =>
    $isToday ? theme.primary : theme.textSecondary};
  text-transform: uppercase;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-align: center;
  background: ${({ $isToday, theme }) =>
    $isToday ? `${theme.primary}14` : "transparent"};
  border-radius: 9999px;
  border: 1px solid
    ${({ $isToday, theme }) =>
      $isToday ? `${theme.primary}45` : `${theme.primary}30`};
  transition: all 0.2s ease;

  @media (max-width: 600px) {
    font-size: 0.625rem;
    padding: 6px 6px;
    min-height: 30px;
  }
`;

const DayWrapper = styled.div<{ $isCurrentDay?: boolean }>`
  position: relative;
  width: 40px;
  height: 40px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-1px) scale(1.04);
    filter: brightness(1.08);
  }

  background: transparent;
  border: none;

  @media (min-width: 1024px) {
    width: 42px;
    height: 42px;
  }
`;

const HeaderSideSpacer = styled.div`
  flex: 1 1 0;
  min-width: 0;
`;

const CalendarControlsHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin: 0 0 12px 0;
  flex-shrink: 0;
  min-height: 48px;

  @media (max-width: 800px) {
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 10px;
    margin-bottom: 8px;
  }
`;

const DateSelectorContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

const ToggleContainer = styled.div`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 800px) {
    flex: 1 1 100%;
    justify-content: center;
  }
`;

/** Holds calendar height in layout while chart is overlaid — keeps analytics tiles from resizing */
const CalendarChartSwap = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  isolation: isolate;
`;

const swapEase = "cubic-bezier(0.4, 0, 0.2, 1)";
const swapMs = "0.4s";

const ChartOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  z-index: ${({ $visible }) => ($visible ? 1 : 0)};
  display: flex;
  flex-direction: column;
  min-height: 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible
      ? "translate3d(0, 0, 0) scale(1)"
      : "translate3d(0, 14px, 0) scale(0.98)"};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity ${swapMs} ${swapEase};

  @media (prefers-reduced-motion: no-preference) {
    transition:
      opacity ${swapMs} ${swapEase},
      transform ${swapMs} ${swapEase};
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition-duration: 0.15s;
  }
`;

const CalendarMonthArea = styled.div<{ $obscured?: boolean }>`
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  opacity: ${({ $obscured }) => ($obscured ? 0 : 1)};
  transform: ${({ $obscured }) =>
    $obscured
      ? "translate3d(0, -12px, 0) scale(0.98)"
      : "translate3d(0, 0, 0) scale(1)"};
  pointer-events: ${({ $obscured }) => ($obscured ? "none" : "auto")};
  transition: opacity ${swapMs} ${swapEase};

  @media (prefers-reduced-motion: no-preference) {
    transition:
      opacity ${swapMs} ${swapEase},
      transform ${swapMs} ${swapEase};
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition-duration: 0.15s;
  }
`;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// HabitCalendar component to render the calendar with habit tracking progress
export function HabitCalendar({
  habitsLog,
  year,
  month,
  habitCount,
  selectedMonth,
  showChart,
  onToggleView,
  isLoading = false,
  dateSelector,
}: CalendarProgressProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const theme = useTheme();
  const { selectedHabit } = useHabitContext();

  // Get current day of week for highlighting
  const currentDayOfWeek = new Date().getDay();

  // Update the selected date whenever the selected month changes
  useEffect(() => {
    setSelectedDate(selectedMonth);
  }, [selectedMonth]);

  // Calculate the progress of logs vs count
  const getDayProgress = (day: number) => {
    const logs = habitsLog[selectedHabit]?.[year]?.[month]?.[day] || 0;

    // If habitCount is 0 or undefined, return 0 to avoid division by zero
    if (!habitCount) return 0;

    // Calculate progress as a percentage of logs compared to habitCount
    // Cap progress at 100% if logs are equal to or greater than habitCount
    const progress = Math.min((logs / habitCount) * 100, 100);

    return progress;
  };

  // Render content for each day in the calendar
  const renderDayContents = (day: number) => {
    const progress = getDayProgress(day);
    const isComplete = progress >= 100;
    const dayDate = new Date(year, selectedMonth.getMonth(), day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const isCurrentDay = dayDate.getTime() === currentDate.getTime();
    const isFutureDate = dayDate > currentDate;

    return (
      <DayWrapper $isCurrentDay={isCurrentDay}>
        <CircularProgressbar
          value={isLoading ? 0 : isFutureDate ? 0 : progress}
          text={day.toString()}
          strokeWidth={9}
          styles={buildStyles({
            textSize: isCurrentDay ? "22px" : "20px",
            pathColor: isComplete ? theme.secondary : theme.primary,
            textColor: isCurrentDay
              ? theme.primary
              : isFutureDate
                ? theme.textTertiary
                : theme.textPrimary,
            trailColor: isLoading
              ? theme.disabledBackground
              : isFutureDate
                ? theme.disabledBackground
                : theme.backgroundColor,
            strokeLinecap: "round",
          })}
        />
      </DayWrapper>
    );
  };

  // Handle toggle view with a default implementation if not provided
  const handleToggleView = () => {
    if (onToggleView) {
      onToggleView();
    }
  };

  return (
    <CalendarContainer>
      <CalendarControlsHeader>
        <HeaderSideSpacer aria-hidden />
        <DateSelectorContainer>{dateSelector}</DateSelectorContainer>
        <ToggleContainer>
          <CalendarChartToggle
            isCalendarView={!showChart}
            onToggleView={handleToggleView}
          />
        </ToggleContainer>
      </CalendarControlsHeader>

      <CalendarChartSwap>
        <CalendarMonthArea
          $obscured={showChart}
          aria-hidden={showChart}
        >
          <DaysHeader>
            {daysOfWeek.map((day, index) => (
              <DayName key={index} $isToday={index === currentDayOfWeek}>
                {day}
              </DayName>
            ))}
          </DaysHeader>
          <DatePicker
            selected={selectedDate}
            inline
            renderDayContents={(day) => renderDayContents(day)}
            calendarClassName="custom-calendar"
            showPopperArrow={false}
          />
        </CalendarMonthArea>
        <ChartOverlay
          $visible={showChart}
          role="region"
          aria-hidden={!showChart}
          aria-label="Daily habit logs for this month"
        >
          <LineChart habitsLog={habitsLog} year={year} month={month} />
        </ChartOverlay>
      </CalendarChartSwap>
    </CalendarContainer>
  );
}

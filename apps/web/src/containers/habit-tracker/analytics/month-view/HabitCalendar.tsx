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
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 0;
  max-height: none;
  overflow: hidden;

  .react-datepicker {
    width: 100%;
    max-width: 100%;
    border: none;
    background-color: transparent;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 8px;
    padding: 0px;
    max-height: 100%;
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
  }

  .react-datepicker__week {
    display: flex;
    width: 100%;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    margin: 0;
    text-align: center;
    border: none;
    pointer-events: none;
    padding: 3px;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
    color: ${({ theme }) => theme.blue};
  }

  .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  .react-datepicker__day--today {
    background-color: transparent;
    color: ${({ theme }) => theme.blue};
  }

  /* Hide the navigation buttons */
  .react-datepicker__navigation {
    display: none;
  }
`;

// Clean calendar days header - simplified for better hierarchy
const DaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  margin: 0 0 0.75rem 0;
  gap: 0.375rem;
  position: relative;
  z-index: 1;
`;

const DayName = styled.div<{ $isToday?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  font-weight: 600;
  color: ${({ $isToday, theme }) =>
    $isToday ? theme.secondary : theme.textTertiary};
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-align: center;
  background: ${({ $isToday }) =>
    $isToday ? "rgba(16, 185, 129, 0.1)" : "transparent"};
  border-radius: 6px;
  border: 1px solid
    ${({ $isToday }) => ($isToday ? "rgba(16, 185, 129, 0.3)" : "transparent")};
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 0.25rem;
  }
`;

// Clean wrapper for each day's circular progress bar - no weird borders
const DayWrapper = styled.div<{ $isCurrentDay?: boolean }>`
  position: relative;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Subtle hover effect without borders */
  &:hover {
    transform: translateY(-1px) scale(1.05);
    filter: brightness(1.1);
  }

  /* Remove any default borders or backgrounds */
  background: transparent;
  border: none;

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;

// Centered controls header - selector and toggle with proper centering
const CalendarControlsHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0 1.25rem 0;
  position: relative;
  z-index: 1;
  min-height: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0 1.25rem 0;
    align-items: center;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 0.75rem;
    margin: 1rem 0 1rem 0;
    align-items: center;
  }
`;

// Centered date selector container - truly centered
const DateSelectorContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    position: static;
    transform: none;
  }
`;

// Toggle container - positioned on the right
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;

  @media (max-width: 800px) {
    margin-left: 0;
    justify-content: center;
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
          styles={buildStyles({
            textSize: isCurrentDay ? "26px" : "24px",
            pathColor: isComplete ? theme.secondary : theme.primary,
            textColor: isCurrentDay
              ? theme.secondary
              : isFutureDate
              ? theme.textTertiary
              : theme.primary,
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
        <DateSelectorContainer>{dateSelector}</DateSelectorContainer>
        <ToggleContainer>
          <CalendarChartToggle
            isCalendarView={!showChart}
            onToggleView={handleToggleView}
          />
        </ToggleContainer>
      </CalendarControlsHeader>

      {!showChart ? (
        <>
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
        </>
      ) : (
        <LineChart habitsLog={habitsLog} year={year} month={month} />
      )}
    </CalendarContainer>
  );
}

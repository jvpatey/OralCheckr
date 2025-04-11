import styled from "styled-components";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Logging } from "../Analytics";
import { CalendarChartToggle } from "../../../../components/habit-tracker/analytics/month-view/CalendarChartToggle";
import { LineChart } from "../../../../components/habit-tracker/analytics/month-view/LineChart";
import { formatMonthYear } from "../../../../common/utilities/date-utils";
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
}

// Container for the entire calendar component
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
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
    height: 45px;
    margin: 0;
    text-align: center;
    border: none;
    pointer-events: none;
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

// Custom header container
const DaysHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.blue};
  text-transform: uppercase;
  padding: 0 5px;
`;

const DayName = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

// Wrapper for each day's circular progress bar
const DayWrapper = styled.div<{ $isCurrentDay?: boolean }>`
  position: relative;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

// Styled component to display the current month and year
const MonthYearDisplay = styled.div`
  color: ${({ theme }) => theme.blue};
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0px 20px 0px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px;
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
}: CalendarProgressProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const theme = useTheme();
  const { selectedHabit } = useHabitContext();

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
            textSize: isCurrentDay ? "32px" : "30px",
            pathColor: isComplete ? theme.green : theme.blue,
            textColor: isCurrentDay
              ? theme.green
              : isFutureDate
              ? theme.textGrey
              : theme.blue,
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

  // Display the current month and year based on the selected date
  const currentMonthYear = formatMonthYear(selectedDate ?? new Date());

  // Handle toggle view with a default implementation if not provided
  const handleToggleView = () => {
    if (onToggleView) {
      onToggleView();
    }
  };

  return (
    <CalendarContainer>
      <MonthYearDisplay>{currentMonthYear}</MonthYearDisplay>
      <CalendarChartToggle
        isCalendarView={!showChart}
        onToggleView={handleToggleView}
      />
      {!showChart ? (
        <>
          <DaysHeader>
            {daysOfWeek.map((day, index) => (
              <DayName key={index}>{day}</DayName>
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

import styled from "styled-components";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Logging } from "../../habits/Habits";
import { CalendarChartToggle } from "../../../../components/habit-tracker/analytics/month-view/CalendarChartToggle";
import { LineChart } from "../../../../components/habit-tracker/analytics/month-view/LineChart";
import { formatMonthYear } from "../../../../common/utilities/date-utils";
import { useTheme } from "styled-components";

interface CalendarProgressProps {
  habitsLog: Logging;
  selectedHabit: string;
  year: number;
  month: string;
  habitCount: number;
  selectedMonth: Date;
}

// Container for the entire calendar component
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 10px;
  max-height: 500px;
  overflow: hidden;

  .react-datepicker {
    width: 100%;
    max-width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.accentBackgroundColor};
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
  margin-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  text-transform: uppercase;
`;

const DayName = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

// Wrapper for each day's circular progress bar
const DayWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled component to display the current month and year
const MonthYearDisplay = styled.div`
  color: ${({ theme }) => theme.blue};
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// HabitCalendar component to render the calendar with habit tracking progress
export function HabitCalendar({
  habitsLog,
  selectedHabit,
  year,
  month,
  habitCount,
  selectedMonth,
}: CalendarProgressProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCalendarView, setIsCalendarView] = useState(true);
  const theme = useTheme();

  // Update the selected date whenever the selected month changes
  useEffect(() => {
    setSelectedDate(selectedMonth);
  }, [selectedMonth]);

  // Handler function to toggle calendar view
  const handleToggleView = (view: boolean) => {
    setIsCalendarView(view);
  };

  // Calculate the progress of logs vs count
  const getDayProgress = (day: number) => {
    const logs = habitsLog[selectedHabit]?.[year]?.[month]?.[day] || 0;
    const progress = (logs / habitCount) * 100;
    return progress;
  };

  // Render content for each day in the calendar
  const renderDayContents = (day: number) => {
    const progress = getDayProgress(day);

    return (
      <DayWrapper>
        <CircularProgressbar
          value={progress}
          text={day.toString()}
          styles={buildStyles({
            textSize: "30px",
            pathColor: progress === 100 ? theme.green : theme.blue,
            textColor: theme.blue,
            trailColor: theme.backgroundColor,
          })}
        />
      </DayWrapper>
    );
  };

  // Display the current month and year based on the selected date
  const currentMonthYear = formatMonthYear(selectedDate ?? new Date());

  return (
    <CalendarContainer>
      <MonthYearDisplay>{currentMonthYear}</MonthYearDisplay>
      <CalendarChartToggle
        isCalendarView={isCalendarView}
        onToggleView={handleToggleView}
      />
      {isCalendarView ? (
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
        <LineChart
          habitsLog={habitsLog}
          selectedHabit={selectedHabit}
          year={year}
          month={month}
        />
      )}
    </CalendarContainer>
  );
}

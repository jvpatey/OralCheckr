import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { HabitDropdown } from "../HabitDropdown";
import { Habit, Logging } from "../../habits/Habits";
import { HabitCalendar } from "./HabitCalendar";
import {
  calculateTotalCount,
  calculateMonthlyCompletion,
  calculateLongestStreak,
  calculateMissedDays,
} from "../../../../common/utilities/habit-analytics";
import { AnalyticsTile } from "../../../../components/habit-tracker/analytics/month-view/AnalyticsTile";
import { AnalyticsDateSelector } from "../AnalyticsDateSelector";
import { ViewType } from "../AnalyticsDateSelector";
import { formatDateLong } from "../../../../common/utilities/date-utils";
import { LoadingComponent } from "../../../../components/habit-tracker/analytics/LoadingComponent";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Container for the entire view, centering all contents
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  animation: ${fadeUp} 0.5s ease-out;
`;

// Container for the tiles and calendar
const TilesAndCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 90%;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: auto;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

// Wrapper for the grid of tiles
const TileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, minmax(130px, 1fr));
    max-width: 800px;
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    max-width: 300px;
  }
`;

// Wrapper for the calendar or chart
const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

// Styling for the calendar card
const CalendarCard = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 380px;
  max-height: 100%;

  @media (max-width: 1024px) {
    height: auto;
    max-height: none;
  }

  @media (max-width: 600px) {
    height: auto;
    max-height: none;
  }
`;

// Container for the habits dropdown and title, centered horizontally
const HabitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
    margin-top: 5px;
  }
`;

// Styling for the habits title
const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  margin-top: 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

// Interface defining the props for the MonthView component
interface ViewProps {
  habits: Habit[];
  onSelectHabit: (habitName: string) => void;
  habitsLog: Logging;
  selectedHabit: string;
  hideAnalytics: boolean;
}

// Functional component for the month view of the analytics page in the habit tracker
export function MonthView({
  habits,
  onSelectHabit,
  habitsLog,
  selectedHabit,
  hideAnalytics,
}: ViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  // The MonthView rendering causes the MonthView page to load slowly. 
  // A loading component is displayed initially while the Monthview components are loading. 
  // Once the Monthview components are fully loaded, the loading state is set to false, 
  // and the MonthView is displayed in place of the loading component.
  const isMonthViewMounted = () => {
    setLoading(false);
  };

  useEffect(() => {
    isMonthViewMounted();
  }, []);

  // Handler function to update the selected month
  const onMonthChange = (date: Date) => {
    setSelectedMonth(date);
  };

  const habitCount = habits.find((habit) => habit.name === selectedHabit)?.count || 1;
  const year = selectedMonth.getFullYear();
  const month = formatDateLong(selectedMonth);

  const totalCount = calculateTotalCount(habitsLog, selectedHabit, year, month);
  const monthlyCompletion = calculateMonthlyCompletion(totalCount, habitCount, year, month);
  const longestStreak = calculateLongestStreak(habitsLog, selectedHabit, year, month, habitCount);
  const missedDays = calculateMissedDays(habitsLog, selectedHabit, year, month);

  // If data is loading, show the loading spinner
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <ViewContainer>
      <AnalyticsDateSelector
        selectedDate={selectedMonth}
        onDateChange={onMonthChange}
        viewType={ViewType.MONTH}
      />
      <HabitsContainer>
        <HabitsTitle>Habits:</HabitsTitle>
        <HabitDropdown habits={habits} onSelectHabit={onSelectHabit} />
      </HabitsContainer>

      {!hideAnalytics && (
        <TilesAndCalendarContainer>
          <TileWrapper>
            <AnalyticsTile heading="Total Count" mainContent={totalCount} />
            <AnalyticsTile
              heading="Monthly Completion"
              mainContent={`${monthlyCompletion}%`}
            />
            <AnalyticsTile
              heading="Longest Streak"
              mainContent={longestStreak}
              subContent="days"
            />
            <AnalyticsTile
              heading="Missed Days"
              mainContent={missedDays}
              subContent="days"
              isMissedDays={true}
            />
          </TileWrapper>

          <CalendarWrapper>
            <CalendarCard>
              <HabitCalendar
                habitsLog={habitsLog}
                selectedHabit={selectedHabit}
                year={year}
                month={month}
                habitCount={habitCount}
                selectedMonth={selectedMonth}
              />
            </CalendarCard>
          </CalendarWrapper>
        </TilesAndCalendarContainer>
      )}
    </ViewContainer>
  );
}

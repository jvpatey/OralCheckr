import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { Habit } from "../../../../services/habitService";
import { Logging } from "../Analytics";
import { HabitCalendar } from "./HabitCalendar";
import {
  calculateTotalCount,
  calculateMonthlyCompletion,
  calculateLongestStreak,
  calculateMissedDays,
  calculatePerfectDays,
  calculateCurrentStreakInMonth,
  getDaysInMonth,
} from "../../../../common/utilities/habit-analytics";
import { AnalyticsTile } from "../../../../components/habit-tracker/analytics/month-view/AnalyticsTile";
import { AnalyticsDateSelector } from "../AnalyticsDateSelector";
import { ViewType } from "../AnalyticsDateSelector";
import { useHabitContext } from "../../../../contexts/HabitContext";
import {
  AnalyticsViewRoot,
  AnalyticsGrid,
  TilesSection,
  CalendarSection,
  TilesContainer,
} from "../../../../components/habit-tracker/analytics/styles/SharedAnalyticsStyles";
import {
  analyticsOpacityVariants,
  useAnalyticsOpacityTransition,
} from "../analyticsMotion";
import { CalendarContainer } from "../../../../components/habit-tracker/analytics/styles/MonthViewStyles";

const MonthAnalyticsGridMotion = motion(AnalyticsGrid);

interface ViewProps {
  habits: Habit[];
  habitsLog: Logging;
  hideAnalytics: boolean;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isLoading?: boolean;
}

const MONTH_ANALYTICS_TILE_DESCRIPTIONS = {
  completionRate: "Percent of a perfect month.",
  perfectDays: "Days you fully hit your daily target.",
  currentStreak: "Consecutive days where you hit your full daily target.",
  longestStreak: "Your best run of fully completed days this month.",
  totalLogs: "Every check-in this month added together.",
  missedDays: "Days in this month with no check-in.",
} as const;

export function MonthView({
  habits,
  habitsLog,
  hideAnalytics,
  selectedDate,
  onDateChange,
  isLoading = false,
}: ViewProps) {
  const { selectedHabit } = useHabitContext();
  const [showChart, setShowChart] = useState(false);
  const dateContentTransition = useAnalyticsOpacityTransition();

  const onMonthChange = (date: Date) => {
    onDateChange(date);
  };

  const handleToggleView = () => {
    setShowChart(!showChart);
  };

  const handleTodayClick = () => {
    const today = new Date();
    onDateChange(today);
  };

  const currentMonth = selectedDate
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const currentYear = selectedDate.getFullYear();

  const habitCount = habits.find((h) => h.name === selectedHabit)?.count || 1;

  const totalCount = selectedHabit
    ? calculateTotalCount(habitsLog, selectedHabit, currentYear, currentMonth)
    : 0;

  const completionRate = calculateMonthlyCompletion(
    totalCount,
    habitCount,
    currentYear,
    currentMonth,
  );

  const longestStreak = selectedHabit
    ? calculateLongestStreak(
        habitsLog,
        selectedHabit,
        currentYear,
        currentMonth,
        habitCount,
      )
    : 0;

  const missedDays = selectedHabit
    ? calculateMissedDays(habitsLog, selectedHabit, currentYear, currentMonth)
    : 0;

  const perfectDays = selectedHabit
    ? calculatePerfectDays(
        habitsLog,
        selectedHabit,
        currentYear,
        currentMonth,
        habitCount,
      )
    : 0;

  const currentStreakInMonth = selectedHabit
    ? calculateCurrentStreakInMonth(
        habitsLog,
        selectedHabit,
        currentYear,
        currentMonth,
        habitCount,
      )
    : 0;

  const daysInSelectedMonth = getDaysInMonth(
    currentYear,
    new Date(`${currentMonth} 1, ${currentYear}`).getMonth(),
  );

  const habitLogs =
    selectedHabit && habitsLog[selectedHabit]
      ? habitsLog[selectedHabit][currentYear]?.[currentMonth] || {}
      : {};

  const formattedHabitLogs: Logging = {};
  if (selectedHabit) {
    formattedHabitLogs[selectedHabit] = {};
    formattedHabitLogs[selectedHabit][currentYear] = {};
    formattedHabitLogs[selectedHabit][currentYear][currentMonth] = habitLogs;
  }

  if (hideAnalytics) {
    return null;
  }

  const dateContentKey = format(selectedDate, "yyyy-MM");

  return (
    <AnalyticsViewRoot>
      <AnimatePresence mode="wait" initial={false}>
        <MonthAnalyticsGridMotion
          key={dateContentKey}
          variants={analyticsOpacityVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={dateContentTransition}
        >
          <TilesSection>
            <TilesContainer>
              <AnalyticsTile
                heading="Completion Rate"
                mainContent={isLoading ? "..." : `${completionRate}%`}
                subContent=""
                description={MONTH_ANALYTICS_TILE_DESCRIPTIONS.completionRate}
                progressPercent={isLoading ? undefined : completionRate}
                isLoading={isLoading}
              />
              <AnalyticsTile
                heading="Perfect Days"
                mainContent={isLoading ? "..." : perfectDays}
                subContent={
                  isLoading ? "" : `of ${daysInSelectedMonth} days`
                }
                description={MONTH_ANALYTICS_TILE_DESCRIPTIONS.perfectDays}
                isLoading={isLoading}
              />
              <AnalyticsTile
                heading="Current Streak"
                mainContent={isLoading ? "..." : currentStreakInMonth}
                subContent=""
                description={MONTH_ANALYTICS_TILE_DESCRIPTIONS.currentStreak}
                isLoading={isLoading}
              />
              <AnalyticsTile
                heading="Longest Streak"
                mainContent={isLoading ? "..." : longestStreak}
                subContent=""
                description={MONTH_ANALYTICS_TILE_DESCRIPTIONS.longestStreak}
                isLoading={isLoading}
              />
              <AnalyticsTile
                heading="Total Logs"
                mainContent={isLoading ? "..." : totalCount}
                subContent=""
                description={MONTH_ANALYTICS_TILE_DESCRIPTIONS.totalLogs}
                isLoading={isLoading}
              />
              <AnalyticsTile
                heading="Missed Days"
                mainContent={isLoading ? "..." : missedDays}
                subContent=""
                description={MONTH_ANALYTICS_TILE_DESCRIPTIONS.missedDays}
                isMissedDays={true}
                isLoading={isLoading}
              />
            </TilesContainer>
          </TilesSection>

          <CalendarSection>
            <CalendarContainer>
              <HabitCalendar
                habitsLog={formattedHabitLogs}
                year={currentYear}
                month={currentMonth}
                habitCount={habitCount}
                selectedMonth={selectedDate}
                showChart={showChart}
                onToggleView={handleToggleView}
                isLoading={isLoading}
                onTodayClick={handleTodayClick}
                suppressLayoutEntrance
                dateSelector={
                  <AnalyticsDateSelector
                    selectedDate={selectedDate}
                    onDateChange={onMonthChange}
                    viewType={ViewType.MONTH}
                  />
                }
              />
            </CalendarContainer>
          </CalendarSection>
        </MonthAnalyticsGridMotion>
      </AnimatePresence>
    </AnalyticsViewRoot>
  );
}

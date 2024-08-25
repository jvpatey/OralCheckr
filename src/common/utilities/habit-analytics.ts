import { Logging } from "../../containers/habit-tracker/habits/Habits";
import _ from 'lodash';

// Calculation of total count for analytics tile
export function calculateTotalCount(
  habitsLog: Logging,
  selectedHabit: string,
  year: number,
  month: string
): number {
  const logsForHabit = habitsLog[selectedHabit];
  if (!logsForHabit || !logsForHabit[year] || !logsForHabit[year][month]) {
    return 0;
  }

  const dailyLogs = logsForHabit[year][month];

  return _.sum(_.values(dailyLogs));
}

// Utility function to calculate the monthly completion percentage
export function calculateMonthlyCompletion(
  totalCount: number,
  habitCount: number,
  daysInMonth: number
): number {
  const totalPossible = habitCount * daysInMonth;
  return totalPossible > 0 ? Math.round((totalCount / totalPossible) * 100) : 0;
}

// Utility function to calculate the longest streak
export function calculateLongestStreak(
  habitsLog: Logging,
  habitName: string,
  year: number,
  month: string,
  daysInMonth: number
): number {
  const logsForMonth = habitsLog[habitName]?.[year]?.[month] || {};
  let longestStreak = 0;
  let currentStreak = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    if (logsForMonth[day]) {
      currentStreak += 1;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return longestStreak;
}

// Utility function to calculate the number of missed days
export function calculateMissedDays(
  habitsLog: Logging,
  habitName: string,
  year: number,
  month: string,
  daysInMonth: number
): number {
  const logsForMonth = habitsLog[habitName]?.[year]?.[month] || {};
  let missedDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    if (!logsForMonth[day]) {
      missedDays += 1;
    }
  }

  return missedDays;
}

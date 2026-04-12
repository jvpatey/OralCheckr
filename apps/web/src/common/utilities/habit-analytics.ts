import { Logging } from "../../containers/habit-tracker/analytics/Analytics";
import _ from "lodash";

// Utility function to calculate the number of days in a given month and year
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

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
  year: number,
  month: string
): number {
  const daysInMonth = getDaysInMonth(
    year,
    new Date(`${month} 1, ${year}`).getMonth()
  );
  const totalPossible = habitCount * daysInMonth;
  return totalPossible > 0 ? Math.round((totalCount / totalPossible) * 100) : 0;
}

// Utility function to calculate the longest streak
export function calculateLongestStreak(
  habitsLog: Logging,
  habitName: string,
  year: number,
  month: string,
  habitCount: number
): number {
  const daysInMonth = getDaysInMonth(
    year,
    new Date(`${month} 1, ${year}`).getMonth()
  );
  const logsForMonth = habitsLog[habitName]?.[year]?.[month] || {};
  let longestStreak = 0;
  let currentStreak = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    // Check if the log for the day exists and is complete
    if (logsForMonth[day] && logsForMonth[day] >= habitCount) {
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
  month: string
): number {
  const daysInMonth = getDaysInMonth(
    year,
    new Date(`${month} 1, ${year}`).getMonth()
  );
  const logsForMonth = habitsLog[habitName]?.[year]?.[month] || {};
  let missedDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    if (!logsForMonth[day]) {
      missedDays += 1;
    }
  }

  return missedDays;
}

/** Days in the month where the habit met its full daily target. */
export function calculatePerfectDays(
  habitsLog: Logging,
  habitName: string,
  year: number,
  month: string,
  habitCount: number
): number {
  const daysInMonth = getDaysInMonth(
    year,
    new Date(`${month} 1, ${year}`).getMonth()
  );
  const logsForMonth = habitsLog[habitName]?.[year]?.[month] || {};
  let perfect = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    if (logsForMonth[day] && logsForMonth[day] >= habitCount) {
      perfect += 1;
    }
  }

  return perfect;
}

/**
 * Consecutive complete days ending at the last relevant day of the month:
 * for the current calendar month, through today; otherwise through the last day of the month.
 */
export function calculateCurrentStreakInMonth(
  habitsLog: Logging,
  habitName: string,
  year: number,
  month: string,
  habitCount: number,
  today: Date = new Date()
): number {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const logsForMonth = habitsLog[habitName]?.[year]?.[month] || {};

  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === monthIndex;
  const endDay = isCurrentMonth
    ? Math.min(today.getDate(), daysInMonth)
    : daysInMonth;

  let streak = 0;
  for (let day = endDay; day >= 1; day--) {
    if (logsForMonth[day] && logsForMonth[day] >= habitCount) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

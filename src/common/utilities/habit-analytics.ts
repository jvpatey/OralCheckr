import { Logging } from "../../containers/habit-tracker/habits/Habits";
import _ from 'lodash';

// calculation of total count for analytics tile
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

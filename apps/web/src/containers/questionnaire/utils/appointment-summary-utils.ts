import { format, parseISO, subDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import type { Habit } from "../../../services/habitService";

export interface HabitAdherenceRow {
  habitId: number;
  name: string;
  goalPerDay: number;
  daysInWindow: number;
  daysMetGoal: number;
  percent: number;
}

/** Last `dayCount` calendar days ending today, as `yyyy-MM-dd` in `timeZone` (oldest first). */
export function getLastNDayKeysInTimeZone(
  dayCount: number,
  timeZone: string,
  referenceNow: Date = new Date()
): string[] {
  const keys: string[] = [];
  for (let i = dayCount - 1; i >= 0; i--) {
    const d = subDays(referenceNow, i);
    keys.push(formatInTimeZone(d, timeZone, "yyyy-MM-dd"));
  }
  return keys;
}

/**
 * Distinct { year, month } pairs for habit log API calls (`month` is full English name, lowercased).
 */
export function getMonthQueryPairsForDayKeys(
  dayKeys: string[]
): { year: number; month: string }[] {
  const pairs = new Map<string, { year: number; month: string }>();

  for (const key of dayKeys) {
    const d = parseISO(`${key}T12:00:00`);
    const year = Number(format(d, "yyyy"));
    const month = format(d, "MMMM").toLowerCase();
    pairs.set(`${year}-${month}`, { year, month });
  }

  return [...pairs.values()];
}

/**
 * Adherence over `dayKeys` (each key must match habit log map keys, e.g. from the same normalizer).
 * A day counts when log count >= habit.count for that habit.
 */
export function buildHabitAdherenceForDayKeys(
  habits: Habit[],
  logsByHabitId: Record<number, Record<string, number>>,
  dayKeys: string[]
): HabitAdherenceRow[] {
  return habits
    .filter((h): h is Habit & { habitId: number } => Boolean(h.habitId))
    .map((habit) => {
      const goal = Math.max(1, habit.count);
      const logs = logsByHabitId[habit.habitId] ?? {};
      let daysMetGoal = 0;

      for (const key of dayKeys) {
        const actual = logs[key] ?? 0;
        if (actual >= goal) {
          daysMetGoal += 1;
        }
      }

      const daysInWindow = dayKeys.length;
      const percent =
        daysInWindow > 0
          ? Math.round((daysMetGoal / daysInWindow) * 100)
          : 0;

      return {
        habitId: habit.habitId,
        name: habit.name,
        goalPerDay: goal,
        daysInWindow,
        daysMetGoal,
        percent,
      };
    });
}

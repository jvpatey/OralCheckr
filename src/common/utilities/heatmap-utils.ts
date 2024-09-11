import { eachDayOfInterval } from 'date-fns';
import { Logging } from "../../containers/habit-tracker/habits/Habits";
import { formatDateLong } from "./date-utils";

// Interface for the structure of a single heatmap data point
interface HeatmapDataPoint {
  x: number; // month (1-12)
  y: number; // log count for that day
  day: number; // The day of the month (1-31)
}

// Interface for the structure of the heatmap series
export interface HeatmapSeries {
  name: string; // Day of the week
  data: HeatmapDataPoint[]; // Array of data points for the series
}

// Function to generate heatmap data from the logging data
export function generateHeatmapData(
  habitLog: Logging,
  habitName: string,
  selectedYear: number
): HeatmapSeries[] {
  const logsForHabit = habitLog[habitName]; // Logs specific to the selected habit
  const logsGroupedByWeekday = new Map<string, HeatmapDataPoint[]>(); // Map to group logs by the day of the week

  // Dynamically get th number of days of the selected year
  const daysInYear = eachDayOfInterval({
    start: new Date(selectedYear, 0, 1),
    end: new Date(selectedYear, 11, 31),
  });

  // Iterate over each day of the year
  daysInYear.forEach((currentDate) => {
    const logCountForDay =
      logsForHabit?.[selectedYear]?.[formatDateLong(currentDate)]?.[currentDate.getDate()] || 0;

    const dayOfWeek = currentDate.getDay();
    const month = currentDate.getMonth() + 1;
    const dayOfMonth = currentDate.getDate();

    // Retrieve the logs for the current day of the week
    const logsForWeekday = logsGroupedByWeekday.get(dayOfWeek.toString()) || [];

    // Add the log entry for the current day
    logsForWeekday.push({ x: month, y: logCountForDay, day: dayOfMonth });

    // Update the map with the new log entry for this day of the week
    logsGroupedByWeekday.set(dayOfWeek.toString(), logsForWeekday);
  });

  // Convert the map to an array of series, suitable for ApexCharts
  return Array.from(logsGroupedByWeekday.entries()).map(([weekday, logs]) => ({
    name: weekday,
    data: logs,
  }));
}

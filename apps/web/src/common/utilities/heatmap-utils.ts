import { format } from "date-fns";
import { Logging } from "../../containers/habit-tracker/analytics/Analytics";

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

  // Initialize the map with empty arrays for each day of the week
  for (let i = 0; i < 7; i++) {
    logsGroupedByWeekday.set(i.toString(), []);
  }

  // Get all months in the year
  for (let month = 0; month < 12; month++) {
    const monthName = format(
      new Date(selectedYear, month, 1),
      "MMMM"
    ).toLowerCase();
    const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();

    // Check each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(selectedYear, month, day);
      const dayOfWeek = currentDate.getDay();

      // Get the log count for this day
      const logCountForDay =
        logsForHabit?.[selectedYear]?.[monthName]?.[day] || 0;

      // Add the log entry for the current day
      const logsForWeekday =
        logsGroupedByWeekday.get(dayOfWeek.toString()) || [];
      logsForWeekday.push({ x: month + 1, y: logCountForDay, day: day });
      logsGroupedByWeekday.set(dayOfWeek.toString(), logsForWeekday);
    }
  }

  // Convert the map to an array of series, suitable for ApexCharts
  return Array.from(logsGroupedByWeekday.entries()).map(([weekday, logs]) => ({
    name: weekday,
    data: logs,
  }));
}

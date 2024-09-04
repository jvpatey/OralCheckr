import { Logging } from "../../containers/habit-tracker/habits/Habits";

export interface HeatmapEntry {
  month: number;
  dayOfWeek: number;
  logCount: number;
  dayOfMonth: number;
}

// Function to generate heatmap data from the logging data
export function generateHeatmapData(
  habitLog: Logging,
  habitName: string,
  selectedYear: number
): HeatmapEntry[] {
  const habitLogData = habitLog[habitName];
  const heatmapEntries: HeatmapEntry[] = [];

  // Iterate over each day of the year
  for (let dayOfYear = 0; dayOfYear < 365; dayOfYear++) {
    const currentDate = new Date(selectedYear, 0, 1 + dayOfYear);

    // Calculate the number of logs for the current date
    const logCount =
      habitLogData?.[selectedYear]?.[currentDate.toLocaleString("default", { month: "long" }).toLowerCase()]?.[currentDate.getDate()] || 0;

    // Push a new HeatmapEntry into the array with the necessary information
    heatmapEntries.push({
      month: currentDate.getMonth() + 1, // Numeric month value
      dayOfWeek: currentDate.getDay(),   // Day of the week
      logCount,                          // Number of logs for the specific date
      dayOfMonth: currentDate.getDate(), // Day of the month
    });
  }

  return heatmapEntries;
}



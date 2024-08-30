import { Logging } from "../../containers/habit-tracker/habits/Habits";

// Interface for heatmap data
export interface HeatmapData {
    date: string;
    count: number;
}

// Function to generate heatmap data from the logging data
export function generateHeatmapData(habitLog: Logging, habitName: string): HeatmapData[] {
    const habitData = habitLog[habitName];
    if (!habitData) return [];

    const heatmapData: HeatmapData[] = [];
  
    for (const year in habitData) {
      for (const month in habitData[year]) {
        for (const day in habitData[year][month]) {
          const date = new Date(`${year}-${month}-${day}`).toISOString().split("T")[0];
          const count = habitData[year][month][day];
          heatmapData.push({ date, count });
        }
      }
    }
    return heatmapData;
}

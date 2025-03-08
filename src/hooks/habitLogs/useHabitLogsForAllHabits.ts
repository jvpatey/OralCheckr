import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fetchHabitLogs } from "../../services/habitLogService";

/* -- Hook for fetching logs for all habits -- */
export const useHabitLogsForAllHabits = (
  habitIds: number[],
  year: number,
  month: string
) => {
  const [habitLogsMap, setHabitLogsMap] = useState<
    Record<number, Record<string, number>>
  >({});

  // Use a single query to fetch all habit logs
  const {
    data: allHabitLogsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allHabitLogs", habitIds, year, month],
    queryFn: async () => {
      // Fetch logs for each habit in parallel
      const promises = habitIds.map((habitId) =>
        fetchHabitLogs(habitId, year, month)
      );

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Return the results with their corresponding habitIds
      return results.map((result, index) => ({
        habitId: habitIds[index],
        logs: result.logs,
      }));
    },
    enabled: habitIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Process the data when it changes
  useEffect(() => {
    if (allHabitLogsData) {
      const newHabitLogsMap: Record<number, Record<string, number>> = {};

      // Initialize with empty records for all habits
      habitIds.forEach((id) => {
        newHabitLogsMap[id] = {};
      });

      // Process each habit's logs
      allHabitLogsData.forEach((habitData) => {
        if (habitData.habitId && habitData.logs) {
          habitData.logs.forEach((log) => {
            const dateStr = format(new Date(log.date), "yyyy-MM-dd");
            if (!newHabitLogsMap[habitData.habitId]) {
              newHabitLogsMap[habitData.habitId] = {};
            }
            newHabitLogsMap[habitData.habitId][dateStr] = log.count;
          });
        }
      });

      setHabitLogsMap(newHabitLogsMap);
    }
  }, [allHabitLogsData, habitIds]);

  return {
    habitLogsMap,
    isLoading,
    isError,
    error,
  };
};

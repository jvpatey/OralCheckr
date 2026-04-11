import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { fetchHabitLogs, HabitLog } from "../../services/habitLogService";

// Get local timezone
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Convert dates to YYYY-MM-DD format in local timezone
const normalizeDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);
  const zonedDate = toZonedTime(dateObj, TIMEZONE);
  return format(zonedDate, "yyyy-MM-dd");
};

// Data structure for habit logs
interface HabitLogsData {
  habitId: number;
  logs: HabitLog[] | undefined;
}

// Hook for managing logs across multiple habits
export const useHabitLogsForAllHabits = (
  habitIds: number[],
  year: number,
  month: string
) => {
  // Store logs in a map for quick access
  const [habitLogsMap, setHabitLogsMap] = useState<
    Record<number, Record<string, number>>
  >({});

  const queryClient = useQueryClient();

  // Fetch logs for all habits
  const {
    data: allHabitLogsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<HabitLogsData[]>({
    queryKey: ["allHabitLogs", habitIds, year, month],
    queryFn: async (): Promise<HabitLogsData[]> => {
      const promises = habitIds.map((habitId) =>
        fetchHabitLogs(habitId, year, month)
      );

      const results = await Promise.all(promises);

      return results.map((result, index) => ({
        habitId: habitIds[index],
        logs: result.logs,
      }));
    },
    enabled: habitIds.length > 0,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  // Process and store fetched logs
  useEffect(() => {
    if (allHabitLogsData) {
      const newHabitLogsMap: Record<number, Record<string, number>> = {};

      habitIds.forEach((id) => {
        newHabitLogsMap[id] = {};
      });

      allHabitLogsData.forEach((habitData: HabitLogsData) => {
        if (habitData.habitId && habitData.logs) {
          habitData.logs.forEach((log: HabitLog) => {
            const dateStr = normalizeDate(log.date);
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

  // Refresh data when date changes
  useEffect(() => {
    if (habitIds.length > 0) {
      refetch();
    }
  }, [year, month, refetch, habitIds]);

  // Update log count for a specific habit and date
  const updateLogCount = useCallback(
    (habitId: number, date: Date, count: number) => {
      const dateStr = normalizeDate(date);

      const updatedHabitLogsMap = { ...habitLogsMap };

      if (!updatedHabitLogsMap[habitId]) {
        updatedHabitLogsMap[habitId] = {};
      }

      if (count <= 0) {
        delete updatedHabitLogsMap[habitId][dateStr];
      } else {
        updatedHabitLogsMap[habitId][dateStr] = count;
      }

      setHabitLogsMap(updatedHabitLogsMap);

      queryClient.setQueryData<HabitLogsData[]>(
        ["allHabitLogs", habitIds, year, month],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((habitData) => {
            if (habitData.habitId !== habitId) return habitData;

            const updatedLogs = habitData.logs ? [...habitData.logs] : [];

            const existingLogIndex = updatedLogs.findIndex(
              (log) => normalizeDate(log.date) === dateStr
            );

            if (existingLogIndex >= 0) {
              if (count <= 0) {
                updatedLogs.splice(existingLogIndex, 1);
              } else {
                updatedLogs[existingLogIndex] = {
                  ...updatedLogs[existingLogIndex],
                  count,
                };
              }
            } else if (count > 0) {
              updatedLogs.push({
                habitId,
                date: dateStr,
                count,
              });
            }

            return {
              ...habitData,
              logs: updatedLogs,
            };
          });
        }
      );
    },
    [habitLogsMap, queryClient, habitIds, year, month]
  );

  // Force refresh from server
  const syncWithServer = useCallback(async () => {
    if (habitIds.length > 0) {
      refetch();
    }
  }, [refetch, habitIds]);

  return {
    habitLogsMap,
    updateLogCount,
    syncWithServer,
    isLoading,
    isError,
    error,
  };
};

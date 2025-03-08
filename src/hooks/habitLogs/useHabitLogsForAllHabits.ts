import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fetchHabitLogs, HabitLog } from "../../services/habitLogService";

interface HabitLogsData {
  habitId: number;
  logs: HabitLog[] | undefined;
}

interface PendingUpdate {
  habitId: number;
  dateStr: string;
  count: number;
}

/* -- Hook for fetching logs for all habits -- */
export const useHabitLogsForAllHabits = (
  habitIds: number[],
  year: number,
  month: string
) => {
  const [habitLogsMap, setHabitLogsMap] = useState<
    Record<number, Record<string, number>>
  >({});

  // Keep track of pending updates
  const pendingUpdatesRef = useRef<PendingUpdate[]>([]);

  // Flag to prevent refetching immediately after a local update
  const skipNextRefetchRef = useRef<boolean>(false);

  // Flag to force a fresh fetch from the server
  const forceFreshFetchRef = useRef<boolean>(false);

  // Use a single query to fetch all habit logs
  const {
    data: allHabitLogsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<HabitLogsData[]>({
    queryKey: ["allHabitLogs", habitIds, year, month],
    queryFn: async (): Promise<HabitLogsData[]> => {
      if (skipNextRefetchRef.current && !forceFreshFetchRef.current) {
        skipNextRefetchRef.current = false;
        return allHabitLogsData || [];
      }

      // Reset the force fresh fetch flag
      forceFreshFetchRef.current = false;

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
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
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
      allHabitLogsData.forEach((habitData: HabitLogsData) => {
        if (habitData.habitId && habitData.logs) {
          habitData.logs.forEach((log: HabitLog) => {
            const dateStr = format(new Date(log.date), "yyyy-MM-dd");
            if (!newHabitLogsMap[habitData.habitId]) {
              newHabitLogsMap[habitData.habitId] = {};
            }
            newHabitLogsMap[habitData.habitId][dateStr] = log.count;
          });
        }
      });

      // Apply any pending updates that haven't been synced with the server yet
      pendingUpdatesRef.current.forEach((update) => {
        const { habitId, dateStr, count } = update;

        // Initialize the habit's log map if it doesn't exist
        if (!newHabitLogsMap[habitId]) {
          newHabitLogsMap[habitId] = {};
        }

        if (count <= 0) {
          // If count is 0 or negative, remove the entry
          delete newHabitLogsMap[habitId][dateStr];
        } else {
          // Otherwise update the count
          newHabitLogsMap[habitId][dateStr] = count;
        }
      });

      setHabitLogsMap(newHabitLogsMap);
    }
  }, [allHabitLogsData, habitIds]);

  // Effect to refetch when year or month changes
  useEffect(() => {
    // Clear pending updates when the date range changes
    pendingUpdatesRef.current = [];

    // Force a fresh fetch from the server
    forceFreshFetchRef.current = true;

    // Refetch data
    if (habitIds.length > 0) {
      refetch();
    }
  }, [year, month, refetch, habitIds]);

  // Utility function to update a log count directly in the state
  const updateLogCount = useCallback(
    (habitId: number, date: Date, count: number) => {
      const dateStr = format(date, "yyyy-MM-dd");

      // Add this update to the pending updates
      const existingUpdateIndex = pendingUpdatesRef.current.findIndex(
        (update) => update.habitId === habitId && update.dateStr === dateStr
      );

      if (existingUpdateIndex >= 0) {
        // Update existing pending update
        pendingUpdatesRef.current[existingUpdateIndex].count = count;
      } else {
        // Add new pending update
        pendingUpdatesRef.current.push({ habitId, dateStr, count });
      }

      // Create a deep copy of the habitLogsMap
      const updatedHabitLogsMap = { ...habitLogsMap };

      // Initialize the habit's log map if it doesn't exist
      if (!updatedHabitLogsMap[habitId]) {
        updatedHabitLogsMap[habitId] = {};
      }

      if (count <= 0) {
        // If count is 0 or negative, remove the entry
        delete updatedHabitLogsMap[habitId][dateStr];
      } else {
        // Otherwise update the count
        updatedHabitLogsMap[habitId][dateStr] = count;
      }

      // Set the flag to skip the next refetch
      skipNextRefetchRef.current = true;

      // Update the state
      setHabitLogsMap(updatedHabitLogsMap);
    },
    [habitLogsMap]
  );

  // Function to clear pending updates for a specific habit and date
  const clearPendingUpdate = useCallback((habitId: number, date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");

    // Remove this update from the pending updates
    pendingUpdatesRef.current = pendingUpdatesRef.current.filter(
      (update) => !(update.habitId === habitId && update.dateStr === dateStr)
    );
  }, []);

  // Function to force a fresh fetch from the server
  const syncWithServer = useCallback(() => {
    // Clear all pending updates
    pendingUpdatesRef.current = [];

    // Force a fresh fetch from the server
    forceFreshFetchRef.current = true;

    // Refetch data
    if (habitIds.length > 0) {
      refetch();
    }
  }, [refetch, habitIds]);

  return {
    habitLogsMap,
    updateLogCount,
    clearPendingUpdate,
    syncWithServer,
    isLoading,
    isError,
    error,
  };
};

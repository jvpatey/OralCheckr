import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  fetchHabitLogs,
  HabitLog,
  incrementHabitLog,
  decrementHabitLog,
} from "../../services/habitLogService";

// Get the local timezone
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Helper function to normalize dates and create consistent date strings
const normalizeDate = (date: Date | string): string => {
  // Convert the date to a Date object if it's a string
  const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);

  // Convert to zoned time to ensure consistent handling across timezones
  const zonedDate = toZonedTime(dateObj, TIMEZONE);

  // Format the date as YYYY-MM-DD
  return format(zonedDate, "yyyy-MM-dd");
};

// Helper function to normalize dates for API calls
const normalizeDateForApi = (date: Date): Date => {
  // Convert to zoned time to ensure consistent handling across timezones
  return toZonedTime(date, TIMEZONE);
};

interface HabitLogsData {
  habitId: number;
  logs: HabitLog[] | undefined;
}

interface PendingUpdate {
  habitId: number;
  dateStr: string;
  count: number;
  originalCount: number;
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

  // Get the query client for manual cache updates
  const queryClient = useQueryClient();

  // Keep track of pending updates
  const pendingUpdatesRef = useRef<PendingUpdate[]>([]);

  // Flag to prevent refetching immediately after a local update
  const skipNextRefetchRef = useRef<boolean>(false);

  // Flag to force a fresh fetch from the server
  const forceFreshFetchRef = useRef<boolean>(false);

  // Flag to indicate if we're currently syncing with the server
  const isSyncingRef = useRef<boolean>(false);

  // Function to sync pending updates with the server
  const syncPendingUpdatesWithServer = useCallback(async () => {
    if (isSyncingRef.current || pendingUpdatesRef.current.length === 0) {
      return;
    }

    isSyncingRef.current = true;

    try {
      // Create a copy of the pending updates
      const updates = [...pendingUpdatesRef.current];

      // Process each update
      for (const update of updates) {
        const { habitId, dateStr, count, originalCount } = update;
        // Parse the date string back to a Date object
        const date = parseISO(dateStr);
        // Use the API normalization for server calls
        const normalizedDate = normalizeDateForApi(date);

        console.log("Syncing update for date:", dateStr);
        console.log(
          "Normalized date for API:",
          format(normalizedDate, "yyyy-MM-dd")
        );

        // Determine how many increments/decrements to perform
        const diff = count - originalCount;

        if (diff !== 0) {
          // Perform the appropriate number of increments or decrements
          if (diff > 0) {
            // Need to increment
            for (let i = 0; i < diff; i++) {
              await incrementHabitLog(habitId, normalizedDate);
            }
          } else {
            // Need to decrement
            for (let i = 0; i < Math.abs(diff); i++) {
              await decrementHabitLog(habitId, normalizedDate);
            }
          }
        }

        // Remove this update from the pending updates
        pendingUpdatesRef.current = pendingUpdatesRef.current.filter(
          (u) => !(u.habitId === habitId && u.dateStr === dateStr)
        );
      }

      // Invalidate queries to ensure UI is updated
      queryClient.invalidateQueries({
        queryKey: ["habitLogs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allHabitLogs"],
      });
    } catch (error) {
      console.error("Error syncing pending updates with server:", error);
    } finally {
      isSyncingRef.current = false;
    }
  }, [queryClient]);

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
      // If we're skipping the refetch and not forcing a fresh fetch, return the existing data
      if (skipNextRefetchRef.current && !forceFreshFetchRef.current) {
        skipNextRefetchRef.current = false;
        return allHabitLogsData || [];
      }

      // Reset the force fresh fetch flag
      forceFreshFetchRef.current = false;

      // If we have pending updates, sync them with the server first
      if (pendingUpdatesRef.current.length > 0 && !isSyncingRef.current) {
        await syncPendingUpdatesWithServer();
      }

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
    staleTime: 0, // Always consider data stale to ensure fresh fetches
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
            // Use the normalizeDate helper to ensure consistent date strings
            const originalDateStr = format(new Date(log.date), "yyyy-MM-dd");
            const dateStr = normalizeDate(log.date);

            console.log("Original date from server:", originalDateStr);
            console.log("Normalized date for UI:", dateStr);

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
    // Sync any pending updates with the server before changing date range
    if (pendingUpdatesRef.current.length > 0) {
      syncPendingUpdatesWithServer().then(() => {
        // Clear pending updates when the date range changes
        pendingUpdatesRef.current = [];

        // Force a fresh fetch from the server
        forceFreshFetchRef.current = true;

        // Refetch data
        if (habitIds.length > 0) {
          refetch();
        }
      });
    } else {
      // No pending updates, just refetch
      // Force a fresh fetch from the server
      forceFreshFetchRef.current = true;

      // Refetch data
      if (habitIds.length > 0) {
        refetch();
      }
    }
  }, [year, month, refetch, habitIds, syncPendingUpdatesWithServer]);

  // Utility function to update a log count directly in the state
  const updateLogCount = useCallback(
    (habitId: number, date: Date, count: number) => {
      // Use the normalizeDate helper to ensure consistent date strings
      const dateStr = normalizeDate(date);

      console.log("Updating log count for date:", format(date, "yyyy-MM-dd"));
      console.log("Normalized date for UI:", dateStr);

      // Get the current count for this habit and date
      const currentCount = habitLogsMap[habitId]?.[dateStr] || 0;

      // Add this update to the pending updates
      const existingUpdateIndex = pendingUpdatesRef.current.findIndex(
        (update) => update.habitId === habitId && update.dateStr === dateStr
      );

      if (existingUpdateIndex >= 0) {
        // Update existing pending update
        pendingUpdatesRef.current[existingUpdateIndex].count = count;
      } else {
        // Add new pending update
        pendingUpdatesRef.current.push({
          habitId,
          dateStr,
          count,
          originalCount: currentCount,
        });
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

      // Update the query cache to ensure consistent UI updates
      queryClient.setQueryData<HabitLogsData[]>(
        ["allHabitLogs", habitIds, year, month],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((habitData) => {
            if (habitData.habitId !== habitId) return habitData;

            // Create a new logs array with the updated count
            const updatedLogs = habitData.logs ? [...habitData.logs] : [];

            // Find if there's an existing log for this date
            const existingLogIndex = updatedLogs.findIndex(
              (log) => normalizeDate(log.date) === dateStr
            );

            if (existingLogIndex >= 0) {
              // Update existing log
              if (count <= 0) {
                // Remove the log if count is 0 or negative
                updatedLogs.splice(existingLogIndex, 1);
              } else {
                // Update the count
                updatedLogs[existingLogIndex] = {
                  ...updatedLogs[existingLogIndex],
                  count,
                };
              }
            } else if (count > 0) {
              // Add new log if count is positive
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

  // Function to clear pending updates for a specific habit and date
  const clearPendingUpdate = useCallback((habitId: number, date: Date) => {
    // Use the normalizeDate helper to ensure consistent date strings
    const dateStr = normalizeDate(date);

    // Remove this update from the pending updates
    pendingUpdatesRef.current = pendingUpdatesRef.current.filter(
      (update) => !(update.habitId === habitId && update.dateStr === dateStr)
    );
  }, []);

  // Function to force a fresh fetch from the server
  const syncWithServer = useCallback(async () => {
    // Sync any pending updates with the server first
    await syncPendingUpdatesWithServer();

    // Clear all pending updates
    pendingUpdatesRef.current = [];

    // Force a fresh fetch from the server
    forceFreshFetchRef.current = true;

    // Refetch data
    if (habitIds.length > 0) {
      refetch();
    }
  }, [refetch, habitIds, syncPendingUpdatesWithServer]);

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

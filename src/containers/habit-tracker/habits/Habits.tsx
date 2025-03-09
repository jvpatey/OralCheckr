import { useState, useMemo } from "react";
import { PageBackground } from "../../../components/PageBackground";
import { IconTextButton } from "../../../components/habit-tracker/habits/IconTextButton";
import { WeekPicker } from "./WeekPicker";
import { AddEditHabitModal } from "./AddEditHabitModal";
import {
  HabitListContainer,
  ScrollableHabitList,
  HabitWrapper,
  Header,
  HeaderText,
  HeaderButtons,
  StyledHabitList,
  DatePickerWrapper,
} from "../../../components/habit-tracker/habits/HabitComponents";
import { HabitList } from "../../../components/habit-tracker/habits/HabitList";
import {
  faPlus,
  faPencilAlt,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "styled-components";
import { Habit } from "../../../services/habitService";
import {
  useFetchHabits,
  useCreateHabit,
  useUpdateHabit,
  useDeleteHabit,
  useDeleteAllHabits,
} from "../../../hooks/habits";
import {
  useIncrementHabitLog,
  useDecrementHabitLog,
  useHabitLogsForAllHabits,
} from "../../../hooks/habitLogs";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { HabitLogResponse } from "../../../services/habitLogService";

// Utility function to reset habit form
const resetHabitForm = (
  setNewHabit: (habit: Habit) => void,
  setOriginalHabit: (habit: Habit) => void
) => {
  setNewHabit({ name: "", count: 0 });
  setOriginalHabit({ name: "", count: 0 });
};

export function Habits() {
  // State for UI
  const [showAddHabitModal, setShowAddHabitModal] = useState<boolean>(false);
  const [newHabit, setNewHabit] = useState<Habit>({ name: "", count: 0 });
  const [originalHabit, setOriginalHabit] = useState<Habit>({
    name: "",
    count: 0,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const theme = useTheme();

  // Fetch habits using TanStack Query
  const {
    data: habits = [],
    isLoading: isLoadingHabits,
    error: habitsError,
  } = useFetchHabits();

  // Get the current month and year for fetching logs
  const currentMonth = format(selectedDate, "MMMM");
  const currentYear = selectedDate.getFullYear();

  // Get a list of habit IDs
  const habitIds = useMemo(
    () => habits.map((h) => h.habitId).filter(Boolean) as number[],
    [habits]
  );

  // Fetch logs for all habits
  const {
    habitLogsMap,
    updateLogCount,
    clearPendingUpdate,
    syncWithServer,
    isLoading: isLoadingLogs,
    isError: isLogsError,
  } = useHabitLogsForAllHabits(habitIds, currentYear, currentMonth);

  // Mutations for habit operations
  const createHabitMutation = useCreateHabit();
  const updateHabitMutation = useUpdateHabit();
  const deleteHabitMutation = useDeleteHabit();
  const deleteAllHabitsMutation = useDeleteAllHabits();

  // Mutations for habit log operations
  const incrementHabitLogMutation = useIncrementHabitLog();
  const decrementHabitLogMutation = useDecrementHabitLog();

  // Handler for showing the add habit modal
  const handleAddHabitClick = () => {
    setShowAddHabitModal(true);
    resetHabitForm(setNewHabit, setOriginalHabit);
  };

  // Handler for saving a new or edited habit
  const handleSaveHabit = () => {
    if (newHabit.name && newHabit.count > 0) {
      if (originalHabit.habitId) {
        // Update existing habit
        updateHabitMutation.mutate(
          {
            habitId: originalHabit.habitId,
            habit: {
              name: newHabit.name,
              count: newHabit.count,
            },
          },
          {
            onSuccess: () => {
              setShowAddHabitModal(false);
              resetHabitForm(setNewHabit, setOriginalHabit);
              toast.success("Habit updated successfully");
            },
            onError: (error) => {
              toast.error(`Failed to update habit: ${error}`);
            },
          }
        );
      } else {
        // Create new habit
        createHabitMutation.mutate(
          { name: newHabit.name, count: newHabit.count },
          {
            onSuccess: () => {
              setShowAddHabitModal(false);
              resetHabitForm(setNewHabit, setOriginalHabit);
              toast.success("Habit created successfully");
            },
            onError: (error) => {
              toast.error(`Failed to create habit: ${error}`);
            },
          }
        );
      }
    }
  };

  // Handler for closing the modal without saving
  const handleCloseModal = () => {
    setShowAddHabitModal(false);
    resetHabitForm(setNewHabit, setOriginalHabit);
  };

  // Handler for deleting a habit
  const handleDeleteHabit = (index: number) => {
    const habitToDelete = habits[index];
    if (!habitToDelete || !habitToDelete.habitId) return;

    if (window.confirm("Are you sure you want to delete this habit?")) {
      deleteHabitMutation.mutate(habitToDelete.habitId, {
        onSuccess: () => {
          toast.success("Habit deleted successfully");
        },
        onError: (error) => {
          toast.error(`Failed to delete habit: ${error}`);
        },
      });
    }
  };

  // Handler for deleting all habits and logs
  const handleDeleteAllHabits = () => {
    if (
      window.confirm("Are you sure you want to delete all habits and logs?")
    ) {
      deleteAllHabitsMutation.mutate(undefined, {
        onSuccess: () => {
          toast.success("All habits deleted successfully");
        },
        onError: (error) => {
          toast.error(`Failed to delete all habits: ${error}`);
        },
      });
    }
  };

  // Handler for editing a habit
  const handleEditHabit = (index: number) => {
    const habitToEdit = habits[index];
    if (habitToEdit) {
      setNewHabit(habitToEdit);
      setOriginalHabit(habitToEdit);
      setShowAddHabitModal(true);
    }
  };

  // Handler for logging habit activity
  const handleLog = (habitName: string, selectedDate: Date) => {
    const habit = habits.find((h) => h.name === habitName);
    if (!habit || !habit.habitId) return;

    // Get current log count
    const logCount = getLogCount(habitName, selectedDate);

    // Check if should allow logging
    if (logCount >= habit.count) {
      toast.error(
        `Cannot exceed the maximum count of ${habit.count} for this habit`
      );
      return;
    }

    // Ensure habitId is a number
    const habitId = Number(habit.habitId);

    // Update the local state immediately for a responsive UI
    updateLogCount(habitId, selectedDate, logCount + 1);

    // Send the update to the server
    incrementHabitLogMutation.mutate(
      { habitId, date: selectedDate },
      {
        onSuccess: (data: HabitLogResponse) => {
          // Clear the pending update since it's now synced with the server
          clearPendingUpdate(habitId, selectedDate);
          toast.success("Habit logged successfully");

          // Get the updated count from the server response
          const updatedCount = data.logs?.[0]?.count || logCount + 1;

          // Update the local state with the server's count to ensure consistency
          updateLogCount(habitId, selectedDate, updatedCount);
        },
        onError: (error) => {
          // Revert the local state update on error
          updateLogCount(habitId, selectedDate, logCount);
          toast.error(`Failed to log habit: ${error}`);

          // Force a sync with the server to ensure we have the latest data
          syncWithServer();
        },
      }
    );
  };

  // Handler for removing a log
  const handleRemoveLog = (habitName: string, selectedDate: Date) => {
    const habit = habits.find((h) => h.name === habitName);
    if (!habit || !habit.habitId) return;

    // Get current log count
    const logCount = getLogCount(habitName, selectedDate);

    // Check if we should allow removing
    if (logCount <= 0) {
      toast.error(`No logs to remove for this date`);
      return;
    }

    // Ensure habitId is a number
    const habitId = Number(habit.habitId);

    // Update the local state immediately for a responsive UI
    updateLogCount(habitId, selectedDate, logCount - 1);

    // Then send the update to the server
    decrementHabitLogMutation.mutate(
      { habitId, date: selectedDate },
      {
        onSuccess: (data: HabitLogResponse) => {
          // Clear the pending update since it's now synced with the server
          clearPendingUpdate(habitId, selectedDate);
          toast.success("Habit log removed successfully");

          // Get the updated count from the server response
          const updatedCount =
            data.logs?.[0]?.count || Math.max(0, logCount - 1);

          // Update the local state with the server's count to ensure consistency
          updateLogCount(habitId, selectedDate, updatedCount);
        },
        onError: (error) => {
          // Revert the local state update on error
          updateLogCount(habitId, selectedDate, logCount);
          toast.error(`Failed to remove log: ${error}`);

          // Force a sync with the server to ensure we have the latest data
          syncWithServer();
        },
      }
    );
  };

  // Check if the selected date is in the future
  const isFutureDate = selectedDate > new Date();

  // Handler for when the date changes in WeekPicker
  const handleWeekPickerDateChange = (date: Date) => {
    // Update the selected date
    setSelectedDate(date);

    // Only refetch if have habits
    if (habitIds.length > 0) {
      syncWithServer();
    }
  };

  // Function to get log count for a specific habit and date
  const getLogCount = (habitName: string, date: Date): number => {
    const habit = habits.find((h) => h.name === habitName);
    if (!habit || !habit.habitId) return 0;

    const dateStr = format(date, "yyyy-MM-dd");
    const habitId = habit.habitId;

    // Look up the log count in our map
    return habitLogsMap[habitId]?.[dateStr] || 0;
  };

  // Show loading state
  if (isLoadingHabits || isLoadingLogs) {
    return (
      <PageBackground>
        <HabitListContainer>
          <HabitWrapper>
            <Header>
              <HeaderText>Loading habits...</HeaderText>
            </Header>
          </HabitWrapper>
        </HabitListContainer>
      </PageBackground>
    );
  }

  // Show error state
  if (habitsError || isLogsError) {
    return (
      <PageBackground>
        <HabitListContainer>
          <HabitWrapper>
            <Header>
              <HeaderText>Error loading habits</HeaderText>
            </Header>
          </HabitWrapper>
        </HabitListContainer>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <HabitListContainer>
        <HabitWrapper>
          <DatePickerWrapper>
            <WeekPicker
              isEditMode={isEditMode}
              onDateChange={handleWeekPickerDateChange}
            />
          </DatePickerWrapper>
          <Header>
            <HeaderText>My Habits:</HeaderText>
            <HeaderButtons>
              {!isEditMode && (
                <IconTextButton
                  icon={faPlus}
                  label="Add Habit"
                  onClick={handleAddHabitClick}
                  backgroundColor={theme.green}
                  hoverColor={theme.green}
                />
              )}
              {isEditMode && (
                <IconTextButton
                  icon={faTrashAlt}
                  label="Delete All"
                  onClick={handleDeleteAllHabits}
                  backgroundColor={theme.red}
                  hoverColor={theme.red}
                  disabled={habits.length === 0}
                />
              )}
              <IconTextButton
                icon={isEditMode ? faTimes : faPencilAlt}
                label={isEditMode ? "Exit" : "Edit"}
                onClick={() => setIsEditMode(!isEditMode)}
                backgroundColor={isEditMode ? theme.red : theme.yellow}
                hoverColor={isEditMode ? theme.red : theme.yellow}
                disabled={!isEditMode && habits.length === 0}
              />
            </HeaderButtons>
          </Header>
          <ScrollableHabitList>
            <StyledHabitList>
              <HabitList
                habits={habits}
                selectedDate={selectedDate}
                isEditMode={isEditMode}
                handleEditHabit={handleEditHabit}
                handleDeleteHabit={handleDeleteHabit}
                handleLog={handleLog}
                handleRemoveLog={handleRemoveLog}
                getLogCount={getLogCount}
                isFutureDate={isFutureDate}
              />
            </StyledHabitList>
          </ScrollableHabitList>
        </HabitWrapper>
      </HabitListContainer>

      <AddEditHabitModal
        show={showAddHabitModal}
        handleClose={handleCloseModal}
        handleSaveHabit={handleSaveHabit}
        originalHabit={originalHabit}
        newHabit={newHabit}
        setNewHabit={setNewHabit}
      />
    </PageBackground>
  );
}

import { useState, useMemo } from "react";
import { PageBackground } from "../../../components/PageBackground";
import { IconTextButton } from "../../../components/habit-tracker/habits/IconTextButton";
import { WeekPicker } from "./WeekPicker";
import { AddEditHabitModal } from "./AddEditHabitModal";
import { ConfirmationModal } from "../../../components/shared/ConfirmationModal";
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
import { toZonedTime } from "date-fns-tz";
import { toast } from "react-toastify";
import { HabitLogResponse } from "../../../services/habitLogService";

// Local timezone
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Format dates consistently as YYYY-MM-DD with timezone handling
const normalizeDate = (date: Date): string => {
  // Apply timezone
  const zonedDate = toZonedTime(date, TIMEZONE);

  return format(zonedDate, "yyyy-MM-dd");
};

// Reset habit form to default values
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

  // Initialize with a normalized date to avoid timezone issues
  const initialDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);

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
              toast.success("Habit updated successfully", { autoClose: 800 });
            },
            onError: (error) => {
              toast.error(`Failed to update habit: ${error}`, {
                autoClose: 800,
              });
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
              toast.success("Habit created successfully", { autoClose: 800 });
            },
            onError: (error) => {
              toast.error(`Failed to create habit: ${error}`, {
                autoClose: 800,
              });
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

    setHabitToDelete(habitToDelete);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!habitToDelete?.habitId) return;

    deleteHabitMutation.mutate(habitToDelete.habitId, {
      onSuccess: () => {
        toast.success("Habit deleted successfully", { autoClose: 800 });
        setShowDeleteModal(false);
        setHabitToDelete(null);
      },
      onError: (error) => {
        toast.error(`Failed to delete habit: ${error}`, { autoClose: 800 });
        setShowDeleteModal(false);
        setHabitToDelete(null);
      },
    });
  };

  // Handler for deleting all habits and logs
  const handleDeleteAllHabits = () => {
    setShowDeleteAllModal(true);
  };

  const handleConfirmDeleteAll = () => {
    deleteAllHabitsMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("All habits deleted successfully", { autoClose: 800 });
        setShowDeleteAllModal(false);
      },
      onError: (error) => {
        toast.error(`Failed to delete all habits: ${error}`, {
          autoClose: 800,
        });
        setShowDeleteAllModal(false);
      },
    });
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

    // Validate against maximum count
    if (logCount >= habit.count) {
      toast.error(
        `Cannot exceed the maximum count of ${habit.count} for this habit`,
        { autoClose: 800 }
      );
      return;
    }

    // Ensure habitId is a number
    const habitId = Number(habit.habitId);

    // Update UI immediately
    updateLogCount(habitId, selectedDate, logCount + 1);

    // Send to server
    incrementHabitLogMutation.mutate(
      { habitId, date: selectedDate },
      {
        onSuccess: (data: HabitLogResponse) => {
          toast.success("Habit logged successfully", { autoClose: 800 });

          // Use server count or fallback to local count
          const updatedCount = data.logs?.[0]?.count || logCount + 1;

          // Sync with server data
          updateLogCount(habitId, selectedDate, updatedCount);
        },
        onError: (error) => {
          // Revert on error
          updateLogCount(habitId, selectedDate, logCount);
          toast.error(`Failed to log habit: ${error}`, { autoClose: 800 });

          // Refresh data
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

    // Validate minimum count
    if (logCount <= 0) {
      toast.error(`No logs to remove for this date`, { autoClose: 800 });
      return;
    }

    // Ensure habitId is a number
    const habitId = Number(habit.habitId);

    // Update UI immediately
    updateLogCount(habitId, selectedDate, logCount - 1);

    // Send to server
    decrementHabitLogMutation.mutate(
      { habitId, date: selectedDate },
      {
        onSuccess: (data: HabitLogResponse) => {
          toast.success("Habit log removed successfully", { autoClose: 800 });

          // Use server count or fallback to calculated count
          const updatedCount =
            data.logs?.[0]?.count || Math.max(0, logCount - 1);

          // Sync with server data
          updateLogCount(habitId, selectedDate, updatedCount);
        },
        onError: (error) => {
          // Revert on error
          updateLogCount(habitId, selectedDate, logCount);
          toast.error(`Failed to remove log: ${error}`, { autoClose: 800 });

          // Refresh data
          syncWithServer();
        },
      }
    );
  };

  // Check if the selected date is in the future
  const isFutureDate = selectedDate > new Date();

  // Handler for when the date changes in WeekPicker
  const handleWeekPickerDateChange = (date: Date) => {
    // Normalize the date for consistency
    const normalizedDate = new Date(date);

    // Update the selected date
    setSelectedDate(normalizedDate);

    // Only refetch if have habits
    if (habitIds.length > 0) {
      // Sync with server to ensure all pending updates are processed
      syncWithServer();
    }
  };

  // Function to get log count for a specific habit and date
  const getLogCount = (habitName: string, date: Date): number => {
    const habit = habits.find((h) => h.name === habitName);
    if (!habit || !habit.habitId) return 0;

    const dateStr = normalizeDate(date);
    const habitId = habit.habitId;

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

      <ConfirmationModal
        show={showDeleteModal}
        title="Delete Habit"
        message={`Are you sure you want to delete "${habitToDelete?.name}"? This will also delete all tracking history for this habit.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setHabitToDelete(null);
        }}
        isDestructive={true}
      />

      <ConfirmationModal
        show={showDeleteAllModal}
        title="Delete All Habits"
        message="Are you sure you want to delete all habits and their tracking history? This action cannot be undone."
        confirmLabel="Delete All"
        onConfirm={handleConfirmDeleteAll}
        onCancel={() => setShowDeleteAllModal(false)}
        isDestructive={true}
      />
    </PageBackground>
  );
}

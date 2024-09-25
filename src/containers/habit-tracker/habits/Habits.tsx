import { useState, useEffect } from "react";
import _ from "lodash";
import { PageBackground } from "../../../components/PageBackground";
import { IconTextButton } from "../../../components/habit-tracker/habits/IconTextButton";
import { WeekPicker } from "./WeekPicker";
import { AddEditHabitModal } from "./AddEditHabitModal";
import { cloneDeep } from "lodash";
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
import { LocalStorage } from "../../../common/constants/local-storage";
import { LogAction } from "../../../common/constants/local-storage";
import {
  faPlus,
  faPencilAlt,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../common/utilities/color-utils";
import { formatDateLong } from "../../../common/utilities/date-utils";

// Utility function to update habit data in state and localStorage
const updateHabits = (
  updatedHabits: Habit[],
  setHabits: (habits: Habit[]) => void
) => {
  setHabits(updatedHabits);
  localStorage.setItem(LocalStorage.HABITS, JSON.stringify(updatedHabits));
};

// Utility function to update logging data in state and localStorage
const updateLogging = (
  updatedLogging: Logging,
  setLogging: (logging: Logging) => void
) => {
  setLogging(updatedLogging);
  localStorage.setItem(LocalStorage.HABITS_LOG, JSON.stringify(updatedLogging));
};

// Utility function to reset habit form
const resetHabitForm = (
  setNewHabit: (habit: Habit) => void,
  setOriginalHabit: (habit: Habit) => void
) => {
  setNewHabit({ name: "", count: 0 });
  setOriginalHabit({ name: "", count: 0 });
};

// Utility function to initialize logging structure
const initializeLogging = (
  logging: Logging,
  habitName: string,
  year: number,
  month: string
): void => {
  logging[habitName] = logging[habitName] ?? {};
  logging[habitName][year] = logging[habitName][year] ?? {};
  logging[habitName][year][month] = logging[habitName][year][month] ?? {};
};

// Utility function to manage logging data
const manageLogging = (
  habitName: string,
  selectedDate: Date,
  logging: Logging,
  setLogging: (logging: Logging) => void,
  action: LogAction,
  habits: Habit[]
) => {
  const year = selectedDate.getFullYear();
  const month = formatDateLong(selectedDate);
  const day = selectedDate.getDate();

  const updatedLogging = cloneDeep(logging);

  // Initialize logging structure
  initializeLogging(updatedLogging, habitName, year, month);

  const currentCount = updatedLogging[habitName]?.[year]?.[month]?.[day] || 0;

  if (action === LogAction.ADD) {
    // Find the habit to check its count
    const habit = habits.find((h) => h.name === habitName);

    // Ensure the habit exists and the log count doesn't exceed the habit count
    if (habit && currentCount < habit.count) {
      updatedLogging[habitName][year][month][day] = currentCount + 1;
    }
  } else if (action === LogAction.REMOVE && currentCount > 0) {
    updatedLogging[habitName][year][month][day] = currentCount - 1;

    // Remove the day entry if the log count drops to zero
    if (updatedLogging[habitName][year][month][day] === 0) {
      delete updatedLogging[habitName][year][month][day];

      // If the month no longer has any days logged, remove the month entry
      if (Object.keys(updatedLogging[habitName][year][month]).length === 0) {
        delete updatedLogging[habitName][year][month];

        // If the year no longer has any months logged, remove the year entry
        if (Object.keys(updatedLogging[habitName][year]).length === 0) {
          delete updatedLogging[habitName][year];
        }
      }
    }
  }

  updateLogging(updatedLogging, setLogging);
};

// Types
export interface Habit {
  name: string;
  count: number;
}

export interface Logging {
  [habitName: string]: {
    [year: number]: {
      [month: string]: {
        [day: number]: number;
      };
    };
  };
}

export function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddHabitModal, setShowAddHabitModal] = useState<boolean>(false);
  const [newHabit, setNewHabit] = useState<Habit>({ name: "", count: 0 });
  const [originalHabit, setOriginalHabit] = useState<Habit>({
    name: "",
    count: 0,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // State to store data when a habit is logged
  const [habitsLog, setHabitsLog] = useState<Logging>({});

  // Load habits and logging from local storage when the component mounts
  useEffect(() => {
    const storedHabits = localStorage.getItem(LocalStorage.HABITS);
    const storedLogging = localStorage.getItem(LocalStorage.HABITS_LOG);

    if (storedHabits) {
      setHabits(JSON.parse(storedHabits) as Habit[]);
    }

    if (storedLogging) {
      setHabitsLog(JSON.parse(storedLogging) as Logging);
    }
  }, []);

  // Handler for showing the add habit modal
  const handleAddHabitClick = () => {
    setShowAddHabitModal(true);
    resetHabitForm(setNewHabit, setOriginalHabit);
  };

  // Handler for saving a new or edited habit
  const handleSaveHabit = () => {
    if (newHabit.name && newHabit.count > 0) {
      const updatedHabits = [...habits];
      const habitIndex = habits.findIndex(
        (habit) =>
          habit.name === originalHabit.name &&
          habit.count === originalHabit.count
      );
      if (habitIndex > -1) {
        updatedHabits[habitIndex] = newHabit;
      } else {
        updatedHabits.push(newHabit);
      }
      updateHabits(updatedHabits, setHabits);
      setShowAddHabitModal(false);
      resetHabitForm(setNewHabit, setOriginalHabit);
    }
  };

  // Handler for closing the modal without saving
  const handleCloseModal = () => {
    setShowAddHabitModal(false);
    resetHabitForm(setNewHabit, setOriginalHabit);
  };

// Handler for deleting a habit
const handleDeleteHabit = (index: number) => {
  if (window.confirm("Are you sure you want to delete this habit?")) {
    const updatedHabits = habits.filter((_, idx) => idx !== index);

    // Remove the selected habit from localStorage
    localStorage.removeItem(LocalStorage.SELECTED_HABIT);

    updateHabits(updatedHabits, setHabits);
  }
};

// Handler for deleting all habits and logs
const handleDeleteAllHabits = () => {
  if (window.confirm("Are you sure you want to delete all habits and logs?")) {
    updateHabits([], setHabits);
    setHabitsLog({});
    localStorage.removeItem(LocalStorage.HABITS);
    localStorage.removeItem(LocalStorage.HABITS_LOG);
    localStorage.removeItem(LocalStorage.SELECTED_HABIT);
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
    manageLogging(
      habitName,
      selectedDate,
      habitsLog,
      setHabitsLog,
      LogAction.ADD,
      habits
    );
  };

  // Handler for removing a log
  const handleRemoveLog = (habitName: string, selectedDate: Date) => {
    manageLogging(
      habitName,
      selectedDate,
      habitsLog,
      setHabitsLog,
      LogAction.REMOVE,
      habits
    );
  };

  // Check if the selected date is in the future
  const isFutureDate = selectedDate > new Date();

  // Handler for when the date changes in WeekPicker
  const handleWeekPickerDateChange = (date: Date) => {
    setSelectedDate(date);
  };

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
                  backgroundColor={colors.green}
                  hoverColor={colors.green}
                />
              )}
              {isEditMode && (
                <IconTextButton
                  icon={faTrashAlt}
                  label="Delete All"
                  onClick={handleDeleteAllHabits}
                  backgroundColor={colors.red}
                  hoverColor={colors.red}
                  disabled={habits.length === 0}
                />
              )}
              <IconTextButton
                icon={isEditMode ? faTimes : faPencilAlt}
                label={isEditMode ? "Exit" : "Edit"}
                onClick={() => setIsEditMode(!isEditMode)}
                backgroundColor={isEditMode ? colors.red : colors.yellow}
                hoverColor={isEditMode ? colors.red : colors.yellow}
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
                habitsLog={habitsLog}
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

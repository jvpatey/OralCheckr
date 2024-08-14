import { useState, useEffect } from "react";
import _ from "lodash";
import { PageBackground } from "../../components/styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";
import { links } from "../../common/SidebarLinks";
import { HabitTile } from "../../components/habittracker/HabitTile";
import { AddHabitButton } from "../../components/habittracker/AddHabitButton";
import { EditModeButton } from "../../components/habittracker/EditModeButton";
import { DateRangePicker } from "../../components/habittracker/DateRangePicker";
import { LogButton } from "../../components/habittracker/LogButton";
import { EditButton } from "../../components/habittracker/EditButton";
import { DeleteButton } from "../../components/habittracker/DeleteButton";
import { RemoveLogButton } from "../../components/habittracker/RemoveLogButton";
import { LocalStorage } from "../../common/local-storage";
import { LogAction } from "../../common/local-storage";
import { AddEditHabitModal } from "../../components/habittracker/AddEditHabitModal";
import {
  HabitListContainer,
  ScrollableHabitList,
  HabitWrapper,
  Header,
  HeaderText,
  HeaderButtons,
  HabitList,
  HabitRow,
  PlaceholderText,
  DatePickerWrapper,
} from "../../components/habittracker/habit-components";

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
  if (!logging[habitName]) {
    logging[habitName] = {};
  }
  if (!logging[habitName][year]) {
    logging[habitName][year] = {};
  }
  if (!logging[habitName][year][month]) {
    logging[habitName][year][month] = {};
  }
};

// Utility function to manage logging data
const manageLogging = (
  habitName: string,
  selectedDate: Date,
  logging: Logging,
  setLogging: (logging: Logging) => void,
  action: LogAction
) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const day = selectedDate.getDate();

  const updatedLogging = { ...logging };

  // Initialize logging structure
  initializeLogging(updatedLogging, habitName, year, month);

  const currentCount = updatedLogging[habitName]?.[year]?.[month]?.[day] || 0;

  if (action === LogAction.ADD) {
    updatedLogging[habitName][year][month][day] = currentCount + 1;
  } else if (action === LogAction.REMOVE && currentCount > 0) {
    updatedLogging[habitName][year][month][day] = currentCount - 1;

    // Remove the day entry if the log count drops to zero
    if (updatedLogging[habitName][year][month][day] === 0) {
      delete updatedLogging[habitName][year][month][day];
    }
  }

  updateLogging(updatedLogging, setLogging);
};

// Types
export interface Habit {
  name: string;
  count: number;
}

interface Logging {
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
      setHabits(JSON.parse(storedHabits));
    }

    if (storedLogging) {
      setHabitsLog(JSON.parse(storedLogging));
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
      updateHabits(updatedHabits, setHabits);
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
      LogAction.ADD
    );
  };

  // Handler for removing a log
  const handleRemoveLog = (habitName: string, selectedDate: Date) => {
    manageLogging(
      habitName,
      selectedDate,
      habitsLog,
      setHabitsLog,
      LogAction.REMOVE
    );
  };

  // Determine if the Remove Log button should be disabled
  const isRemoveLogDisabled = (habitName: string, selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const day = selectedDate.getDate();

    return !(habitsLog[habitName]?.[year]?.[month]?.[day] > 0);
  };

  // Function to render the habit list
  const renderHabits = () => {
    return habits.map((habit, index) => {
      const year = selectedDate.getFullYear();
      const month = selectedDate
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const day = selectedDate.getDate();

      const logCount = habitsLog[habit.name]?.[year]?.[month]?.[day] || 0;

      // Determine if the Add Log button should be disabled
      const isAddLogDisabled = logCount >= habit.count;

      return (
        <HabitRow key={index}>
          <HabitTile habit={habit} logCount={logCount} />
          {isEditMode ? (
            <>
              <EditButton onClick={() => handleEditHabit(index)} />
              <DeleteButton onClick={() => handleDeleteHabit(index)} />
            </>
          ) : (
            <>
              <LogButton
                habitName={habit.name}
                selectedDate={selectedDate}
                onLog={handleLog}
                disabled={isAddLogDisabled}
              />
              <RemoveLogButton
                habitName={habit.name}
                selectedDate={selectedDate}
                onRemoveLog={handleRemoveLog}
                disabled={isRemoveLogDisabled(habit.name, selectedDate)}
              />
            </>
          )}
        </HabitRow>
      );
    });
  };

  return (
    <PageBackground>
      <Sidebar links={links} />
      <HabitListContainer>
        <HabitWrapper>
          <DatePickerWrapper>
            <DateRangePicker
              isEditMode={isEditMode}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </DatePickerWrapper>
          <Header>
            <HeaderText>My Habits:</HeaderText>
            <HeaderButtons>
              {!isEditMode && (
                <AddHabitButton onAddClick={handleAddHabitClick} />
              )}
              <EditModeButton
                onClick={() => setIsEditMode(!isEditMode)}
                isEditMode={isEditMode}
                disabled={!isEditMode && habits.length === 0}
              />
            </HeaderButtons>
          </Header>
          <ScrollableHabitList>
            <HabitList>
              {habits.length === 0 ? (
                <PlaceholderText>
                  Add a habit to start tracking your progress!
                </PlaceholderText>
              ) : (
                renderHabits()
              )}
            </HabitList>
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

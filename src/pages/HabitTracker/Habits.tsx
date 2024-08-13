import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import _ from "lodash";
import { PageBackground } from "../../components/styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";
import { links } from "../../common/SidebarLinks";
import { HabitTile } from "../../components/habittracker/HabitTile";
import { AddHabitButton } from "../../components/habittracker/AddHabitButton";
import { StyledModal } from "../../components/styled/Modal";
import { EditModeButton } from "../../components/habittracker/EditModeButton";
import { DateRangePicker } from "../../components/habittracker/DateRangePicker";
import { LogButton } from "../../components/habittracker/LogButton";
import { EditButton } from "../../components/habittracker/EditButton";
import { DeleteButton } from "../../components/habittracker/DeleteButton";
import { RemoveLogButton } from "../../components/habittracker/RemoveLogButton";
import { LocalStorage } from "../../common/local-storage";
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

// Utility function to manage logging data
const manageLogging = (
  habitName: string,
  selectedDate: Date,
  logging: any,
  setLogging: (logging: any) => void,
  action: "add" | "remove"
) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const day = selectedDate.getDate();

  const updatedLogging = { ...logging };

  // Initialize logging structure if it doesn't exist
  if (!updatedLogging[habitName]) {
    updatedLogging[habitName] = {};
  }
  if (!updatedLogging[habitName][year]) {
    updatedLogging[habitName][year] = {};
  }
  if (!updatedLogging[habitName][year][month]) {
    updatedLogging[habitName][year][month] = {};
  }
  if (!updatedLogging[habitName][year][month][day]) {
    updatedLogging[habitName][year][month][day] = 0;
  }

  // Add or remove log based on action
  if (action === "add") {
    updatedLogging[habitName][year][month][day] += 1;
  } else if (
    action === "remove" &&
    updatedLogging[habitName][year][month][day] > 0
  ) {
    updatedLogging[habitName][year][month][day] -= 1;

    // Remove the day entry if the log count drops to zero
    if (updatedLogging[habitName][year][month][day] === 0) {
      delete updatedLogging[habitName][year][month][day];
    }
  }

  updateLogging(updatedLogging, setLogging);
};

// Types
interface Habit {
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
  // State to store the original habit values when editing
  const [originalHabit, setOriginalHabit] = useState<Habit>({
    name: "",
    count: 0,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  // State to store the currently selected date in the DatePicker
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

  // Handler for habit name input change
  const handleHabitNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewHabit((prev) => ({ ...prev, name: value }));
  };

  // Handler for habit count input change with validation
  const handleHabitCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (_.isNumber(Number(value))) {
      setNewHabit((prev) => ({ ...prev, count: Number(value) }));
    }
  };

  // Handler for logging habit activity
  const handleLog = (habitName: string, selectedDate: Date) => {
    manageLogging(habitName, selectedDate, habitsLog, setHabitsLog, "add");
  };

  // Handler for removing a log
  const handleRemoveLog = (habitName: string, selectedDate: Date) => {
    manageLogging(habitName, selectedDate, habitsLog, setHabitsLog, "remove");
  };

  // Determine if the Remove Log button should be disabled
  const isRemoveLogDisabled = (habitName: string, selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const day = selectedDate.getDate();

    return !(
      habitsLog[habitName] &&
      habitsLog[habitName][year] &&
      habitsLog[habitName][year][month] &&
      habitsLog[habitName][year][month][day] > 0
    );
  };

  // Check if the Save button should be enabled
  const isSaveDisabled = () =>
    !newHabit.name ||
    newHabit.count <= 0 ||
    (newHabit.name === originalHabit.name &&
      newHabit.count === originalHabit.count);

  // Function to render the habit list
  const renderHabits = () => {
    return habits.map((habit, index) => {
      const year = selectedDate.getFullYear();
      const month = selectedDate
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const day = selectedDate.getDate();

      const logCount =
        habitsLog[habit.name] &&
        habitsLog[habit.name][year] &&
        habitsLog[habit.name][year][month] &&
        habitsLog[habit.name][year][month][day]
          ? habitsLog[habit.name][year][month][day]
          : 0;

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

      <StyledModal show={showAddHabitModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {originalHabit.name ? "Edit a Habit" : "Add a New Habit"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="habitName">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter habit name"
                value={newHabit.name}
                onChange={handleHabitNameChange}
              />
            </Form.Group>
            <Form.Group controlId="habitCount">
              <Form.Label style={{ marginTop: "10px" }}>
                Habit Count (times per day)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter habit count"
                value={newHabit.count.toString()}
                onChange={handleHabitCountChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{
              backgroundColor: isSaveDisabled() ? "#ccc" : "#07889b",
              borderColor: isSaveDisabled() ? "#ccc" : "#07889b",
            }}
            onClick={handleSaveHabit}
            disabled={isSaveDisabled()}
          >
            Save Habit
          </Button>
        </Modal.Footer>
      </StyledModal>
    </PageBackground>
  );
}

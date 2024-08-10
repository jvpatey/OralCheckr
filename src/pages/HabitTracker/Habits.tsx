import { useState, useEffect } from "react";
import styled from "styled-components";
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

// Styled component for the habit list container
const HabitListContainer = styled.div`
  width: calc(100% - 190px);
  height: calc(100vh - 56px);
  overflow-y: hidden;
  overflow-x: hidden;
  position: absolute;
  top: 56px;
  left: 190px;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

// Container for the scrolling habit list
const ScrollableHabitList = styled.div`
  height: calc(100vh - 300px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0;
`;

// Wrapper for header and habit list
const HabitWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

// Styled component for the header containing the "Add Habit" button
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  width: 100%;
  white-space: nowrap;
`;

const HeaderText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #848889;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Container for the buttons in the header
const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

// Styled component for the list of entered habits
const HabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// Styled component for row containing the habit tile and log button
const HabitRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// Placeholder text when there are no habits
const PlaceholderText = styled.div`
  font-size: 18px;
  color: #848889;
  margin-top: 20px;
`;

const DatePickerWrapper = styled.div`
  margin-top: 20px;
`;

// Types
interface Habit {
  name: string;
  count: number;
}

export function Habits() {
  // State to store the list of habits
  const [habits, setHabits] = useState<Habit[]>([]);
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState<boolean>(false);
  // State to store the new habit being added or edited
  const [newHabit, setNewHabit] = useState<Habit>({
    name: "",
    count: 0,
  });

  // State to store the original habit values when editing
  const [originalHabit, setOriginalHabit] = useState<Habit>({
    name: "",
    count: 0,
  });

  // State to control the edit mode
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // State to store the currently selected date in the DatePicker
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // State to store the logged data
  const [logging, setLogging] = useState<any>({});

  // Load habits and logging from local storage when the component mounts
  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    const storedLogging = localStorage.getItem("logging");

    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }

    if (storedLogging) {
      setLogging(JSON.parse(storedLogging));
    }
  }, []);

  // Handler for showing the add habit modal
  const handleAddHabitClick = () => {
    setShowModal(true);
    resetForm();
  };

  // Reset the form fields and edit state
  const resetForm = () => {
    setNewHabit({ name: "", count: 0 });
    setOriginalHabit({ name: "", count: 0 });
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
      setHabits(updatedHabits);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));
      setShowModal(false);
      resetForm();
    }
  };

  // Handler for closing the modal without saving
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Handler for deleting a habit
  const handleDeleteHabit = (index: number) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      // Filter out the deleted habit
      const updatedHabits = habits.filter((_, idx) => idx !== index);
      setHabits(updatedHabits);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));
    }
  };

  // Handler for editing a habit
  const handleEditHabit = (index: number) => {
    const habitToEdit = habits[index];
    if (habitToEdit) {
      // Set the newHabit and originalHabit with the habit details being edited
      setNewHabit(habitToEdit);
      setOriginalHabit(habitToEdit);
      setShowModal(true);
    }
  };

  // Handler for habit name input change without validation
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

  // Check if the Save button should be enabled
  const isSaveDisabled = () =>
    !newHabit.name ||
    newHabit.count <= 0 ||
    (newHabit.name === originalHabit.name &&
      newHabit.count === originalHabit.count);

  // Handler for logging habit activity
  const handleLog = (habitName: string, selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const day = selectedDate.getDate();

    const updatedLogging = { ...logging };

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

    updatedLogging[habitName][year][month][day] += 1;

    setLogging(updatedLogging);
    localStorage.setItem("logging", JSON.stringify(updatedLogging));
  };

  // Handler for removing a log
  const handleRemoveLog = (habitName: string, selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const day = selectedDate.getDate();

    const updatedLogging = { ...logging };

    if (
      updatedLogging[habitName] &&
      updatedLogging[habitName][year] &&
      updatedLogging[habitName][year][month] &&
      updatedLogging[habitName][year][month][day] > 0
    ) {
      updatedLogging[habitName][year][month][day] -= 1;

      if (updatedLogging[habitName][year][month][day] === 0) {
        delete updatedLogging[habitName][year][month][day];
      }

      setLogging(updatedLogging);
      localStorage.setItem("logging", JSON.stringify(updatedLogging));
    }
  };

  // Determine if the Remove Log button should be disabled
  const isRemoveLogDisabled = (habitName: string, selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const day = selectedDate.getDate();

    return !(
      logging[habitName] &&
      logging[habitName][year] &&
      logging[habitName][year][month] &&
      logging[habitName][year][month][day] > 0
    );
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
                habits.map((habit, index) => {
                  const year = selectedDate.getFullYear();
                  const month = selectedDate
                    .toLocaleString("default", { month: "long" })
                    .toLowerCase();
                  const day = selectedDate.getDate();

                  const logCount =
                    logging[habit.name] &&
                    logging[habit.name][year] &&
                    logging[habit.name][year][month] &&
                    logging[habit.name][year][month][day]
                      ? logging[habit.name][year][month][day]
                      : 0;

                  return (
                    <HabitRow key={index}>
                      <HabitTile habit={habit} logCount={logCount} />
                      {isEditMode ? (
                        <>
                          <EditButton onClick={() => handleEditHabit(index)} />
                          <DeleteButton
                            onClick={() => handleDeleteHabit(index)}
                          />
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
                            disabled={isRemoveLogDisabled(
                              habit.name,
                              selectedDate
                            )}
                          />
                        </>
                      )}
                    </HabitRow>
                  );
                })
              )}
            </HabitList>
          </ScrollableHabitList>
        </HabitWrapper>
      </HabitListContainer>

      <StyledModal show={showModal} onHide={handleCloseModal}>
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

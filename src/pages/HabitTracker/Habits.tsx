import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import _ from "lodash";
import { PageBackground } from "../../components/styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";
import { links } from "../../common/SidebarLinks";
import { HabitTile } from "../../components/habittracker/HabitTile";
import { AddHabitTile } from "../../components/habittracker/AddHabitTile";
import { StyledModal } from "../../components/styled/Modal";

// Styled component for the habit list container
const HabitListContainer = styled.div`
  width: calc(100% - 190px);
  height: calc(100vh - 76px);
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 56px;
  left: 190px;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

const HabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin-left: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// Types
interface Habit {
  name: string;
  count: number;
}

type EditHabit = {
  name: string;
  count: string;
};

// Functional component for Habits
export function Habits() {
  // State to store the list of habits
  const [habits, setHabits] = useState<Habit[]>([]);

  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // State to store the new habit being added or edited
  const [newHabit, setNewHabit] = useState<EditHabit>({
    name: "",
    count: "",
  });

  // State to store the original habit values when editing
  const [originalHabit, setOriginalHabit] = useState<EditHabit>({
    name: "",
    count: "",
  });

  // Load habits from local storage when the component mounts
  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  // Handler for showing the add habit modal
  const handleAddHabitClick = () => {
    setShowModal(true);
    resetForm();
  };

  // Reset the form fields and edit state
  const resetForm = () => {
    setNewHabit({ name: "", count: "" });
    setOriginalHabit({ name: "", count: "" });
  };

  // Handler for saving a new or edited habit
  const handleSaveHabit = () => {
    if (newHabit.name && newHabit.count) {
      const updatedHabits = [...habits];
      const habitIndex = habits.findIndex(
        (habit) =>
          habit.name === originalHabit.name &&
          habit.count === parseInt(originalHabit.count, 10)
      );
      if (habitIndex > -1) {
        updatedHabits[habitIndex] = {
          name: newHabit.name,
          count: parseInt(newHabit.count, 10),
        };
      } else {
        updatedHabits.push({
          name: newHabit.name,
          count: parseInt(newHabit.count, 10),
        });
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
    // Filter out the deleted habit
    const updatedHabits = habits.filter((_, idx) => idx !== index);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  // Handler for editing a habit
  const handleEditHabit = (index: number) => {
    const habitToEdit = habits[index];
    if (habitToEdit) {
      // Set the newHabit and originalHabit with the habit details being edited
      setNewHabit({
        name: habitToEdit.name,
        count: habitToEdit.count.toString(),
      });
      setOriginalHabit({
        name: habitToEdit.name,
        count: habitToEdit.count.toString(),
      });
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
      setNewHabit((prev) => ({ ...prev, count: value }));
    }
  };

  // Check if the Save button should be enabled
  const isSaveDisabled = () =>
    !newHabit.name ||
    !newHabit.count ||
    (newHabit.name === originalHabit.name &&
      newHabit.count === originalHabit.count);

  return (
    <PageBackground>
      <Sidebar links={links} />
      <HabitListContainer>
        <HabitList>
          {habits.map((habit, index) => (
            <HabitTile
              key={index}
              habit={habit}
              onDeleteClick={() => handleDeleteHabit(index)}
              onEditClick={() => handleEditHabit(index)}
            />
          ))}
          {/* Add Habit Tile at the bottom */}
          <AddHabitTile onAddClick={handleAddHabitClick} />
        </HabitList>
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
                value={newHabit.count}
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

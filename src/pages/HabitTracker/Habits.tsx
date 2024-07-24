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
  index: number;
}

type EditHabit = {
  name: string;
  count: string;
  index: number | null;
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
    index: null,
  });

  // State to store the original habit values when editing
  const [originalHabit, setOriginalHabit] = useState<EditHabit>({
    name: "",
    count: "",
    index: null,
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
    setNewHabit({ name: "", count: "", index: null });
    setOriginalHabit({ name: "", count: "", index: null });
  };

  // Handler for saving a new or edited habit
  const handleSaveHabit = () => {
    if (newHabit.name && newHabit.count) {
      const updatedHabits = [...habits];
      // Update the habit if editing
      if (newHabit.index !== null) {
        updatedHabits[newHabit.index - 1] = {
          name: newHabit.name,
          count: parseInt(newHabit.count, 10),
          index: newHabit.index,
        };
      } else {
        // Add the new habit
        updatedHabits.push({
          name: newHabit.name,
          count: parseInt(newHabit.count, 10),
          index: habits.length + 1,
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
    // Filter out the deleted habit and reindex the remaining habits
    const updatedHabits = habits
      .filter((habit) => habit.index !== index)
      .map((habit, idx) => ({ ...habit, index: idx + 1 }));
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  // Handler for editing a habit
  const handleEditHabit = (index: number) => {
    const habitToEdit = habits.find((habit) => habit.index === index);
    if (habitToEdit) {
      setNewHabit({
        name: habitToEdit.name,
        count: habitToEdit.count.toString(),
        index: habitToEdit.index,
      });
      setOriginalHabit({
        name: habitToEdit.name,
        count: habitToEdit.count.toString(),
        index: habitToEdit.index,
      });
      setShowModal(true);
    }
  };

  // Handler for habit name input change with validation
  const handleHabitNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewHabit((prev) => ({ ...prev, name: value }));
    }
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
    (newHabit.index !== null &&
      newHabit.name === originalHabit.name &&
      newHabit.count === originalHabit.count);

  return (
    <PageBackground>
      <Sidebar links={links} />
      <HabitListContainer>
        <HabitList>
          <AddHabitTile onAddClick={handleAddHabitClick} />
          {habits.map((habit) => (
            <HabitTile
              key={habit.index}
              habit={habit}
              onDeleteClick={handleDeleteHabit}
              onEditClick={() => handleEditHabit(habit.index)}
            />
          ))}
        </HabitList>
      </HabitListContainer>

      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {newHabit.index !== null ? "Edit a Habit" : "Add a New Habit"}
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#07889b", borderColor: "#07889b" }}
            onClick={handleSaveHabit}
            disabled={isSaveDisabled()} // Disable button if fields are empty or unchanged when editing
          >
            Save Habit
          </Button>
        </Modal.Footer>
      </StyledModal>
    </PageBackground>
  );
}

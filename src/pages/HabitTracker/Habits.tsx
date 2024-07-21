import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { PageBackground } from "../../components/Styled/PageBackground";
import { Sidebar } from "../../components/Sidebar";
import { links } from "../../common/SidebarLinks";
import { HabitTile } from "../../components/HabitTracker/HabitTile";
import { AddHabitTile } from "../../components/HabitTracker/AddHabitTile";
import { StyledModal } from "../../components/Styled/Modal";

// Styled component for the habit list container
const HabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin-left: 10px;
  width: calc(100% - 190px);
  position: absolute;
  top: 56px;
  left: 190px;
`;

// Types
interface Habit {
  name: string;
  count: number;
  index: number;
}

export function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitCount, setNewHabitCount] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [originalHabitName, setOriginalHabitName] = useState("");
  const [originalHabitCount, setOriginalHabitCount] = useState("");

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
    setEditIndex(null);
    setNewHabitName("");
    setNewHabitCount("");
    setOriginalHabitName("");
    setOriginalHabitCount("");
  };

  // Handler for saving a new habit
  const handleSaveHabit = () => {
    if (newHabitName && newHabitCount) {
      const updatedHabits = [...habits];
      if (editIndex !== null) {
        // Update the habit if editing
        updatedHabits[editIndex] = {
          name: newHabitName,
          count: parseInt(newHabitCount, 10),
          index: editIndex + 1,
        };
      } else {
        // Add the new habit
        updatedHabits.push({
          name: newHabitName,
          count: parseInt(newHabitCount, 10),
          index: habits.length + 1,
        });
      }
      setHabits(updatedHabits);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));
      setShowModal(false);
      setNewHabitName("");
      setNewHabitCount("");
    }
  };

  // Handler for closing the modal without saving
  const handleCloseModal = () => {
    setShowModal(false);
    setNewHabitName("");
    setNewHabitCount("");
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
      setNewHabitName(habitToEdit.name);
      setNewHabitCount(habitToEdit.count.toString());
      setOriginalHabitName(habitToEdit.name);
      setOriginalHabitCount(habitToEdit.count.toString());
      setEditIndex(index - 1);
      setShowModal(true);
    }
  };

  // Handler for habit name input change with validation
  const handleHabitNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewHabitName(value);
    }
  };

  // Handler for habit count input change with validation
  const handleHabitCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setNewHabitCount(value);
    }
  };

  // Check if the Save button should be enabled
  const isSaveDisabled = () => {
    if (!newHabitName || !newHabitCount) {
      return true;
    }
    if (editIndex !== null) {
      return (
        newHabitName === originalHabitName &&
        newHabitCount === originalHabitCount
      );
    }
    return false;
  };

  return (
    <PageBackground>
      <Sidebar links={links} />
      <HabitList>
        <AddHabitTile onAddClick={handleAddHabitClick} />
        {habits.map((habit) => (
          <HabitTile
            key={habit.index}
            habitName={habit.name}
            habitIndex={habit.index}
            habitCount={habit.count}
            onDeleteClick={handleDeleteHabit}
            onEditClick={() => handleEditHabit(habit.index)}
          />
        ))}
      </HabitList>

      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit a Habit" : "Add a New Habit"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="habitName">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter habit name"
                value={newHabitName}
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
                value={newHabitCount}
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

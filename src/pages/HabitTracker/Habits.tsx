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

const HabitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
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
  };

  // Handler for saving a new habit
  const handleSaveHabit = () => {
    if (newHabitName && newHabitCount) {
      const newHabit: Habit = {
        name: newHabitName,
        count: parseInt(newHabitCount, 10),
        index: habits.length + 1, // Start index at 1 instead of 0
      };

      const updatedHabits = [...habits, newHabit];
      setHabits(updatedHabits);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));

      // Close the modal and reset input fields
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

  return (
    <PageBackground>
      <Sidebar links={links} />
      <HabitGrid>
        <AddHabitTile onAddClick={handleAddHabitClick} />
        {habits.map((habit) => (
          <HabitTile
            key={habit.index}
            habitName={habit.name}
            habitIndex={habit.index}
          />
        ))}
      </HabitGrid>

      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="habitName">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter habit name"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
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
                onChange={(e) => setNewHabitCount(e.target.value)}
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
          >
            Save Habit
          </Button>
        </Modal.Footer>
      </StyledModal>
    </PageBackground>
  );
}

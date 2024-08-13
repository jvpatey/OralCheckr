import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { StyledModal } from "../styled/Modal";
import { Habit } from "../../pages/habittracker/Habits";

interface AddEditHabitModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveHabit: (habit: Habit) => void;
  originalHabit: Habit;
  newHabit: Habit;
  setNewHabit: (habit: Habit) => void;
}

export function AddEditHabitModal({
  show,
  handleClose,
  handleSaveHabit,
  originalHabit,
  newHabit,
  setNewHabit,
}: AddEditHabitModalProps) {
  const isSaveDisabled = () =>
    !newHabit.name ||
    newHabit.count <= 0 ||
    (newHabit.name === originalHabit.name &&
      newHabit.count === originalHabit.count);

  const handleHabitNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewHabit({ ...newHabit, name: value });
  };

  const handleHabitCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewHabit({ ...newHabit, count: Number(value) });
  };

  return (
    <StyledModal show={show} onHide={handleClose}>
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
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          style={{
            backgroundColor: isSaveDisabled() ? "#ccc" : "#07889b",
            borderColor: isSaveDisabled() ? "#ccc" : "#07889b",
          }}
          onClick={() => handleSaveHabit(newHabit)}
          disabled={isSaveDisabled()}
        >
          Save Habit
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
}

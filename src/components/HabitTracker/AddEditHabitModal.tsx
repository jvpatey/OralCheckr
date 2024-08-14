import React, { useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { StyledModal } from "../styled/Modal";
import { Habit } from "../../pages/habittracker/Habits";
import { colors } from "../../common/color-utils";
import styled from "styled-components";

interface AddEditHabitModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveHabit: (habit: Habit) => void;
  originalHabit: Habit;
  newHabit: Habit;
  setNewHabit: (habit: Habit) => void;
}

// Styled component for the Save Button
const SaveButton = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled }) =>
    disabled ? colors.disabledBgGrey : colors.blue};
  border-color: ${({ disabled }) =>
    disabled ? colors.disabledBgGrey : colors.blue};
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? colors.disabledBgGrey : colors.bgWhite};
    border-color: ${({ disabled }) =>
      disabled ? colors.disabledBgGrey : colors.blue};
    color: ${({ disabled }) =>
      disabled ? colors.disabledBgGrey : colors.blue};
  }
`;

export function AddEditHabitModal({
  show,
  handleClose,
  handleSaveHabit,
  originalHabit,
  newHabit,
  setNewHabit,
}: AddEditHabitModalProps) {
  // Ref for the habit name input
  const habitNameRef = useRef<HTMLInputElement>(null);

  // Focus the habit name input when the modal is shown
  useEffect(() => {
    if (show && habitNameRef.current) {
      habitNameRef.current.focus();
    }
  }, [show]);

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
              ref={habitNameRef}
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
        <SaveButton
          disabled={isSaveDisabled()}
          onClick={() => handleSaveHabit(newHabit)}
        >
          Save Habit
        </SaveButton>
      </Modal.Footer>
    </StyledModal>
  );
}

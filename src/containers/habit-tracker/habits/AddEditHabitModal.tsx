import React, { useEffect, useRef } from "react";
import { Modal, Form } from "react-bootstrap";
import { StyledModal } from "../../../components/questionnaire/styles/Modal";
import { Habit } from "../../../services/habitService";
import styled from "styled-components";

interface AddEditHabitModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveHabit: () => void;
  originalHabit: Habit;
  newHabit: Habit;
  setNewHabit: (habit: Habit) => void;
}

// Styled component for the Save Button
const SaveButton = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.disabledBackground : theme.accentBackgroundColor};
  border-color: ${({ disabled, theme }) =>
    disabled ? theme.disabledBackground : theme.blue};
  color: ${({ disabled, theme }) =>
    disabled ? theme.accentBackgroundColor : theme.blue};
  padding: 8px 16px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.disabledBackgroundColor : theme.backgroundColor};
    border-color: ${({ disabled, theme }) =>
      disabled ? theme.disabledBackground : theme.blue};
    color: ${({ disabled, theme }) =>
      disabled ? theme.accentBackgroundColor : theme.blue};
  }
`;

// Styled component for the Cancel Button
const CancelButton = styled.button`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.blue};
  padding: 8px 16px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
  }
`;

const StyledFormControl = styled(Form.Control)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  color: ${({ theme }) => theme.textGrey};

  &:focus {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.textGrey};
  }
`;

// Functional component for the add/edit habit modal, used in the Habits component
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
          {originalHabit.habitId ? "Edit a Habit" : "Add a New Habit"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="habitName">
            <Form.Label>Habit Name</Form.Label>
            <StyledFormControl
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
            <StyledFormControl
              type="number"
              placeholder="Enter habit count"
              value={newHabit.count.toString()}
              onChange={handleHabitCountChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={handleClose}>Cancel</CancelButton>
        <SaveButton disabled={isSaveDisabled()} onClick={handleSaveHabit}>
          Save Habit
        </SaveButton>
      </Modal.Footer>
    </StyledModal>
  );
}

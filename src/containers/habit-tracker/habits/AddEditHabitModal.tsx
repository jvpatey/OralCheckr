import React, { useEffect, useRef } from "react";
import { Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { StyledModal } from "../../../components/questionnaire/styles/Modal";
import { Habit } from "../../../services/habitService";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
  border: 1px solid ${({ theme }) => theme.textGrey};
  color: ${({ theme }) => theme.textGrey};
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.textGrey};
    color: ${({ theme }) => theme.accentBackgroundColor};
    border-color: ${({ theme }) => theme.textGrey};
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

// Styled component for the Info Icon
const InfoIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.blue};
  margin-left: 5px;
  font-size: 0.9rem;
  cursor: help;
`;

// Styled component for the Form Label Group
const FormLabelGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledFormLabel = styled(Form.Label)`
  margin-bottom: 8px;
  display: block;
`;

const StyledTooltip = styled(Tooltip)`
  &.tooltip {
    opacity: 1;
  }

  .tooltip-inner {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textGrey};
    border: 1px solid ${({ theme }) => theme.blue};
    padding: 8px 12px;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tooltip-arrow::before {
    border-right-color: ${({ theme }) => theme.blue};
  }

  .tooltip-arrow::after {
    border-right-color: ${({ theme }) => theme.backgroundColor};
    position: absolute;
    left: 1px;
    border-width: 0.4rem 0.4rem 0.4rem 0;
    border-right-style: solid;
    content: "";
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
    const value = parseInt(e.target.value);
    // Ensure count is at least 1
    const validValue = isNaN(value) ? 1 : Math.max(1, value);
    setNewHabit({ ...newHabit, count: validValue });
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
            <StyledFormLabel>Habit Name</StyledFormLabel>
            <StyledFormControl
              type="text"
              placeholder="Enter habit name"
              value={newHabit.name}
              onChange={handleHabitNameChange}
              ref={habitNameRef}
            />
          </Form.Group>
          <Form.Group controlId="habitCount" style={{ marginTop: "16px" }}>
            <FormLabelGroup>
              <StyledFormLabel style={{ margin: 0 }}>
                Daily Goal
              </StyledFormLabel>
              <OverlayTrigger
                placement="right"
                overlay={
                  <StyledTooltip id="daily-goal-tooltip">
                    How many times this habit should be completed each day
                  </StyledTooltip>
                }
              >
                <span>
                  <InfoIcon icon={faInfoCircle} />
                </span>
              </OverlayTrigger>
            </FormLabelGroup>
            <StyledFormControl
              type="number"
              placeholder="Enter daily goal"
              value={newHabit.count.toString()}
              onChange={handleHabitCountChange}
              min="1"
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

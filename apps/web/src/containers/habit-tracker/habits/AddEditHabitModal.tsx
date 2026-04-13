import React, { useEffect, useRef } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalHeading,
  ModalBody,
  InputStyle,
  StyledFormButton,
  ModalOutlineButton,
} from "../../welcome/styles/ModalStyles";
import { HeroTitleAccent } from "../../welcome/styles/WelcomeStyles";
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

/** Field labels — same voice as welcome modal copy hierarchy */
const FieldLabel = styled(Form.Label)`
  display: block;
  margin: 0 0 6px 0;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textSecondary};
`;

const FormLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
`;

const GoalFieldBlock = styled.div`
  margin-top: 4px;
`;

/** Match welcome guest modal — two full-width pill actions */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 12px;
  width: 100%;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  cursor: help;
  transition:
    color 0.2s ease,
    background 0.2s ease;
  padding: 4px;
  border-radius: 8px;
  margin-left: 2px;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;

const StyledTooltip = styled(Tooltip)`
  &.tooltip {
    opacity: 1;
  }

  .tooltip-inner {
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.textPrimary};
    border: 1px solid ${({ theme }) => theme.borderLight};
    border-radius: 14px;
    padding: 10px 14px;
    font-family: var(--font-sans), system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.45;
    box-shadow: ${({ theme }) => theme.shadowMd};
    max-width: 260px;
  }

  .tooltip-arrow::before {
    border-right-color: ${({ theme }) => theme.borderLight};
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
  const habitNameRef = useRef<HTMLInputElement>(null);

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
    const raw = e.target.value;
    if (raw === "") {
      setNewHabit({ ...newHabit, count: 0 });
      return;
    }
    const value = parseInt(raw, 10);
    if (Number.isNaN(value)) return;
    setNewHabit({ ...newHabit, count: Math.max(1, value) });
  };

  const handleHabitCountBlur = () => {
    if (newHabit.count <= 0) {
      setNewHabit({ ...newHabit, count: 1 });
    }
  };

  return (
    <StyledModal show={show} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <ModalTitleStack>
          <ModalHeading>
            {originalHabit.habitId ? (
              <>
                Edit a <HeroTitleAccent as="span">habit</HeroTitleAccent>
              </>
            ) : (
              <>
                Add a new <HeroTitleAccent as="span">habit</HeroTitleAccent>
              </>
            )}
          </ModalHeading>
        </ModalTitleStack>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group controlId="habitName">
            <FieldLabel>Habit name</FieldLabel>
            <InputStyle
              type="text"
              placeholder="Enter habit name"
              value={newHabit.name}
              onChange={handleHabitNameChange}
              ref={habitNameRef}
            />
          </Form.Group>
          <GoalFieldBlock>
            <Form.Group controlId="habitCount">
              <FormLabelRow>
                <FieldLabel style={{ margin: 0 }}>Daily goal</FieldLabel>
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
              </FormLabelRow>
              <InputStyle
                type="number"
                inputMode="numeric"
                placeholder="e.g. 1"
                value={newHabit.count > 0 ? String(newHabit.count) : ""}
                onChange={handleHabitCountChange}
                onBlur={handleHabitCountBlur}
                min={1}
              />
            </Form.Group>
          </GoalFieldBlock>
          <ButtonContainer>
            <ButtonWrapper>
              <ModalOutlineButton type="button" onClick={handleClose}>
                Cancel
              </ModalOutlineButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <StyledFormButton
                type="button"
                disabled={isSaveDisabled()}
                onClick={handleSaveHabit}
              >
                Save habit
              </StyledFormButton>
            </ButtonWrapper>
          </ButtonContainer>
        </Form>
      </ModalBody>
    </StyledModal>
  );
}

import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

// Props for the ConfirmationModal component
interface ConfirmationModalProps {
  show: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${({ theme }) => theme.backgroundColor};
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 6px ${({ theme }) => `${theme.textGrey}15`};
  }

  .modal-header {
    border: none;
    padding: 1.5rem 1.5rem 0.75rem;

    .modal-title {
      color: ${({ theme }) => theme.darkGrey};
      font-weight: 500;
    }

    .btn-close {
      color: ${({ theme }) => theme.textGrey};
      opacity: 0.75;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  .modal-body {
    color: ${({ theme }) => theme.textGrey};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  .modal-footer {
    border: none;
    padding: 0.75rem 1.5rem 1.5rem;
    gap: 0.75rem;
  }
`;

interface ConfirmButtonProps {
  $isDestructive?: boolean;
}

const ConfirmButton = styled(Button)<ConfirmButtonProps>`
  background-color: ${({ theme, $isDestructive }) =>
    $isDestructive ? theme.red : theme.blue};
  border: 2px solid
    ${({ theme, $isDestructive }) => ($isDestructive ? theme.red : theme.blue)};
  color: ${({ theme, $isDestructive }) =>
    $isDestructive ? theme.backgroundColor : theme.backgroundColor};
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme, $isDestructive }) =>
      $isDestructive
        ? theme.backgroundColor
        : theme.backgroundColor} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${({ theme }) => `${theme.textGrey}15`};
    color: ${({ theme, $isDestructive }) =>
      $isDestructive ? theme.red : theme.blue};
    border: 2px solid
      ${({ theme, $isDestructive }) =>
        $isDestructive ? theme.red : theme.blue};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.textGrey};
  color: ${({ theme }) => theme.textGrey};
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme }) => `${theme.textGrey}`} !important;
    border: 1px solid ${({ theme }) => theme.textGrey} !important;
    color: ${({ theme }) => theme.backgroundColor} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${({ theme }) => `${theme.textGrey}15`};
  }

  &:active {
    transform: translateY(0);
  }
`;

// Confirmation modal component used for deleting habits and other destructive actions
export function ConfirmationModal({
  show,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}: ConfirmationModalProps) {
  return (
    <StyledModal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <CancelButton variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </CancelButton>
        <ConfirmButton $isDestructive={isDestructive} onClick={onConfirm}>
          {confirmLabel}
        </ConfirmButton>
      </Modal.Footer>
    </StyledModal>
  );
}

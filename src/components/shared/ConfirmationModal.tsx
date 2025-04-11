import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

// Define theme interface
interface Theme {
  backgroundColor: string;
  textGrey: string;
  darkGrey: string;
  red: string;
  blue: string;
}

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
    background-color: ${({ theme }: { theme: Theme }) => theme.backgroundColor};
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 6px
      ${({ theme }: { theme: Theme }) => `${theme.textGrey}15`};
  }

  .modal-header {
    border: none;
    padding: 1.5rem 1.5rem 0.75rem;

    .modal-title {
      color: ${({ theme }: { theme: Theme }) => theme.darkGrey};
      font-weight: 500;
    }

    .btn-close {
      color: ${({ theme }: { theme: Theme }) => theme.textGrey};
      opacity: 0.75;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  .modal-body {
    color: ${({ theme }: { theme: Theme }) => theme.textGrey};
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

const getConfirmButtonStyles = (theme: Theme, isDestructive?: boolean) => ({
  backgroundColor: isDestructive ? theme.red : theme.blue,
  borderColor: isDestructive ? theme.red : theme.blue,
  color: theme.backgroundColor,
});

const ConfirmButton = styled(Button)<ConfirmButtonProps>`
  ${({ theme, $isDestructive }) => {
    const styles = getConfirmButtonStyles(theme as Theme, $isDestructive);
    return `
      background-color: ${styles.backgroundColor};
      border: 2px solid ${styles.borderColor};
      color: ${styles.color};
    `;
  }}
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.backgroundColor} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px
      ${({ theme }: { theme: Theme }) => `${theme.textGrey}15`};
    color: ${({
      theme,
      $isDestructive,
    }: {
      theme: Theme;
      $isDestructive?: boolean;
    }) => ($isDestructive ? theme.red : theme.blue)};
    border: 2px solid
      ${({
        theme,
        $isDestructive,
      }: {
        theme: Theme;
        $isDestructive?: boolean;
      }) => ($isDestructive ? theme.red : theme.blue)};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.textGrey};
  color: ${({ theme }: { theme: Theme }) => theme.textGrey};
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.textGrey} !important;
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.textGrey} !important;
    color: ${({ theme }: { theme: Theme }) => theme.backgroundColor} !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px
      ${({ theme }: { theme: Theme }) => `${theme.textGrey}15`};
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

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

  .confirm-button {
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 2px solid;
  }

  .confirm-button:hover {
    opacity: 0.9;
  }

  .confirm-button:active {
    transform: translateY(1px);
  }

  .cancel-button {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.textGrey};
    color: ${({ theme }) => theme.textGrey};
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .cancel-button:hover {
    opacity: 0.9;
  }

  .cancel-button:active {
    transform: translateY(1px);
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
        <Button
          variant="secondary"
          className="cancel-button"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="primary"
          className="confirm-button"
          style={{
            backgroundColor: isDestructive ? "#ff6961" : "#3f93b2",
            borderColor: isDestructive ? "#ff6961" : "#3f93b2",
            color: "#f5f5f5",
          }}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
}

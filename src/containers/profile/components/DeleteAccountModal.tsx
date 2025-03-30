import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { StyledButton, DeleteButton } from "../styles/AccountSettingsStyles";

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    border: 1px solid ${({ theme }) => theme.borderGrey};
    border-radius: 12px;
  }

  .modal-header {
    border-bottom: none;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  }

  .modal-title {
    color: ${({ theme }) => theme.red};
    font-size: 1.25rem;
    font-weight: 600;
  }

  .modal-body {
    padding: 0.5rem 1.5rem;
    color: ${({ theme }) => theme.textGrey};
    font-size: 1rem;
    line-height: 1.5;
  }

  .modal-footer {
    border-top: none;
    padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    gap: 1rem;
  }

  .btn-close {
    filter: ${({ theme }) => (theme.type === "dark" ? "invert(1)" : "none")};
  }
`;

interface DeleteAccountModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteAccountModal({
  show,
  onHide,
  onConfirm,
  isDeleting,
}: DeleteAccountModalProps) {
  return (
    <StyledModal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Account Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone and all your data will be permanently deleted.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={onHide}>Cancel</StyledButton>
        <DeleteButton onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
        </DeleteButton>
      </Modal.Footer>
    </StyledModal>
  );
}

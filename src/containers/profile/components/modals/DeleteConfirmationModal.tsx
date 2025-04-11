import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { DeleteButton } from "../../styles/AccountTabStyles";

interface DeleteConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting: boolean;
}

const StyledModal = styled(Modal)`
  .modal-content {
    background: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.textGrey};
    border-radius: 12px;
    border: none;
  }

  .modal-header {
    border: none;
    padding: 1.25rem 1.5rem 0.75rem 1.5rem;

    .modal-title {
      color: ${({ theme }) => theme.red};
      font-weight: 500;
    }
  }

  .modal-body {
    padding: 0.75rem 1.5rem;
  }

  .modal-footer {
    border: none;
    padding: 0.75rem 1.5rem 1.25rem 1.5rem;
  }
`;

const CancelButton = styled(DeleteButton)`
  background-color: ${({ theme }) => theme.textGrey};
  border-color: ${({ theme }) => theme.textGrey};

  &:hover:not(:disabled) {
    background-color: transparent;
    border-color: ${({ theme }) => theme.textGrey};
    color: ${({ theme }) => theme.textGrey};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBackground};
    border-color: ${({ theme }) => theme.disabledBackground};
    color: ${({ theme }) => theme.disabledText};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

// Delete confirmation modal component
export function DeleteConfirmationModal({
  show,
  onHide,
  onConfirm,
  title,
  message,
  isDeleting,
}: DeleteConfirmationModalProps) {
  return (
    <StyledModal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <ButtonContainer>
          <CancelButton onClick={onHide} disabled={isDeleting}>
            Cancel
          </CancelButton>
          <DeleteButton onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </DeleteButton>
        </ButtonContainer>
      </Modal.Footer>
    </StyledModal>
  );
}

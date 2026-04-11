import { Modal } from "react-bootstrap";
import styled from "styled-components";

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
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.borderLight};
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  .modal-dialog {
    max-width: 420px;
  }

  .modal-header {
    background: transparent;
    border: none;
    padding: 2rem 2rem 0.5rem 2rem;

    .btn-close {
      background: ${({ theme }) => theme.textSecondary}20;
      backdrop-filter: blur(${({ theme }) => theme.glassBlur});
      border-radius: 50%;
      width: 32px;
      height: 32px;
      opacity: 0.8;
      transition: all 0.3s ease;
      border: 1px solid ${({ theme }) => theme.borderLight};

      &::before {
        content: "×";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        font-weight: bold;
        color: ${({ theme }) => theme.textPrimary};
        line-height: 1;
      }

      &:hover {
        opacity: 1;
        transform: scale(1.1);
        background: ${({ theme }) => theme.textSecondary}30;
      }
    }
  }

  .modal-body {
    padding: 0.5rem 2rem 1rem 2rem;
    color: ${({ theme }) => theme.textPrimary};
    font-size: 1rem;
    line-height: 1.6;
  }

  .modal-footer {
    border: none;
    padding: 1rem 2rem 2rem 2rem;
    background: transparent;
  }
`;

const HeaderText = styled(Modal.Title)`
  background: linear-gradient(135deg, #ff6961 0%, #ff4757 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowMd};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled(StyledButton)`
  background: ${({ theme }) => theme.surfaceElevated};
  color: ${({ theme }) => theme.textPrimary};
  border-color: ${({ theme }) => theme.borderMedium};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.textSecondary}10;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};
  }
`;

const ConfirmButton = styled(StyledButton)`
  background: linear-gradient(135deg, #ff6961 0%, #ff4757 100%);
  color: white;
  border-color: #ff6961;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 105, 97, 0.3),
      ${({ theme }) => theme.shadowLg};
  }

  &:active {
    transform: translateY(0);
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
        <HeaderText>{title}</HeaderText>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <ButtonContainer>
          <CancelButton onClick={onHide} disabled={isDeleting}>
            Cancel
          </CancelButton>
          <ConfirmButton onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </ConfirmButton>
        </ButtonContainer>
      </Modal.Footer>
    </StyledModal>
  );
}

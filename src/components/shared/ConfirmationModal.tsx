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

// Modern glassmorphism modal matching login/signup styling
const StyledModal = styled(Modal)`
  .modal-content {
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.borderLight};
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  .modal-dialog {
    max-width: 420px;
  }
`;

// Modern header with gradient title
const ModalHeader = styled(Modal.Header)`
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  border: none;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 24px 24px 0 24px;

  .btn-close {
    position: absolute;
    right: 20px;
    top: 20px;
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    border: 1px solid ${({ theme }) => theme.borderLight};
    border-radius: 12px;
    width: 36px;
    height: 36px;
    opacity: 0.8;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${({ theme }) => theme.textPrimary};

    &::before {
      content: "×";
      font-size: 20px;
      font-weight: bold;
      color: ${({ theme }) => theme.textPrimary};
    }

    &:hover {
      opacity: 1;
      transform: scale(1.05);
      border-color: ${({ theme }) => theme.primary};
      background: ${({ theme }) => theme.surfaceElevated};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
    }
  }
`;

// Gradient title text
const HeaderText = styled(Modal.Title)`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin: 0 auto;
  background: ${({ isDestructive }) =>
    isDestructive
      ? "linear-gradient(135deg, #ff6961 0%, #ff4757 100%)"
      : "linear-gradient(135deg, #3f93b2 0%, #2d7a96 100%)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

// Modern body styling
const ModalBody = styled(Modal.Body)`
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  padding: 20px 24px;
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
`;

// Modern footer with button container
const ModalFooter = styled(Modal.Footer)`
  background: transparent;
  border: none;
  padding: 0 24px 24px 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

// Modern button styling
const StyledButton = styled(Button)`
  padding: 12px 24px;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 16px;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 100px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Cancel button styling
const CancelButton = styled(StyledButton)`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.borderLight};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.textPrimary};
    border-color: ${({ theme }) => theme.borderMedium};
  }
`;

// Confirm button styling with conditional destructive styling
const ConfirmButton = styled(StyledButton)<{ $isDestructive: boolean }>`
  background: ${({ $isDestructive, theme }) =>
    $isDestructive
      ? "linear-gradient(135deg, #ff6961 0%, #ff4757 100%)"
      : theme.primaryGradient};
  color: white;
  border: 1px solid
    ${({ $isDestructive, theme }) =>
      $isDestructive ? "#ff6961" : theme.primary};

  &:hover:not(:disabled) {
    opacity: 0.9;
    box-shadow: 0 8px 25px
      ${({ $isDestructive }) =>
        $isDestructive ? "rgba(255, 105, 97, 0.3)" : "rgba(63, 147, 178, 0.3)"};
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
      <ModalHeader closeButton>
        <HeaderText $isDestructive={isDestructive}>{title}</HeaderText>
      </ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <CancelButton onClick={onCancel}>{cancelLabel}</CancelButton>
        <ConfirmButton $isDestructive={isDestructive} onClick={onConfirm}>
          {confirmLabel}
        </ConfirmButton>
      </ModalFooter>
    </StyledModal>
  );
}

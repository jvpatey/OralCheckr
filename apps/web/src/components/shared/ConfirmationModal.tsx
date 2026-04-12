import type { ReactNode } from "react";
import styled from "styled-components";
import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalHeading,
  ModalBody,
  ModalOutlineButton,
  ModalMutedOutlineButton,
  StyledFormButton,
} from "../../containers/welcome/styles/ModalStyles";

interface ConfirmationModalProps {
  show: boolean;
  title: ReactNode;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
  /** Disables both actions (e.g. while a mutation is running) */
  isBusy?: boolean;
  /** When set, passed to react-bootstrap Modal (e.g. `"static"` for delete confirms) */
  backdrop?: boolean | "static";
  keyboard?: boolean;
}

/** Same scale as welcome CardText — centered body copy */
const ModalMessage = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 auto;
  max-width: 32rem;
  text-align: center;
  font-size: clamp(0.95rem, 0.45vw + 0.82rem, 1.0625rem);
  line-height: 1.65;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

export function ConfirmationModal({
  show,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
  isBusy = false,
  backdrop,
  keyboard,
}: ConfirmationModalProps) {
  const CancelBtn = isDestructive ? ModalMutedOutlineButton : ModalOutlineButton;
  const ConfirmBtn = isDestructive ? ModalOutlineButton : StyledFormButton;

  return (
    <StyledModal
      show={show}
      onHide={onCancel}
      centered
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <ModalHeader closeButton>
        <ModalTitleStack>
          <ModalHeading>{title}</ModalHeading>
        </ModalTitleStack>
      </ModalHeader>
      <ModalBody>
        <ModalMessage>{message}</ModalMessage>
        <ButtonContainer>
          <ButtonWrapper>
            <CancelBtn type="button" onClick={onCancel} disabled={isBusy}>
              {cancelLabel}
            </CancelBtn>
          </ButtonWrapper>
          <ButtonWrapper>
            <ConfirmBtn
              type="button"
              onClick={onConfirm}
              disabled={isBusy}
            >
              {confirmLabel}
            </ConfirmBtn>
          </ButtonWrapper>
        </ButtonContainer>
      </ModalBody>
    </StyledModal>
  );
}

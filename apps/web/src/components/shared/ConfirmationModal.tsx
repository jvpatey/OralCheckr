import type { ReactNode } from "react";
import styled from "styled-components";
import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalHeading,
  ModalBody,
  ModalOutlineButton,
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

const DangerFormButton = styled(StyledFormButton)`
  background: ${({ theme }) => theme.error};
  border: 1px solid ${({ theme }) => theme.error};

  &:hover:not(:disabled) {
    filter: brightness(1.06);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.14);
  }

  &:active:not(:disabled) {
    filter: brightness(0.98);
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.error};
  }
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
}: ConfirmationModalProps) {
  const ConfirmBtn = isDestructive ? DangerFormButton : StyledFormButton;

  return (
    <StyledModal show={show} onHide={onCancel} centered>
      <ModalHeader closeButton>
        <ModalTitleStack>
          <ModalHeading>{title}</ModalHeading>
        </ModalTitleStack>
      </ModalHeader>
      <ModalBody>
        <ModalMessage>{message}</ModalMessage>
        <ButtonContainer>
          <ButtonWrapper>
            <ModalOutlineButton type="button" onClick={onCancel}>
              {cancelLabel}
            </ModalOutlineButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <ConfirmBtn type="button" onClick={onConfirm}>
              {confirmLabel}
            </ConfirmBtn>
          </ButtonWrapper>
        </ButtonContainer>
      </ModalBody>
    </StyledModal>
  );
}

import styled from "styled-components";
import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalHeading,
  ModalHeadingAccent,
  ModalBody,
  ModalOutlineButton,
  ModalMutedOutlineButton,
} from "../../../welcome/styles/ModalStyles";

const ModalMessage = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 auto 16px;
  max-width: 32rem;
  text-align: center;
  font-size: clamp(0.95rem, 0.45vw + 0.82rem, 1.0625rem);
  line-height: 1.65;
  font-weight: 400;
`;

const WarningCallout = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.error};
  font-weight: 600;
  margin: 0 auto 20px;
  padding: 0.875rem 1rem;
  max-width: 32rem;
  text-align: center;
  background: ${({ theme }) => `${theme.error}14`};
  border: 1px solid ${({ theme }) => `${theme.error}45`};
  border-radius: 20px;
  line-height: 1.5;
  font-size: 0.9375rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
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
      <ModalHeader closeButton>
        <ModalTitleStack>
          <ModalHeading>
            Delete <ModalHeadingAccent>account</ModalHeadingAccent>
          </ModalHeading>
        </ModalTitleStack>
      </ModalHeader>
      <ModalBody>
        <ModalMessage>
          Are you sure you want to delete your account? This action cannot be
          undone and all your data will be permanently removed from our systems.
        </ModalMessage>
        <WarningCallout>
          All your tracking data, personalized recommendations, and account
          information will be permanently deleted.
        </WarningCallout>
        <ButtonContainer>
          <ButtonWrapper>
            <ModalMutedOutlineButton
              type="button"
              onClick={onHide}
              disabled={isDeleting}
            >
              Cancel
            </ModalMutedOutlineButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <ModalOutlineButton
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Yes, delete my account"}
            </ModalOutlineButton>
          </ButtonWrapper>
        </ButtonContainer>
      </ModalBody>
    </StyledModal>
  );
}

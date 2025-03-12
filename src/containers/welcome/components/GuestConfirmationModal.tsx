import {
  StyledModal,
  ModalHeader,
  HeaderText,
  ModalBody,
  CardText,
} from "../styles/ModalStyles";
import styled from "styled-components";

interface GuestConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 15px;
  width: 100%;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

// Base button styles to ensure consistency
const BaseButton = styled.button`
  font-weight: bold;
  padding: 0.5em 1em;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  min-height: 38px;
  transition: all 0.3s ease;
  text-align: center;
`;

// Custom button for the cancel action
const CancelButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.darkGrey};
  color: ${({ theme }) => theme.backgroundColor};
  border: 2px solid ${({ theme }) => theme.darkGrey};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.darkGrey};
    color: ${({ theme }) => theme.darkGrey};
  }
`;

// Custom button for the continue action
const ContinueButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.backgroundColor};
  border: 2px solid ${({ theme }) => theme.green};

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.green};
    border-color: ${({ theme }) => theme.green};
  }
`;

// Wrapper for both buttons
const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export function GuestConfirmationModal({
  show,
  onConfirm,
  onCancel,
}: GuestConfirmationModalProps) {
  return (
    <StyledModal show={show} onHide={onCancel} centered>
      <ModalHeader closeButton>
        <HeaderText>Continue as Guest</HeaderText>
      </ModalHeader>
      <ModalBody>
        <CardText>
          Continuing as guest will let you explore the app and its functionality
          without creating an account.
        </CardText>
        <CardText>
          If you later choose to create an account, any questionnaire responses
          and habit tracking data will be transferred to your new account.
        </CardText>
        <ButtonContainer>
          <ButtonWrapper>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <ContinueButton onClick={onConfirm}>
              Continue as Guest
            </ContinueButton>
          </ButtonWrapper>
        </ButtonContainer>
      </ModalBody>
    </StyledModal>
  );
}

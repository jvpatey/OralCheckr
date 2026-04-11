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
  background: ${({ theme }) => theme.secondaryGradient};
  color: white;
  border: 2px solid ${({ theme }) => theme.secondary};
  position: relative;
  overflow: hidden;

  /* Subtle shine sweep effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    color: white;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(1.01);
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
          Hey there! You can explore all of OralCheckr's features without
          creating an account. Take your time to see what we're all about!
        </CardText>
        <CardText>
          No worries if you want to create an account later - we'll save all
          your progress and transfer everything to your new account seamlessly.
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

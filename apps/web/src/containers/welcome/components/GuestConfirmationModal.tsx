import {
  StyledModal,
  ModalHeader,
  ModalTitleStack,
  ModalWordmark,
  ModalWordmarkAccent,
  ModalHeading,
  ModalBody,
  CardText,
  StyledFormButton,
  ModalOutlineButton,
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

export function GuestConfirmationModal({
  show,
  onConfirm,
  onCancel,
}: GuestConfirmationModalProps) {
  return (
    <StyledModal show={show} onHide={onCancel} centered>
      <ModalHeader closeButton>
        <ModalTitleStack>
          <ModalWordmark>
            Oral<ModalWordmarkAccent>Checkr</ModalWordmarkAccent>
          </ModalWordmark>
          <ModalHeading>Continue as guest</ModalHeading>
        </ModalTitleStack>
      </ModalHeader>
      <ModalBody>
        <CardText>
          You can explore OralCheckr without creating an account. Take your
          time to see what we offer.
        </CardText>
        <CardText>
          If you sign up later, we&apos;ll keep your progress and move it to
          your new account.
        </CardText>
        <ButtonContainer>
          <ButtonWrapper>
            <ModalOutlineButton type="button" onClick={onCancel}>
              Cancel
            </ModalOutlineButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <StyledFormButton type="button" onClick={onConfirm}>
              Continue as guest
            </StyledFormButton>
          </ButtonWrapper>
        </ButtonContainer>
      </ModalBody>
    </StyledModal>
  );
}

import React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { StyledButton, DeleteButton } from "../../styles/AccountTabStyles";

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
  }

  .modal-header {
    border-bottom-color: ${({ theme }) => theme.borderGrey};
  }

  .modal-footer {
    border-top-color: ${({ theme }) => theme.borderGrey};
  }
`;

const ModalTitle = styled(Modal.Title)`
  color: ${({ theme }) => theme.red};
  font-weight: 500;
`;

const WarningText = styled.p`
  color: ${({ theme }) => theme.red};
  font-weight: 500;
  margin-top: 1rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
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
  const handleCancel = (_: React.MouseEvent<HTMLButtonElement>) => {
    onHide();
  };

  const handleDelete = (_: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm();
  };

  return (
    <StyledModal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <ModalTitle>Delete Account</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <InfoText>
          Are you sure you want to delete your account? This action cannot be
          undone and all your data will be permanently removed from our systems.
        </InfoText>
        <WarningText>
          All your tracking data, personalized recommendations, and account
          information will be permanently deleted.
        </WarningText>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={handleCancel}>Cancel</StyledButton>
        <DeleteButton onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
        </DeleteButton>
      </Modal.Footer>
    </StyledModal>
  );
}

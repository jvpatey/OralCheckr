import { Modal } from "react-bootstrap";
import styled from "styled-components";

// Styled header for the modal that adapts to theme colors
export const StyledModalHeader = styled(Modal.Header)`
  background: ${({ theme }) => theme.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.textGrey};

  .modal-title {
    color: ${({ theme }) => theme.textGrey};
  }

  .btn-close {
    color: ${({ theme }) => theme.textColor};
  }
`;

// Styled body for the modal that adapts to theme colors
export const StyledModalBody = styled(Modal.Body)`
  background: ${({ theme }) => theme.backgroundColor};
`;

// Grid layout for avatar options - 4 columns
export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
`;

// Individual avatar option with hover and selection states
export const AvatarOption = styled.div<{ $isSelected?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid
    ${({ $isSelected, theme }) => ($isSelected ? theme.blue : "transparent")};
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.backgroundColor};

  &:hover {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.blue};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

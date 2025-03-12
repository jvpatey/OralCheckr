import styled from "styled-components";

// Modal overlay
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Modal container
export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }
`;

// Modal header
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Modal title
export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.blue};
  margin: 0;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Modal close button
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.textGrey};

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

// Form group
export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

// Form label
export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.textGrey};
`;

// Form input
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.disabledText};
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.blue};
  }
`;

// Form button container
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

// Form button
export const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ $primary, theme }) =>
    $primary ? theme.blue : theme.backgroundColor};
  color: ${({ $primary, theme }) =>
    $primary ? theme.backgroundColor : theme.blue};
  border: 2px solid ${({ theme }) => theme.blue};

  &:hover {
    background-color: ${({ $primary, theme }) =>
      $primary ? theme.backgroundColor : theme.blue};
    color: ${({ $primary, theme }) =>
      $primary ? theme.blue : theme.backgroundColor};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

import styled from "styled-components";
import { Form, Button, ToastContainer } from "react-bootstrap";

export const SettingsContainer = styled.div`
  padding: 1.5rem;
`;

export const Section = styled.div`
  margin-bottom: 2.5rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 2rem;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: ${({ theme }) => theme.blue};
  }
`;

export const SectionTitle = styled.h3`
  && {
    color: ${({ theme }) => theme.blue};
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 2rem;
    padding-bottom: 0.25rem;
  }
`;

export const StyledForm = styled(Form)`
  max-width: 400px;
`;

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.backgroundColor};
  border: 2px solid ${({ theme }) => theme.green};
  padding: 5px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.green};
    border: 2px solid ${({ theme }) => theme.green};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CurrentValue = styled.div`
  color: ${({ theme }) => theme.textGrey};
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

export const StyledLabel = styled(Form.Label)`
  color: ${({ theme }) => theme.textGrey};
`;

export const PasswordFeedback = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const EyeButton = styled(Button)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.borderGrey};
  color: ${({ theme }) => theme.textGrey};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.blue};
    border: 1px solid ${({ theme }) => theme.borderGrey};
  }

  &:active {
    background-color: ${({ theme }) => theme.accentBackgroundColor} !important;
    color: ${({ theme }) => theme.blue} !important;
    border: 1px solid ${({ theme }) => theme.borderGrey} !important;
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  position: fixed;
  top: 80px; // Adjust this value based on your navbar height
  right: 20px;
  z-index: 9999;

  .toast {
    background-color: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${({ theme }) => theme.borderGrey};
    min-width: 300px;
  }

  .toast-header {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
  }

  .toast-body {
    color: ${({ theme }) => theme.textColor};
  }

  .bg-success {
    background-color: ${({ theme }) => theme.green} !important;
    color: ${({ theme }) => theme.backgroundColor} !important;
  }

  .bg-danger {
    background-color: ${({ theme }) => theme.red} !important;
    color: ${({ theme }) => theme.backgroundColor} !important;
  }
`;

export const DeleteSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  position: relative;
  padding-top: 1rem;

  &:after {
    content: "";
    position: absolute;
    top: 3rem;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: ${({ theme }) => theme.blue};
  }
`;

export const DeleteButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.red};
  border-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.accentBackgroundColor};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    border-color: ${({ theme }) => theme.red};
    color: ${({ theme }) => theme.red};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.red};
    border-color: ${({ theme }) => theme.red};
    opacity: 0.6;
  }
`;

export const WarningText = styled(DescriptionText)`
  color: ${({ theme }) => theme.red};
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

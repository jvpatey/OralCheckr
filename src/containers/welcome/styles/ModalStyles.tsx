import styled from "styled-components";
import { Modal, Form, Button } from "react-bootstrap";
import { FormButton } from "../../../components/questionnaire/styles/FormButton";

// Modal structure styles
export const StyledModal = styled(Modal)`
  .modal-content {
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.borderLight};
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  .modal-dialog {
    max-width: 480px;
  }
`;

export const ModalHeader = styled(Modal.Header)`
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  border: none;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 24px 24px 0 24px;

  .btn-close {
    position: absolute;
    right: 20px;
    top: 20px;
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    border: 1px solid ${({ theme }) => theme.borderLight};
    border-radius: 12px;
    width: 36px;
    height: 36px;
    opacity: 0.8;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${({ theme }) => theme.textPrimary};

    &::before {
      content: "×";
      font-size: 20px;
      font-weight: bold;
      color: ${({ theme }) => theme.textPrimary};
    }

    &:hover {
      opacity: 1;
      transform: scale(1.05);
      border-color: ${({ theme }) => theme.primary};
      background: ${({ theme }) => theme.surfaceElevated};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
    }
  }
`;

export const HeaderText = styled(Modal.Title)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

export const ModalBody = styled(Modal.Body)`
  background: transparent;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding: 20px 24px 24px 24px;
`;

// Form input styles
export const InputStyle = styled(Form.Control)`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  padding: 16px 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.textPrimary};
  margin-top: 0;
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20,
      0 8px 25px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) => theme.surfaceElevated};
  }

  &:hover {
    border-color: ${({ theme }) => theme.borderMedium};
  }
`;

// Required form group with asterisk
export const RequiredFormGroup = styled(Form.Group)`
  position: relative;
  margin-bottom: 0;

  &::before {
    content: "*";
    color: ${({ theme }) => theme.error || "#dc3545"};
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 1rem;
    font-weight: 600;
  }

  ${InputStyle} {
    padding-left: 32px;
  }
`;

// Password field styles
export const PasswordContainer = styled.div`
  position: relative;
  margin-top: 0;

  ${RequiredFormGroup} & {
    ${InputStyle} {
      padding-left: 32px;
      padding-right: 80px;
    }
  }
`;

export const PasswordToggle = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;

export const InfoIcon = styled.span`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;

// Text styles
export const CardText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 24px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.9;
`;

// Required fields note
export const RequiredFieldsNote = styled.div`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.8rem;
  margin-left: 15px;
  margin-bottom: 5px;

  &::before {
    content: "*";
    color: ${({ theme }) => theme.red || "#dc3545"};
    margin-right: 4px;
  }
`;

// Required field label
export const RequiredLabel = styled.label`
  color: ${({ theme }) => theme.textGrey};
  font-size: 0.9rem;
  margin-left: 5px;

  &::after {
    content: " *";
    color: ${({ theme }) => theme.red || "#dc3545"};
    margin-left: 2px;
  }
`;

// Small note for required fields
export const RequiredNote = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.75rem;
  text-align: right;
  margin-top: -12px;
  margin-bottom: 16px;
  font-style: italic;
  opacity: 0.7;

  &::before {
    content: "* ";
    color: ${({ theme }) => theme.error || "#dc3545"};
  }
`;

// Password requirement styles
export const RequirementList = styled.ul`
  padding: 16px 20px;
  margin: 12px 0 0 0;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  list-style: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const RequirementItem = styled.li<{ $isMet: boolean }>`
  color: ${(props) =>
    props.$isMet ? props.theme.success : props.theme.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "${(props) => (props.$isMet ? "✓" : "○")}";
    margin-right: 12px;
    font-weight: bold;
    color: ${(props) =>
      props.$isMet ? props.theme.success : props.theme.textSecondary};
    width: 16px;
    text-align: center;
    transition: all 0.3s ease;
  }
`;

export const OrSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.8;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;

  & > div {
    width: 48%;
  }
`;

export const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  height: 52px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  margin-bottom: 16px;

  &:hover {
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.textPrimary};
    border-color: ${({ theme }) => theme.borderMedium};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    height: 20px;
    margin-right: 12px;
  }
`;

export const StyledFormButton = styled(FormButton)`
  background: ${({ theme }) => theme.primaryGradient};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 16px;
  width: 100%;
  margin: 0;
  height: 52px;
  padding: 16px 20px;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Global popover styles for password requirements
export const GlobalPopoverStyles = styled.div`
  /* Target all popovers globally with more aggressive selectors */
  .popover,
  .popover.show,
  .popover.bs-popover-top,
  .popover.bs-popover-bottom,
  .popover.bs-popover-left,
  .popover.bs-popover-right {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    max-width: 280px;
    z-index: 9999 !important;
    padding: 0 !important;
    margin: 0 !important;
    backdrop-filter: none !important;
  }

  .popover-body,
  .popover-body * {
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
  }

  .popover-arrow,
  .popover-arrow::before,
  .popover-arrow::after {
    display: none !important;
    visibility: hidden !important;
  }

  /* Hide any default Bootstrap popover styling */
  .popover-content,
  .popover-content * {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
  }

  /* Target the specific popover ID */
  #password-requirements-popover {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
`;

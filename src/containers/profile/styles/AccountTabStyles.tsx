import styled from "styled-components";
import { Form, Button, ToastContainer } from "react-bootstrap";

export const SettingsContainer = styled.div`
  padding: 0;
`;

export const Section = styled.div`
  margin-bottom: 3rem;
  position: relative;
  padding: 2rem 2rem 3rem 2rem;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadowMd};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowLg};
    border-color: ${({ theme }) => theme.borderMedium};
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  && {
    color: ${({ theme }) => theme.textPrimary};
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid ${({ theme }) => theme.borderLight};
    background: ${({ theme }) => theme.primaryGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 1.125rem;
      margin-bottom: 1.25rem;
    }
  }
`;

export const StyledForm = styled(Form)`
  max-width: 400px;
`;

export const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.primaryGradient};
  color: white;
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 12px 24px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowMd};
  position: relative;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: ${({ theme }) => theme.shadowSm};
  }
`;

export const CurrentValue = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const StyledLabel = styled(Form.Label)`
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const PasswordFeedback = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const EyeButton = styled(Button)`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  color: ${({ theme }) => theme.textSecondary};
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.surfaceElevated};
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: ${({ theme }) => theme.shadowSm};
  }

  &:active {
    background: ${({ theme }) => theme.surfaceElevated} !important;
    color: ${({ theme }) => theme.primary} !important;
    border: 1px solid ${({ theme }) => theme.primary} !important;
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 9999;

  .toast {
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    border: 1px solid ${({ theme }) => theme.borderLight};
    border-radius: 16px;
    min-width: 320px;
    box-shadow: ${({ theme }) => theme.shadowXl};
  }

  .toast-header {
    background: transparent;
    color: ${({ theme }) => theme.textPrimary};
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};
    font-weight: 600;
  }

  .toast-body {
    color: ${({ theme }) => theme.textSecondary};
  }

  .bg-success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    color: white !important;
    border: none !important;

    .toast-header {
      background: transparent;
      color: white !important;
      border-bottom-color: rgba(255, 255, 255, 0.2);
    }

    .toast-body {
      color: white !important;
    }
  }

  .bg-danger {
    background: linear-gradient(135deg, #ff6961 0%, #ff4757 100%) !important;
    color: white !important;
    border: none !important;

    .toast-header {
      background: transparent;
      color: white !important;
      border-bottom-color: rgba(255, 255, 255, 0.2);
    }

    .toast-body {
      color: white !important;
    }
  }
`;

export const DeleteSection = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
  padding: 0;
`;

export const DeleteButton = styled(StyledButton)`
  background: linear-gradient(135deg, #ff6961 0%, #ff4757 100%);
  border-color: #ff6961;
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 105, 97, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    transform: none;
    box-shadow: ${({ theme }) => theme.shadowSm};
  }
`;

export const WarningText = styled.div`
  color: #ff6961;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  background: rgba(255, 105, 97, 0.1);
  border: 1px solid rgba(255, 105, 97, 0.3);
  border-radius: 12px;
  line-height: 1.5;
`;

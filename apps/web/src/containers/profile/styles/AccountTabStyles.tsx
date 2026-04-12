import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

export const SettingsContainer = styled.div`
  padding: 0;
`;

export const Section = styled.div`
  margin-bottom: 3rem;
  position: relative;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  && {
    font-family: var(--font-sans), system-ui, sans-serif;
    color: ${({ theme }) => theme.textPrimary};
    font-size: clamp(1.1rem, 1.2vw + 0.85rem, 1.35rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.35;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderLight};

    @media (max-width: 768px) {
      margin-bottom: 1.25rem;
    }
  }
`;

export const StyledForm = styled(Form)`
  max-width: 400px;
`;

export const StyledButton = styled(Button)`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: ${({ theme }) => theme.primaryGradient};
  color: #ffffff;
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 11px 22px;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  border-radius: 9999px;
  transition:
    box-shadow 0.25s ease,
    filter 0.25s ease,
    opacity 0.25s ease;
  box-shadow: ${({ theme }) => theme.shadowMd};

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow: ${({ theme }) => theme.shadowLg};
  }

  &:active:not(:disabled) {
    filter: brightness(0.98);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    filter: none;
    box-shadow: none;
  }
`;

export const CurrentValue = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.02em;
`;

export const DescriptionText = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  font-size: clamp(0.95rem, 0.45vw + 0.82rem, 1.0625rem);
  margin-bottom: 1.5rem;
  line-height: 1.65;
  font-weight: 400;
`;

export const StyledLabel = styled(Form.Label)`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: -0.02em;
`;

export const PasswordFeedback = styled.div<{ $success?: boolean }>`
  color: ${({ theme, $success }) =>
    $success ? theme.secondary : theme.red};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const EyeButton = styled(Button)`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  color: ${({ theme }) => theme.textSecondary};
  border-radius: 9999px;
  padding: 8px 14px;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;

  &:hover,
  &:focus {
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => `${theme.primary}65`};
  }

  &:active {
    background: ${({ theme }) => `${theme.primary}0d`} !important;
    color: ${({ theme }) => theme.primary} !important;
    border-color: ${({ theme }) => `${theme.primary}65`} !important;
  }
`;

// This component can be removed if no longer needed

export const DeleteSection = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
  padding: 0;
`;

/** Outline + primary border — same colors as welcome Login (`Button` variant login) */
export const DeleteButton = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 11px 22px;
  min-height: 46px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  border-radius: 9999px;
  cursor: pointer;
  width: auto;
  max-width: 300px;
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  box-shadow: none;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    opacity 0.25s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.primary}70`};
    background: ${({ theme }) => `${theme.primary}10`};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}55`} inset;
    color: ${({ theme }) => theme.textPrimary};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const WarningText = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.error};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => `${theme.error}14`};
  border: 1px solid ${({ theme }) => `${theme.error}45`};
  border-radius: 20px;
  line-height: 1.5;
`;

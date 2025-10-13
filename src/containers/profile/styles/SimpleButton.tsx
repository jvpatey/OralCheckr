import React from "react";
import styled from "styled-components";

interface SimpleButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger";
}

const ButtonContainer = styled.button<{ $variant?: string }>`
  background: ${({ theme, $variant }) =>
    $variant === "danger"
      ? "linear-gradient(135deg, #ff6961 0%, #ff4757 100%)"
      : theme.primaryGradient};
  color: white;
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "danger" ? "#ff6961" : theme.primary};
  padding: 12px 24px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowMd};
  position: relative;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: ${({ theme, $variant }) =>
      $variant === "danger"
        ? "0 8px 25px rgba(255, 105, 97, 0.3)"
        : theme.shadowLg};
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

export const SimpleButton: React.FC<SimpleButtonProps> = ({
  type = "button",
  disabled = false,
  children,
  onClick,
  variant = "primary",
}) => {
  return (
    <ButtonContainer
      type={type}
      disabled={disabled}
      onClick={onClick}
      $variant={variant}
    >
      {children}
    </ButtonContainer>
  );
};

export const DeleteButton: React.FC<SimpleButtonProps> = (props) => {
  return <SimpleButton {...props} variant="danger" />;
};

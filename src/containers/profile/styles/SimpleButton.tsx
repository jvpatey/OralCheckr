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
  background-color: ${({ theme, $variant }) =>
    $variant === "danger" ? theme.red : theme.green};
  color: ${({ theme }) => theme.backgroundColor};
  border: 2px solid
    ${({ theme, $variant }) =>
      $variant === "danger" ? theme.red : theme.green};
  padding: 5px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme, $variant }) =>
      $variant === "danger" ? theme.red : theme.green};
    border: 2px solid
      ${({ theme, $variant }) =>
        $variant === "danger" ? theme.red : theme.green};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

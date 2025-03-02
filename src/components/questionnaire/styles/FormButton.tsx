import styled from "styled-components";
import React from "react";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "login" | "signup";
  children: React.ReactNode;
}

const StyledButton = styled.button<{ $variant?: string }>`
  background-color: ${(props) =>
    props.disabled ? props.theme.disabledBackground : props.theme.green};
  color: ${(props) =>
    props.disabled ? props.theme.disabledText : props.theme.backgroundColor};
  font-weight: bold;
  border: 2px solid
    ${(props) =>
      props.disabled ? props.theme.disabledBackground : props.theme.green};
  width: 50%;
  margin-top: 10px;
  border-radius: 20px;
  padding: 0.5em 1em;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 10px auto;
  display: block;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.disabledBackground
        : props.theme.accentBackgroundColor};
    color: ${(props) =>
      props.disabled ? props.theme.disabledText : props.theme.green};
    border-color: ${(props) =>
      props.disabled ? props.theme.disabledBackground : props.theme.green};
    border-width: 2px;
  }
`;

export const FormButton: React.FC<FormButtonProps> = ({
  type = "button",
  disabled = false,
  onClick,
  variant = "login",
  children,
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      $variant={variant}
    >
      {children}
    </StyledButton>
  );
};

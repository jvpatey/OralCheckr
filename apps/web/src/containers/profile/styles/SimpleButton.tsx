import React from "react";
import styled from "styled-components";
import {
  InlinePrimaryButton,
  InlineOutlineButton,
} from "../../welcome/styles/ModalStyles";

interface SimpleButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger";
}

/** Same outline colors as welcome Login / `ModalOutlineButton` */
const DeleteOutlinePill = styled(InlineOutlineButton)`
  &:disabled {
    opacity: 0.55;
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
  if (variant === "danger") {
    return (
      <DeleteOutlinePill
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </DeleteOutlinePill>
    );
  }

  return (
    <InlinePrimaryButton
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </InlinePrimaryButton>
  );
};

export const DeleteButton: React.FC<SimpleButtonProps> = (props) => {
  return <SimpleButton {...props} variant="danger" />;
};

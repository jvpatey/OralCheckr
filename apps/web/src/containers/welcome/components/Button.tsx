import React from "react";
import { BaseButton, ButtonVariant } from "../styles/ButtonStyles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton $variant={variant} {...props}>
      {children}
    </BaseButton>
  );
}

import styled from "styled-components";
import React from "react";

interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

/** Outline pill — aligned with welcome Login / ModalOutlineButton */
const BackButtonEl = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  padding: 10px 18px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  border-radius: 9999px;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    padding: 9px 16px;
    font-size: 0.875rem;
  }
`;

export const SimpleBackButton: React.FC<BackButtonProps> = ({
  onClick,
  children,
}) => {
  return <BackButtonEl onClick={onClick}>{children}</BackButtonEl>;
};

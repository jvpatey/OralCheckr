import styled from "styled-components";
import React from "react";

interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BackButtonContainer = styled.button`
  background: ${({ theme }) => theme.primaryGradient};
  color: white;
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 12px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(1.01);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    border-radius: 12px;
  }
`;

export const SimpleBackButton: React.FC<BackButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <BackButtonContainer onClick={onClick}>{children}</BackButtonContainer>
  );
};

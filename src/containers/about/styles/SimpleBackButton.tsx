import styled from "styled-components";
import React from "react";

interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BackButtonContainer = styled.button`
  background-color: ${({ theme }) => theme.green};
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.green}cc;
    color: white;
    border: none;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.green}33;
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

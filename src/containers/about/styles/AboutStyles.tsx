import styled, { keyframes } from "styled-components";
import { Card, Button } from "react-bootstrap";

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface PageContainerProps {
  $isAuthenticated: boolean;
}

export const PageContainer = styled.div<PageContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${({ theme }) => theme.backgroundGradient};
  overflow-y: auto;
  padding: ${({ $isAuthenticated }) =>
    $isAuthenticated
      ? "calc(80px + 2rem) 20px 2rem 20px"
      : "2rem 20px 2rem 20px"};
  z-index: 1;

  /* Add bottom spacing by using a pseudo-element */
  &::after {
    content: "";
    display: block;
    height: 2rem;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: ${({ $isAuthenticated }) =>
      $isAuthenticated
        ? "calc(80px + 1.5rem) 15px 1.5rem 15px"
        : "1.5rem 15px 1.5rem 15px"};
  }

  @media (max-width: 480px) {
    padding: ${({ $isAuthenticated }) =>
      $isAuthenticated
        ? "calc(80px + 1rem) 10px 1rem 10px"
        : "1rem 10px 1rem 10px"};
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.primary}40`};
    border-radius: 8px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => `${theme.primary}60`};
  }
`;

export const AboutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  animation: ${fadeUp} 0.6s ease-out;
  position: relative;
  z-index: 1;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

export const AboutTitle = styled.h1`
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.5px;
  animation: ${fadeUp} 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const BackButtonContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const BackButton = styled(Button)`
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
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    border-radius: 12px;
  }
`;

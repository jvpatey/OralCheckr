import styled, { keyframes } from "styled-components";
import { scrollbarStyle } from "../../../../styles/SharedStyles";

// Animation for fading up elements
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

// Background floating elements for modern effect
export const BackgroundEffects = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 15%;
    right: 10%;
    width: 250px;
    height: 250px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.secondary}20,
      ${({ theme }) => theme.primary}20
    );
    border-radius: 50%;
    filter: blur(60px);
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 15%;
    left: 10%;
    width: 200px;
    height: 200px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.accent}20,
      ${({ theme }) => theme.secondary}20
    );
    border-radius: 50%;
    filter: blur(40px);
    animation: ${pulse} 4s ease-in-out infinite;
  }
`;

// Modern fluid container - no card styling
export const CardContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 32px;
  height: calc(100vh - 120px);
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  overflow: hidden;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 30px 24px;
    height: calc(100vh - 100px);
    max-width: calc(100vw - 48px);
  }

  @media (max-width: 640px) {
    padding: 25px 20px;
    max-width: calc(100vw - 40px);
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
    height: calc(100vh - 90px);
    max-width: calc(100vw - 32px);
  }

  @media (max-width: 360px) {
    padding: 16px 12px;
    max-width: calc(100vw - 24px);
  }
`;

// Main container for the habit list
export const HabitListContainer = styled.div`
  width: calc(100% - 190px);
  height: 100%;
  position: fixed;
  top: 80px;
  left: 190px;
  will-change: transform;
  backface-visibility: hidden;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

// Wrapper for habit content
export const HabitWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0;
  will-change: transform;
  backface-visibility: hidden;
`;

// Header for the habits section with gradient text
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  width: 100%;
  white-space: nowrap;
  margin-bottom: 24px;
  position: relative;

  /* Subtle bottom accent line */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.3;
  }
`;

// Header text styling with gradient
export const HeaderText = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: -0.5px;
  margin: 0;

  /* Gradient text effect */
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Container for header buttons
export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Scrollable container for habits
export const ScrollableHabitList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 16px 20px 0;
  ${scrollbarStyle}
  will-change: transform;
  backface-visibility: hidden;
`;

// Styled container for the habit list
export const StyledHabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 4px;
`;

// Row for individual habits
export const HabitRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  gap: 0;

  > div:last-child {
    display: flex;
    gap: 6px;
    margin-left: 12px;
  }
`;

// Text for empty state with gradient
export const PlaceholderText = styled.div`
  font-size: 1.25rem;
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 40px;
  text-align: center;
  font-weight: 500;
  opacity: 0.8;
`;

// Fluid wrapper for date picker - no card styling
export const DatePickerWrapper = styled.div`
  margin-bottom: 32px;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

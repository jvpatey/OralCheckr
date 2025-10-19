import styled, { keyframes } from "styled-components";
import { scrollbarStyle } from "../../../styles/SharedStyles";

// Smooth fade-up animation matching landing page
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Question transition animation
const questionTransition = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Truly fluid assessment container - no card styling at all
export const ModernAssessmentContainer = styled.div<{
  $isAuthenticated: boolean;
}>`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 40px 20px;

  /* Smooth fade-up animation matching landing page */
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  @media (max-width: 800px) {
    width: ${({ $isAuthenticated }) =>
      $isAuthenticated ? "calc(100% - 86px)" : "100%"};
    margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "86px" : "0")};
    padding: 20px 16px;
    min-height: calc(100vh - 100px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 80px);
    padding: 20px;
  }
`;

// Compact header section with minimal spacing
export const AssessmentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 1;
  /* No animation - header is static */

  @media (max-width: 768px) {
    margin-bottom: 18px;
    padding: 0 16px;
  }
`;

// Compact question content area with minimal spacing
export const QuestionContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow-y: auto;
  position: relative;
  ${scrollbarStyle}

  /* Prevent layout shift during transitions */
  min-height: 300px;

  @media (max-width: 768px) {
    margin-bottom: 18px;
    min-height: 250px;
  }
`;

// Fade wrapper for smooth question transitions without remounting
export const QuestionFadeWrapper = styled.div`
  width: 100%;
  opacity: 1;
  transition: opacity 0.12s ease-in-out;

  &.fade-out {
    opacity: 0;
  }

  &.fade-in {
    opacity: 1;
  }
`;

// Compact action section for buttons
export const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 16px;
  flex-wrap: wrap;
  opacity: 1;
  /* No animation - buttons are static */

  @media (max-width: 768px) {
    gap: 12px;
    flex-direction: column;
    align-items: stretch;
    margin-top: 14px;
  }
`;

// Error message styling
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  background: ${({ theme }) => theme.errorLight}20;
  border: 1px solid ${({ theme }) => theme.errorLight};
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

// Clean progress bar with no background - fully transparent
export const ProgressBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  padding: 4px;

  .progress-segment {
    flex: 1;
    height: 8px;
    background-color: ${({ theme }) => theme.textTertiary};
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &.filled {
      background: ${({ theme }) => theme.secondaryGradient};
      box-shadow: 0 0 12px ${({ theme }) => theme.glowColor};
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
    gap: 6px;
    padding: 3px;

    .progress-segment {
      height: 6px;
      border-radius: 6px;
    }
  }
`;

// Modern progress indicator with gradient text
export const ProgressIndicator = styled.div`
  font-size: 1.25rem;
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.01em;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Modern gradient submit button matching app style
export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Modern gradient background */
  background: ${({ theme }) => theme.secondaryGradient};
  color: white;

  /* Typography */
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;

  /* Spacing */
  padding: 14px 32px;
  border-radius: 16px;

  /* Modern shadow */
  box-shadow: ${({ theme }) => theme.shadowLg};

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Border */
  border: none;
  position: relative;
  overflow: hidden;
  min-width: 120px;

  /* Subtle glow effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  /* Hover effects */
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowXl};
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 0.3;
    }
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px 24px;
    min-width: 100px;
  }
`;

// Modern quit button with gradient styling
export const QuitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* Modern gradient background */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.error} 0%,
    ${({ theme }) => theme.errorLight} 100%
  );
  color: white;

  /* Typography */
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;

  /* Spacing */
  padding: 14px 24px;
  border-radius: 16px;

  /* Modern shadow */
  box-shadow: ${({ theme }) => theme.shadowMd};

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Border */
  border: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  min-width: max-content;

  /* Subtle glow effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.errorLight} 0%,
      ${({ theme }) => theme.error} 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  /* Hover effects */
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 0.3;
    }
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.error};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px 20px;
  }
`;

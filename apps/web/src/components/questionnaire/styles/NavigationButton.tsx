import styled from "styled-components";

// Modern navigation button with gradient styling matching app
export const NavigationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Modern gradient background */
  background: ${({ theme }) => theme.primaryGradient};
  color: white;

  /* Typography */
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;

  /* Spacing */
  padding: 14px 28px;
  border-radius: 16px;

  /* Modern shadow */
  box-shadow: ${({ theme }) => theme.shadowMd};

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Border */
  border: none;
  position: relative;
  overflow: hidden;
  min-width: 120px;

  /* Subtle shine sweep effect */
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

  /* Hover effects */
  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadowLg};
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &::before {
      left: 100%;
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
    padding: 12px 20px;
    min-width: 100px;
  }
`;

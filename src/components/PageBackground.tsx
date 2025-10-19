import styled from "styled-components";
import { scrollbarStyle } from "../styles/SharedStyles";

// Modern page background with enhanced gradient - no animation to prevent flash
export const PageBackground = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.backgroundGradient};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 1;
  /* Instant render - no transition to prevent flash */
  ${scrollbarStyle}

  /* Additional gradient overlay for depth */
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        ${({ theme }) => theme.primary}08 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        ${({ theme }) => theme.secondary}06 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        ${({ theme }) => theme.accent}04 0%,
        transparent 50%
      );
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 0;
  }

  @media (max-width: 480px) {
    padding: 0;
  }
`;

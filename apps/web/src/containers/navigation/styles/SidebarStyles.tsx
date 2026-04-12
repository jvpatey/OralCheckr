import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Match ModernNavBar entrance — subtle vertical fade
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/** Shell aligned with ModernNavBar `NavLinksContainer` — vertical stack of pills */
export const SidebarContainer = styled.nav`
  height: calc(100vh - 120px);
  width: 220px;
  position: fixed;
  top: 104px;
  left: 16px;

  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.borderLight}60;
  border-radius: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 14px 12px;

  animation: ${fadeIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 900;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 800px) {
    width: min(220px, calc(100vw - 24px));
    left: 8px;
    padding: 12px 10px;
    border-radius: 24px;
  }

  @media (max-height: 700px) {
    top: 96px;
    height: calc(100vh - 118px);
  }
`;

/** Track for links + sliding indicator (same role as `NavLinksContainer`) */
export const SidebarTrack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-height: 0;

  @media (max-width: 800px) {
    gap: 6px;
  }
`;

/** Animated group when questionnaire ↔ habit sidebar sets swap */
export const SidebarLinksGroup = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-height: 0;

  @media (max-width: 800px) {
    gap: 6px;
  }
`;

/** Sliding highlight — same motion and glass treatment as `NavIndicator`, vertical axis */
export const SidebarIndicator = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  background: ${({ theme }) => `${theme.primary}20`};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50px;
  transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}30`} inset,
    0 2px 8px ${({ theme }) => `${theme.primary}15`};
  z-index: 1;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/** Row styling mirrors ModernNavBar `NavLink` — color/weight only; pill fill is `SidebarIndicator` */
export const SidebarLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  letter-spacing: 0.3px;
  line-height: 1.35;
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.textSecondary};

  padding: 14px 20px;
  border-radius: 50px;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;

  z-index: 10;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 800px) {
    padding: 12px 18px;
    font-size: 0.9rem;
  }
`;

export const SidebarLinkLabel = styled.span`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  text-align: left;
`;

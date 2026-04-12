import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Smooth slide-in animation for navbar
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Modern glassmorphism navbar with sticky behavior
export const GlassNavBar = styled.nav<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  /* Use right to prevent covering scrollbar */
  right: 12px;
  z-index: 1000;
  padding: ${({ $isScrolled }) => ($isScrolled ? "16px 32px" : "24px 32px")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideDown} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none; /* Allow clicks to pass through except on interactive elements */
  box-sizing: border-box;

  /* Enhanced glassmorphism effect */
  background: ${({ theme, $isScrolled }) =>
    $isScrolled ? `${theme.glassBg}ee` : `${theme.glassBg}99`};
  backdrop-filter: blur(
    ${({ $isScrolled }) => ($isScrolled ? "24px" : "16px")}
  );
  -webkit-backdrop-filter: blur(
    ${({ $isScrolled }) => ($isScrolled ? "24px" : "16px")}
  );

  /* Border and shadow */
  border-bottom: 1px solid
    ${({ theme, $isScrolled }) =>
      $isScrolled ? theme.borderLight : "transparent"};
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled
      ? "0 4px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.08) inset"
      : "none"};

  @media (max-width: 968px) {
    padding: ${({ $isScrolled }) => ($isScrolled ? "12px 24px" : "20px 24px")};
  }

  @media (max-width: 768px) {
    padding: ${({ $isScrolled }) => ($isScrolled ? "10px 20px" : "16px 20px")};
  }

  @media (max-width: 480px) {
    padding: ${({ $isScrolled }) => ($isScrolled ? "8px 16px" : "12px 16px")};
  }
`;

// Container for navbar content with max width
export const NavContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  position: relative;
  pointer-events: auto; /* Re-enable pointer events for navbar content */

  @media (max-width: 968px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

// Wrapper for the pill-shaped nav links container
export const NavLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Pill-shaped container for navigation links (inspired by reference)
export const NavLinksContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: ${({ theme }) => theme.glassBg}cc;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.borderLight};
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  z-index: 100;

  @media (max-width: 968px) {
    gap: 2px;
    padding: 6px;
  }
`;

// Sliding indicator for active link - liquid glass effect
export const NavIndicator = styled.div<{
  $activeIndex: number;
  $linkCount: number;
}>`
  position: absolute;
  top: 8px;
  left: 8px;
  width: calc(
    (100% - 16px - ${({ $linkCount }) => ($linkCount - 1) * 4}px) /
      ${({ $linkCount }) => $linkCount}
  );
  height: calc(100% - 16px);
  background: ${({ theme }) => `${theme.primary}20`};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(
    calc(${({ $activeIndex }) => $activeIndex} * (100% + 4px))
  );
  box-shadow:
    0 0 0 1px ${({ theme }) => `${theme.primary}30`} inset,
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

  @media (max-width: 968px) {
    top: 6px;
    left: 6px;
    width: calc(
      (100% - 12px - ${({ $linkCount }) => ($linkCount - 1) * 2}px) /
        ${({ $linkCount }) => $linkCount}
    );
    height: calc(100% - 12px);
    transform: translateX(
      calc(${({ $activeIndex }) => $activeIndex} * (100% + 2px))
    );
  }
`;

// Individual navigation link with modern styling
export const NavLink = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background: transparent;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.textSecondary};
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;
  white-space: nowrap;
  line-height: 1;
  text-align: center;
  min-width: 0;

  /* Hover effect */
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 968px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.875rem;
  }
`;

// Right section: Support + theme toggle (outside scroll-spy pill)
export const NavRightSection = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

/* Matches footer Support + welcome Login outline: pill, cyan border, calm hover */
export const NavSupportLink = styled(Link)`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 9999px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;
  pointer-events: auto;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    min-height: 38px;
    font-size: 0.8125rem;
    padding: 0 14px;
  }

  @media (max-width: 480px) {
    min-height: 36px;
    padding: 0 12px;
  }
`;

/* Pill shell aligned with NavSupportLink (outline, same height, hover) */
export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 2px;
  border-radius: 9999px;
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  transition:
    border-color 0.25s ease,
    background 0.25s ease;

  @media (max-width: 768px) {
    min-height: 38px;
  }

  @media (max-width: 480px) {
    min-height: 36px;
  }

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -40px;
    right: 0;
    background: ${({ theme }) => theme.glassBg}ee;
    backdrop-filter: blur(16px);
    color: ${({ theme }) => theme.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border: 1px solid ${({ theme }) => theme.borderLight};
    pointer-events: none;
    z-index: 1000;
  }
`;

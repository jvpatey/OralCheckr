import styled, { keyframes } from "styled-components";

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
  right: 0;
  z-index: 1000;
  padding: ${({ $isScrolled }) => ($isScrolled ? "16px 32px" : "24px 32px")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideDown} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none; /* Allow clicks to pass through except on interactive elements */

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
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: ${({ theme }) => theme.glassBg}cc;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.borderLight};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  z-index: 100;

  @media (max-width: 968px) {
    gap: 2px;
    padding: 6px;
  }
`;

// Individual navigation link with modern styling
export const NavLink = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $isActive }) =>
    $isActive ? `${theme.primary}20` : "transparent"};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.textSecondary};
  border: none;
  padding: 10px 24px;
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

  /* Hover effect */
  &:hover {
    background: ${({ theme, $isActive }) =>
      $isActive ? `${theme.primary}25` : `${theme.glassBg}aa`};
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 968px) {
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.875rem;
  }
`;

// Right section for theme toggle and other actions
export const NavRightSection = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

// Theme toggle wrapper with enhanced glassmorphism
export const TooltipWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Modern glassmorphism button styling */
  background: ${({ theme }) => theme.glassBg}cc;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  padding: 10px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.borderLight};

  /* Enhanced shadow */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 8px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 7px;
    border-radius: 8px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    border-color: ${({ theme }) => theme.primary}60;
  }

  &:active {
    transform: translateY(0);
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

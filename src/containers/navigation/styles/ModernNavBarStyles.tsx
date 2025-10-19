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

// Modern glassmorphism navbar matching welcome page
export const ModernNavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  padding: 20px 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideDown} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;

  /* Enhanced glassmorphism effect - more transparent and fluid */
  background: ${({ theme }) => theme.glassBg}aa;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* No bottom border for fluid effect */
  border-bottom: none;
  box-shadow: none;

  @media (max-width: 968px) {
    padding: 16px 24px;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`;

// Container for navbar content with max width
export const NavContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  position: relative;
  pointer-events: auto;

  @media (max-width: 968px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

// Brand/Logo section (left side) - equal width to right for centering
export const NavBrandSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-shrink: 0;
`;

// Brand text with gradient matching welcome page
export const BrandText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Enhanced gradient text effect */
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    letter-spacing: -0.75px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: -0.5px;
  }
`;

// Center section for pill-shaped nav links
export const NavCenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1199px) {
    display: none;
  }
`;

// Pill-shaped container for navigation links - more fluid
export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: ${({ theme }) => theme.glassBg}99;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.borderLight}60;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  z-index: 100;

  @media (max-width: 968px) {
    gap: 2px;
    padding: 6px;
  }
`;

// Individual navigation link
export const NavLink = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
`;

// Avatar image in nav link
export const NavAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${NavLink}:hover & {
    transform: scale(1.1);
    box-shadow: 0 0 12px ${({ theme }) => theme.primary}40;
  }
`;

// Right section for theme toggle and mobile menu - equal width to left for centering
export const NavRightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex: 1;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

// Theme toggle wrapper - minimal, no double border
export const ThemeToggleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Mobile menu button wrapper - shows when right nav pills hide
export const MobileMenuWrapper = styled.div`
  display: none;

  @media (max-width: 1199px) {
    display: flex;
    align-items: center;
  }
`;

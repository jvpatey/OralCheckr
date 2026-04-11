import styled from "styled-components";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "../../../common/links";
import { ThemeToggle } from "./ThemeToggle";
import React from "react";

// Props for desktop menu component
interface DesktopMenuProps {
  links: NavLink[];
  isActive: (href: string) => boolean;
  handleLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isGuest?: boolean;
  onCreateAccount: () => void;
  userAvatar?: string;
  userFirstName?: string;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

// Modern navbar collapse with glassmorphism
const CustomCollapse = styled(Navbar.Collapse)`
  background: transparent;

  @media (max-width: 768px) {
    position: absolute;
    top: 56px;
    right: 0;
    width: 100%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 1rem;
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    border-radius: 16px;
    margin-top: 8px;
    border: 1px solid ${({ theme }) => theme.borderLight};
    box-shadow: ${({ theme }) => theme.shadowLg};
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

// Styled nav container
const StyledNav = styled(Nav)`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

// Modern 2025-style nav links with clean styling
const CustomNavLink = styled(Nav.Link)<{ $isProfileWithName?: boolean }>`
  color: ${({ theme, $isProfileWithName }) =>
    $isProfileWithName ? theme.primary : theme.textSecondary};
  margin-right: 8px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.25px;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 12px 20px;
  border-radius: 16px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  border: 1px solid transparent;
  background: transparent;

  /* Simple hover effect - no background */
  &:hover {
    color: ${({ theme, $isProfileWithName }) =>
      $isProfileWithName ? theme.primaryDark : theme.textPrimary};
    text-decoration: none;
    transform: translateY(-1px);
  }

  /* Active state - minimal styling */
  &.active {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }

  /* Special styling for profile with name - no default background */
  ${({ $isProfileWithName }) =>
    $isProfileWithName &&
    `
    &:hover {
      color: ${({ theme }: { theme: any }) => theme.primaryDark};
    }
  `}
`;

// User avatar image styling with glassmorphism
const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  top: -1px;
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 1px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  margin-right: 10px;
  box-shadow: ${({ theme }) => theme.shadowSm},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 15px ${({ theme }) => theme.glowColor},
      0 0 0 1px ${({ theme }) => theme.primary}40 inset;
  }
`;

// Icon container for desktop nav items with glassmorphism
const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.borderLight};
  color: ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 15px ${({ theme }) => theme.glowColor};
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

// Create account button with tooltip
const CreateAccountButton = styled.button`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.backgroundColor};
  border: none;
  padding: 3px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 20px;
  transition: all 0.4s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;

  @media (min-width: 768px) {
    align-self: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 10px 20px;
  }

  &::after {
    content: "If you create a new account, your questionnaire and habit tracking data will be moved to your new account";
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textGrey};
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: normal;
    width: max-content;
    max-width: 250px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => `${theme.textGrey}25`};
    z-index: 1000;

    @media (max-width: 768px) {
      left: auto;
      right: 0;
      transform: none;
      top: 100%;
      margin-top: 5px;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.green};
    color: ${({ theme }) => theme.backgroundColor};
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);

    &::after {
      opacity: 1;
      visibility: visible;
    }
  }
`;

// Navbar links component for desktop view (non-mobile)
export function DesktopMenu({
  links,
  isActive,
  handleLogout,
  isGuest = false,
  onCreateAccount,
  userAvatar,
  userFirstName,
  isDarkMode,
  toggleDarkMode,
}: DesktopMenuProps) {
  return (
    <CustomCollapse id="basic-navbar-nav">
      <StyledNav className="ms-auto d-none d-lg-flex">
        {links.map((link) => (
          <CustomNavLink
            key={link.path}
            className={isActive(link.path) ? "active" : ""}
            as={Link}
            to={link.path === "/" ? "/" : link.path}
            onClick={link.name === "Log Out" ? handleLogout : undefined}
            $isProfileWithName={link.name === "Profile" && !!userFirstName}
          >
            {link.name === "Profile" && userFirstName ? (
              <>
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt="Profile" />
                ) : (
                  <IconContainer>
                    <FontAwesomeIcon icon={link.icon} />
                  </IconContainer>
                )}
                {userFirstName}
              </>
            ) : (
              link.name
            )}
          </CustomNavLink>
        ))}
        {isGuest && (
          <CreateAccountButton onClick={onCreateAccount}>
            Create Account
          </CreateAccountButton>
        )}

        {isDarkMode !== undefined && toggleDarkMode && (
          <ThemeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </StyledNav>
    </CustomCollapse>
  );
}

import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { NavLink } from "../../../common/links";

// Props for mobile menu component
interface MobileMenuProps {
  links: NavLink[];
  isActive: (href: string) => boolean;
  handleLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isGuest?: boolean;
  onCreateAccount: () => void;
  userAvatar?: string;
  userFirstName?: string;
}

// Styled dropdown toggle button with glassmorphism
const CustomDropdownToggle = styled(Dropdown.Toggle)`
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  padding: 8px 12px;
  margin-right: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowSm};
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
    background: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.primary}40;
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 15px ${({ theme }) => theme.glowColor};
  }

  &:focus,
  &:active {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.primary}60;
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &.show {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.primary}60;
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 15px ${({ theme }) => theme.glowColor};
  }
`;

// Styled dropdown menu container with glassmorphism
const CustomDropdownMenu = styled(Dropdown.Menu)`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset,
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  width: 220px;
  padding: 8px;
  margin-top: 8px;
`;

// Styled dropdown menu items with glassmorphism
const CustomDropdownItem = styled(Dropdown.Item)<{
  $isProfileWithName?: boolean;
}>`
  color: ${({ theme, $isProfileWithName }) =>
    $isProfileWithName ? theme.primary : theme.textSecondary};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  border-radius: 12px;
  margin: 2px 0;
  border: 1px solid transparent;
  background: transparent;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: ${({ theme, $isProfileWithName }) =>
      $isProfileWithName ? theme.primaryDark : theme.textPrimary};
    background: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.borderLight};
    box-shadow: ${({ theme }) => theme.shadowSm},
      0 0 0 1px ${({ theme }) => theme.borderLight} inset;
    transform: translateX(4px);
  }

  &.active {
    color: ${({ theme, $isProfileWithName }) =>
      $isProfileWithName ? theme.primary : theme.primary};
    background: ${({ theme }) => theme.glassBg};
    border-color: ${({ theme }) => theme.primary}40;
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 15px ${({ theme }) => theme.glowColor},
      0 0 0 1px ${({ theme }) => theme.primary}20 inset;
  }

  /* Special styling for profile with name - only background on hover/active */
  ${({ $isProfileWithName }) =>
    $isProfileWithName &&
    `
    &:hover {
      border-color: ${({ theme }: { theme: any }) => theme.primary}60;
      box-shadow: ${({ theme }: { theme: any }) => theme.shadowLg},
        0 0 20px ${({ theme }: { theme: any }) => theme.glowColor},
        0 0 0 1px ${({ theme }: { theme: any }) => theme.primary}30 inset;
    }
  `}
`;

// Icon container for menu items with glassmorphism
const Icon = styled.span`
  width: 28px;
  height: 28px;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// User avatar image styling with glassmorphism
const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 1px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: ${({ theme }) => theme.shadowSm},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Navbar links component for mobile view (dropdown menu)
export function MobileMenu({
  links,
  isActive,
  handleLogout,
  isGuest = false,
  onCreateAccount,
  userAvatar,
  userFirstName,
}: MobileMenuProps) {
  return (
    <Dropdown>
      <CustomDropdownToggle id="dropdown-basic">
        <FontAwesomeIcon icon={faBars} />
      </CustomDropdownToggle>
      <CustomDropdownMenu align="end">
        {isGuest && (
          <CustomDropdownItem onClick={onCreateAccount}>
            <Icon>
              <FontAwesomeIcon icon={faPlus} />
            </Icon>
            Create Account
          </CustomDropdownItem>
        )}
        {links.map((link) => (
          <CustomDropdownItem
            key={link.path}
            className={isActive(link.path) ? "active" : ""}
            as={Link}
            to={link.path === "/" ? "/" : link.path}
            onClick={link.name === "Log Out" ? handleLogout : undefined}
            $isProfileWithName={link.name === "Profile" && !!userFirstName}
          >
            <Icon>
              {link.name === "Profile" ? (
                userAvatar ? (
                  <AvatarImage src={userAvatar} alt="Profile" />
                ) : (
                  <FontAwesomeIcon icon={link.icon} />
                )
              ) : (
                <FontAwesomeIcon icon={link.icon} />
              )}
            </Icon>
            {link.name === "Profile" && userFirstName
              ? userFirstName
              : link.name}
          </CustomDropdownItem>
        ))}
      </CustomDropdownMenu>
    </Dropdown>
  );
}

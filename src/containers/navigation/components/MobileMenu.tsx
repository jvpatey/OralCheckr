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

// Styled dropdown toggle button
const CustomDropdownToggle = styled(Dropdown.Toggle)`
  color: ${({ theme }) => theme.textGrey};
  background: none;
  border: none;
  margin-right: 20px;

  &:hover {
    color: ${({ theme }) => theme.blue};
    transform: scale(1.1);
    background-color: transparent;
  }

  &:focus,
  &:active {
    color: ${({ theme }) => theme.textGrey};
    background-color: transparent;
    box-shadow: none;
  }

  &.show {
    color: ${({ theme }) => theme.textGrey};
    background-color: transparent;
    transform: scale(1.1);
  }
`;

// Styled dropdown menu container
const CustomDropdownMenu = styled(Dropdown.Menu)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
`;

// Styled dropdown menu items
const CustomDropdownItem = styled(Dropdown.Item)<{ $isProfileWithName?: boolean }>`
  color: ${({ theme, $isProfileWithName }) => 
    $isProfileWithName ? theme.primary : theme.textGrey};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  border-radius: 0;

  &:hover {
    color: ${({ theme, $isProfileWithName }) => 
      $isProfileWithName ? theme.primaryDark : theme.textGrey};
    background-color: ${({ theme, $isProfileWithName }) => 
      $isProfileWithName ? `${theme.primary}15` : `${theme.blue}10`};
  }

  &.active {
    color: ${({ theme, $isProfileWithName }) => 
      $isProfileWithName ? theme.primary : theme.textGrey};
    background-color: ${({ theme, $isProfileWithName }) => 
      $isProfileWithName ? `${theme.primary}20` : `${theme.blue}15`};
  }
`;

// Icon container for menu items
const Icon = styled.span`
  width: 24px;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// User avatar image styling
const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: contain;
  border: 2px solid ${({ theme }) => theme.blue};
  padding: 2px;
  background: ${({ theme }) => theme.backgroundColor};
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
    <Dropdown className="ms-auto d-lg-none">
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

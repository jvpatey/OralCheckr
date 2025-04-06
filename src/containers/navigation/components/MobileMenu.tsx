import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { NavLink } from "../../../common/links";

interface MobileMenuProps {
  links: NavLink[];
  isActive: (href: string) => boolean;
  handleLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isGuest?: boolean;
  onCreateAccount: () => void;
  userAvatar?: string;
}

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

const CustomDropdownMenu = styled(Dropdown.Menu)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
`;

const CustomDropdownItem = styled(Dropdown.Item)`
  color: ${({ theme }) => theme.textGrey};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  border-radius: 0;

  &:hover {
    color: ${({ theme }) => theme.textGrey};
    background-color: ${({ theme }) => `${theme.blue}10`};
  }

  &.active {
    color: ${({ theme }) => theme.textGrey};
    background-color: ${({ theme }) => `${theme.blue}15`};
  }
`;

const Icon = styled.span`
  width: 24px;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: contain;
  border: 2px solid ${({ theme }) => theme.blue};
  padding: 2px;
  background: ${({ theme }) => theme.backgroundColor};
`;

export function MobileMenu({
  links,
  isActive,
  handleLogout,
  isGuest = false,
  onCreateAccount,
  userAvatar,
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
            {link.name}
          </CustomDropdownItem>
        ))}
      </CustomDropdownMenu>
    </Dropdown>
  );
}

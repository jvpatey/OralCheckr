import styled from "styled-components";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NavLink } from "../../../common/links";
import React from "react";

interface DesktopMenuProps {
  links: NavLink[];
  isActive: (href: string) => boolean;
  handleLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isGuest?: boolean;
  onCreateAccount: () => void;
  userAvatar?: string;
}

const CustomCollapse = styled(Navbar.Collapse)`
  background-color: ${({ theme }) => theme.backgroundColor};

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
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const StyledNav = styled(Nav)`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const CustomNavLink = styled(Nav.Link)`
  color: ${({ theme }) => theme.textGrey};
  margin-right: 35px;
  font-size: large;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 8px 0;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }

  &.active {
    color: ${({ theme }) => theme.textGrey};
    background-color: transparent;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.blue};
    }
  }
`;

const Icon = styled.span`
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 1.2em;
`;

const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: contain;
  position: relative;
  top: -1px;
`;

const CreateAccountButton = styled.button`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.backgroundColor};
  border: none;
  padding: 3px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 20px;

  @media (min-width: 768px) {
    align-self: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 10px 20px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.backgroundColor};
  }
`;

export function DesktopMenu({
  links,
  isActive,
  handleLogout,
  isGuest = false,
  onCreateAccount,
  userAvatar,
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
          >
            <Icon>
              {link.name === "Profile" ? (
                userAvatar ? (
                  <AvatarImage src={userAvatar} alt="Profile" />
                ) : (
                  <FontAwesomeIcon icon={link.icon} size="xl" />
                )
              ) : (
                <FontAwesomeIcon icon={link.icon} />
              )}
            </Icon>
            {link.name}
          </CustomNavLink>
        ))}
        {isGuest && (
          <CreateAccountButton onClick={onCreateAccount}>
            Create Account
          </CreateAccountButton>
        )}
      </StyledNav>
    </CustomCollapse>
  );
}

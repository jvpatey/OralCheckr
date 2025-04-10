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
  font-size: 1rem;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 8px 0;
  position: relative;
  transition: color 0.4s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease-out;
    background-color: ${({ theme }) => theme.green};
  }

  &:hover {
    color: ${({ theme }) => theme.green};
    text-decoration: none;

    &::after {
      transform: scaleX(1);
    }
  }

  &.active {
    color: ${({ theme }) => theme.blue};

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.blue};
      transform: scaleX(1);
    }
  }
`;

const Icon = styled.span`
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 1em;
`;

const AvatarImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: contain;
  position: relative;
  top: -1px;
  border: 2px solid ${({ theme }) => theme.blue};
  padding: 2px;
  background: ${({ theme }) => theme.backgroundColor};
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
                  <FontAwesomeIcon icon={link.icon} />
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

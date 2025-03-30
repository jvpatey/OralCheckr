import styled from "styled-components";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NavLink } from "../../../common/links";
import { ProfileNavLink } from "./ProfileNavLink";

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

const CustomNavLink = styled(Nav.Link)`
  color: ${({ theme }) => theme.textGrey};
  margin-right: 35px;
  font-size: large;

  &:hover {
    color: ${({ theme }) => theme.blue};
    transform: scale(1.05);
  }

  &.active {
    color: ${({ theme }) => theme.blue};
    font-weight: bold;
    transform: scale(1.1);
    background-color: transparent;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
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
      <Nav className="ms-auto d-none d-lg-flex">
        {links.map((link) => {
          if (link.name === "Profile") {
            return (
              <ProfileNavLink
                key={link.path}
                isActive={isActive(link.path)}
                avatar={userAvatar}
              />
            );
          }
          return (
            <CustomNavLink
              key={link.path}
              className={isActive(link.path) ? "active" : ""}
              as={Link}
              to={link.path === "/" ? "/" : link.path}
              onClick={link.name === "Log Out" ? handleLogout : undefined}
            >
              <Icon>
                <FontAwesomeIcon icon={link.icon} />
              </Icon>
              {link.name}
            </CustomNavLink>
          );
        })}
        {isGuest && (
          <CreateAccountButton onClick={onCreateAccount}>
            Create Account
          </CreateAccountButton>
        )}
      </Nav>
    </CustomCollapse>
  );
}

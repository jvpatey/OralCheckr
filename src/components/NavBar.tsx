import styled, { keyframes } from "styled-components";
import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths, getFullPath } from "../common/Routes";

interface NavBarProps {
  links: { text: string; href: string; icon: any }[];
}

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const CustomNavbar = styled(Navbar)`
  background-color: #f5f5f5;
  width: 100%;
  animation: ${fadeInDown} 1s ease-out;
`;

const BrandText = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  font-size: x-large;
  color: #222831;
`;

const LogoImage = styled.img`
  height: 45px;
`;

const DropdownIcon = styled.div`
  color: #222831;
  cursor: pointer;

  &:hover {
    color: #0375b4;
    transform: scale(1.25);
  }
`;

const CustomCollapse = styled(Navbar.Collapse)`
  background-color: #f5f5f5;

  @media (max-width: 992px) {
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

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const CustomNavLink = styled(Nav.Link)`
  color: #222831;
  margin-right: 35px;

  &:hover {
    color: #07889b;
    transform: scale(1.05);
  }

  &.active {
    color: #07889b;
    font-weight: bold;
    transform: scale(1.1);
    background-color: transparent !important;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
`;

export function NavBar({ links }: NavBarProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const isHabitTrackerActive =
    location.pathname.includes(RoutePaths.HABITS) ||
    location.pathname.includes(RoutePaths.CALENDAR) ||
    location.pathname.includes(RoutePaths.ANALYTICS);

  const handleLogout = () => {
    localStorage.setItem("authenticated", "false");
  };

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (href: string) =>
    location.pathname === href ||
    (isHabitTrackerActive &&
      (href.includes(RoutePaths.HABITS) ||
        href.includes(RoutePaths.CALENDAR) ||
        href.includes(RoutePaths.ANALYTICS)));

  return (
    <CustomNavbar expand="lg" fixed="top">
      <Container fluid>
        <BrandText as={Link} to={getFullPath(RoutePaths.DASHBOARD)}>
          <LogoImage src="/OralCheckr/images/logo2.png" alt="Logo" />
          OralCheckr
        </BrandText>
        <Dropdown className="ms-auto d-lg-none">
          <DropdownIcon>
            <Dropdown.Toggle as="span" id="dropdown-basic">
              <FontAwesomeIcon icon={faBars} />
            </Dropdown.Toggle>
          </DropdownIcon>

          <Dropdown.Menu align="end">
            {links.map((link) => (
              <Dropdown.Item
                key={link.href}
                className={isActive(link.href) ? "active" : ""}
                as={Link}
                to={
                  link.href === getFullPath(RoutePaths.LOGIN) ? "/" : link.href
                }
                onClick={
                  link.href === getFullPath(RoutePaths.LOGIN)
                    ? handleLogout
                    : undefined
                }
              >
                <Icon>
                  <FontAwesomeIcon icon={link.icon} />
                </Icon>
                {link.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <CustomCollapse id="basic-navbar-nav">
          <Nav className="ms-auto d-none d-lg-flex">
            {links.map((link) => (
              <CustomNavLink
                key={link.href}
                className={isActive(link.href) ? "active" : ""}
                as={Link}
                to={link.href}
                onClick={
                  link.href === getFullPath(RoutePaths.LOGIN)
                    ? handleLogout
                    : undefined
                }
              >
                <Icon>
                  <FontAwesomeIcon icon={link.icon} />
                </Icon>
                {link.text}
              </CustomNavLink>
            ))}
          </Nav>
        </CustomCollapse>
      </Container>
    </CustomNavbar>
  );
}

import styled, { keyframes } from "styled-components";
import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths, getFullPath } from "../common/constants/routes";
import { colors } from "../common/utilities/color-utils";
import { NavLink } from "../common/links";

interface NavBarProps {
  links: NavLink[];
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
  background-color: ${colors.bgWhite};
  width: 100%;
  animation: ${fadeInDown} 1s ease-out;

  @media (max-width: 768px) {
    .d-lg-none {
      display: block;
    }
    .d-lg-flex {
      display: none;
    }
  }
`;

const BrandText = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  font-size: 28px;
  color: ${colors.textGrey};

  &:hover {
    color: ${colors.blue};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 0;
  }

  @media (max-width: 768px) {
    &::after {
      content: "";
      display: block;
      height: 45px;
    }
  }
`;

const LogoImage = styled.img`
  height: 45px;
  margin-bottom: 5px;
`;

const CustomDropdownToggle = styled(Dropdown.Toggle)`
  color: ${colors.textGrey};
  background: none;
  border: none;

  &:hover {
    color: ${colors.blue};
    transform: scale(1.1);
    background-color: transparent;
  }

  &:focus,
  &:active {
    color: ${colors.textGrey};
    background-color: transparent;
    box-shadow: none;
  }

  &.show {
    color: ${colors.textGrey};
    background-color: transparent;
    transform: scale(1.1);
  }
`;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  background-color: ${colors.bgWhite};
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
`;

const CustomDropdownItem = styled(Dropdown.Item)`
  color: ${colors.textGrey};
  padding: 10px 20px;
  display: block;
  width: 100%;
  text-align: left;

  &:hover {
    color: ${colors.blue};
    background-color: transparent;
  }

  &.active {
    color: ${colors.blue};
    font-weight: bold;
  }
`;

const CustomCollapse = styled(Navbar.Collapse)`
  background-color: ${colors.bgWhite};

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
  color: ${colors.textGrey};
  margin-right: 35px;
  font-size: large;

  &:hover {
    color: ${colors.blue};
    transform: scale(1.05);
  }

  &.active {
    color: ${colors.blue};
    font-weight: bold;
    transform: scale(1.1);
    background-color: transparent;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
`;

// Functional component to render the Navbar - used on all pages
export function NavBar({ links }: NavBarProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  const isActive = (href: string) => {
    const isQuestionnaireActive =
      location.pathname.startsWith(getFullPath(RoutePaths.QUESTIONNAIRE)) ||
      location.pathname.startsWith(getFullPath(RoutePaths.RESULTS));

    const isHabitTrackerActive =
      location.pathname.startsWith(getFullPath(RoutePaths.HABITS)) ||
      location.pathname.startsWith(getFullPath(RoutePaths.ANALYTICS));

    return (
      location.pathname === href ||
      (isHabitTrackerActive &&
        (href.includes(RoutePaths.HABITS) ||
          href.includes(RoutePaths.ANALYTICS))) ||
      (isQuestionnaireActive &&
        (href.includes(RoutePaths.QUESTIONNAIRE) ||
          href.includes(RoutePaths.RESULTS)))
    );
  };

  const handleLogout = () => {
    localStorage.setItem("authenticated", "false");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <CustomNavbar expand="lg" fixed="top">
      <Container fluid>
        <BrandText as={Link} to={getFullPath(RoutePaths.LANDING)}>
          <LogoImage src="/OralCheckr/images/logo-blue.png" alt="Logo" />
          OralCheckr
        </BrandText>
        <Dropdown className="ms-auto d-lg-none">
          <CustomDropdownToggle id="dropdown-basic">
            <FontAwesomeIcon icon={faBars} />
          </CustomDropdownToggle>

          <CustomDropdownMenu align="end">
            {links.map((link) => (
              <CustomDropdownItem
                key={link.path}
                className={isActive(link.path) ? "active" : ""}
                as={Link}
                to={
                  link.path === getFullPath(RoutePaths.LOGIN) ? "/" : link.path
                }
                onClick={
                  link.path === getFullPath(RoutePaths.LOGIN)
                    ? handleLogout
                    : undefined
                }
              >
                <Icon>
                  <FontAwesomeIcon icon={link.icon} />
                </Icon>
                {link.name}
              </CustomDropdownItem>
            ))}
          </CustomDropdownMenu>
        </Dropdown>
        <CustomCollapse id="basic-navbar-nav">
          <Nav className="ms-auto d-none d-lg-flex">
            {links.map((link) => (
              <CustomNavLink
                key={link.path}
                className={isActive(link.path) ? "active" : ""}
                as={Link}
                to={link.path}
                onClick={
                  link.path === getFullPath(RoutePaths.LOGIN)
                    ? handleLogout
                    : undefined
                }
              >
                <Icon>
                  <FontAwesomeIcon icon={link.icon} />
                </Icon>
                {link.name}
              </CustomNavLink>
            ))}
          </Nav>
        </CustomCollapse>
      </Container>
    </CustomNavbar>
  );
}

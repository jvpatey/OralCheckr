import styled, { keyframes, useTheme } from "styled-components";
import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "../common/constants/routes";
import { NavLink } from "../common/links";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeType } from "../App";

interface NavBarProps {
  links: NavLink[];
  themeToggler: () => void;
  theme: ThemeType;
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
  background-color: ${({ theme }) => theme.backgroundColor};
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
  color: ${({ theme }) => theme.textGrey};

  &:hover {
    color: ${({ theme }) => theme.blue};
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
`;

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
  padding: 10px 20px;
  display: block;
  width: 100%;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.blue};
    background-color: transparent;
  }

  &.active {
    color: ${({ theme }) => theme.blue};
    font-weight: bold;
  }
`;

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

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    right: 10px;
    top: 20px;
    z-index: 10;
  }
`;

// Functional component to render the Navbar
export function NavBar({ links, themeToggler, theme }: NavBarProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const themeContext = useTheme();
  const isDarkMode = theme === ThemeType.DARK;

  // Handle the toggle for dark mode
  const toggleDarkMode = () => {
    themeToggler();
    localStorage.setItem(
      "theme",
      isDarkMode ? ThemeType.LIGHT : ThemeType.DARK
    );
  };

  // Handle logout logic
  const handleLogout = () => {
    // clear authentication data on logout
    localStorage.removeItem("authenticated");
    localStorage.removeItem("user");

    if (isDarkMode) {
      toggleDarkMode(); // Toggle dark mode back to light when logging out
    }
  };

  const isActive = (href: string) => {
    const currentPath = location.pathname + location.hash.replace("#", "");
    return currentPath === href;
  };

  // Return null if the user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <CustomNavbar expand="lg" fixed="top">
      <Container fluid>
        <BrandText as={Link} to={RoutePaths.LANDING}>
          <LogoImage src="images/logo-blue.png" alt="Logo" />
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
                to={link.path === "/" ? "/" : link.path}
                onClick={link.name === "Log Out" ? handleLogout : undefined}
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
                to={link.path === "/" ? "/" : link.path}
                onClick={link.name === "Log Out" ? handleLogout : undefined}
              >
                <Icon>
                  <FontAwesomeIcon icon={link.icon} />
                </Icon>
                {link.name}
              </CustomNavLink>
            ))}
          </Nav>
        </CustomCollapse>
        <ThemeToggleContainer>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
            moonColor={themeContext.blue}
            sunColor={themeContext.blue}
          />
        </ThemeToggleContainer>
      </Container>
    </CustomNavbar>
  );
}

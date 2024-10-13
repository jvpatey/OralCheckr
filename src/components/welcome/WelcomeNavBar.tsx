import styled, { keyframes, useTheme } from "styled-components";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../common/constants/routes";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeType } from "../../App";

interface WelcomeNavBarProps {
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

const WelcomeNavbar = styled(Navbar)`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  width: 100%;
  animation: ${fadeInDown} 1s ease-out;
  padding: 10px 0;
`;

const CustomNavLink = styled(Nav.Link)`
  color: ${({ theme }) => theme.textGrey};
  margin-left: 20px;
  font-size: 1rem;

  &:hover {
    color: ${({ theme }) => theme.blue};
    font-weight: bold;
  }

  &.active {
    color: ${({ theme }) => theme.blue};
    font-weight: bold;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export function WelcomeNavBar({ themeToggler, theme }: WelcomeNavBarProps) {
  const themeContext = useTheme();
  const isDarkMode = theme === ThemeType.DARK;

  const toggleDarkMode = () => {
    themeToggler();
    localStorage.setItem("theme", isDarkMode ? ThemeType.LIGHT : ThemeType.DARK);
  };

  return (
    <WelcomeNavbar expand="lg">
      <Container>
        <NavContainer>
          <Nav>
            <CustomNavLink as={Link} to={RoutePaths.LOGIN}>
              Login
            </CustomNavLink>
            <CustomNavLink as={Link} to={RoutePaths.LOGIN}>
              Sign Up
            </CustomNavLink>
          </Nav>
          <ThemeToggleContainer>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={20}
              moonColor={themeContext.blue}
              sunColor={themeContext.blue}
            />
          </ThemeToggleContainer>
        </NavContainer>
      </Container>
    </WelcomeNavbar>
  );
}

import styled, { keyframes, useTheme } from "styled-components";
import { Navbar, Container } from "react-bootstrap";
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

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-wrap: nowrap;

  @media (max-width: 576px) {
    justify-content: flex-end;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 576px) {
    flex-wrap: nowrap;
    gap: 10px;
  }
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
    localStorage.setItem(
      "theme",
      isDarkMode ? ThemeType.LIGHT : ThemeType.DARK
    );
  };

  return (
    <>
      <WelcomeNavbar expand="lg">
        <Container>
          <NavContainer>
            <LinksWrapper></LinksWrapper>
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
    </>
  );
}

import styled from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "styled-components";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

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

export function ThemeToggle({ isDarkMode, toggleDarkMode }: ThemeToggleProps) {
  const theme = useTheme();

  return (
    <ThemeToggleContainer>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={20}
        moonColor={theme.blue}
        sunColor={theme.blue}
      />
    </ThemeToggleContainer>
  );
}

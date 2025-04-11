import styled from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "styled-components";

// Props for theme toggle component
interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Container for theme toggle with responsive positioning
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

// Theme toggle switch component
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

import styled from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "styled-components";

// Props for theme toggle component
interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Compact theme toggle with subtle styling
const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
  background: ${({ theme }) => theme.textSecondary}05;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.textSecondary}10;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 10;
    padding: 4px;
  }
`;

// Compact theme toggle switch component
export function ThemeToggle({ isDarkMode, toggleDarkMode }: ThemeToggleProps) {
  const theme = useTheme();

  return (
    <ThemeToggleContainer>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={18}
        moonColor={theme.textSecondary}
        sunColor={theme.textSecondary}
      />
    </ThemeToggleContainer>
  );
}

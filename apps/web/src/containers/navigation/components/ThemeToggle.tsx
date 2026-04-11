import styled from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "styled-components";

// Props for theme toggle component
interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Compact theme toggle with glassmorphism styling
const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.borderLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowSm};

  &:hover {
    background: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.primary}40;
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 15px ${({ theme }) => theme.glowColor};
  }

  @media (max-width: 991px) {
    position: relative;
    margin-right: 0;
    flex-shrink: 0;
  }

  @media (min-width: 992px) {
    margin-left: 8px;
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

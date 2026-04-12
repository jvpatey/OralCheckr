import styled from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "styled-components";

// Props for theme toggle component
interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Full hit target — entire control is one button; icon is visual only
const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.borderLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowSm};
  cursor: pointer;
  font: inherit;
  color: inherit;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.primary}40;
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowMd},
      0 0 15px ${({ theme }) => theme.glowColor};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 991px) {
    position: relative;
    margin-right: 0;
  }

  @media (min-width: 992px) {
    margin-left: 8px;
  }
`;

const IconSlot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  line-height: 0;
`;

// Compact theme toggle switch component
export function ThemeToggle({ isDarkMode, toggleDarkMode }: ThemeToggleProps) {
  const theme = useTheme();

  return (
    <ThemeToggleButton
      type="button"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      onClick={toggleDarkMode}
    >
      <IconSlot aria-hidden>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={() => {}}
          size={18}
          moonColor={theme.textSecondary}
          sunColor={theme.textSecondary}
        />
      </IconSlot>
    </ThemeToggleButton>
  );
}

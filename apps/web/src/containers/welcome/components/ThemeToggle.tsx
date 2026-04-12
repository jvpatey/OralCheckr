import { useTheme } from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeType } from "../../../App";
import styled from "styled-components";
import { useState } from "react";

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  padding: 0 12px;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
  border-radius: 9999px;
  box-sizing: border-box;
  transition: color 0.25s ease;

  @media (max-width: 768px) {
    min-height: 38px;
    min-width: 38px;
    padding: 0 11px;
  }

  @media (max-width: 480px) {
    min-height: 36px;
    min-width: 36px;
    padding: 0 10px;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

const IconSlot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  line-height: 0;
`;

interface ThemeToggleProps {
  themeToggler: () => void;
  theme: ThemeType;
}

export function ThemeToggle({ themeToggler, theme }: ThemeToggleProps) {
  const themeContext = useTheme();
  const isDarkMode = theme === ThemeType.DARK;
  const [isHovered, setIsHovered] = useState(false);

  const toggleDarkMode = () => {
    themeToggler();
    localStorage.setItem(
      "theme",
      isDarkMode ? ThemeType.LIGHT : ThemeType.DARK
    );
  };

  return (
    <ToggleButton
      type="button"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      onClick={toggleDarkMode}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconSlot aria-hidden>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={() => {}}
          size={18}
          moonColor={
            isHovered ? themeContext.primary : themeContext.textSecondary
          }
          sunColor={
            isHovered ? themeContext.primary : themeContext.textSecondary
          }
        />
      </IconSlot>
    </ToggleButton>
  );
}

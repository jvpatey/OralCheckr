import { useTheme } from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeType } from "../../../App";
import styled from "styled-components";
import { useState } from "react";

const ToggleWrapper = styled.div`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
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
    <ToggleWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={18}
        moonColor={
          isHovered ? themeContext.primary : themeContext.textSecondary
        }
        sunColor={isHovered ? themeContext.primary : themeContext.textSecondary}
      />
    </ToggleWrapper>
  );
}

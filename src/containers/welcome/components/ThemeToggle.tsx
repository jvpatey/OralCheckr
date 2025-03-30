import { useTheme } from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeType } from "../../../App";
import styled from "styled-components";
import { useState } from "react";

const ToggleWrapper = styled.div`
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    transform: translateY(-2px);
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
        size={24}
        moonColor={isHovered ? themeContext.green : themeContext.blue}
        sunColor={isHovered ? themeContext.green : themeContext.blue}
      />
    </ToggleWrapper>
  );
}

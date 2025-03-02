import { useTheme } from "styled-components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeType } from "../../../App";

interface ThemeToggleProps {
  themeToggler: () => void;
  theme: ThemeType;
}

export function ThemeToggle({ themeToggler, theme }: ThemeToggleProps) {
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
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={20}
      moonColor={themeContext.blue}
      sunColor={themeContext.blue}
    />
  );
}

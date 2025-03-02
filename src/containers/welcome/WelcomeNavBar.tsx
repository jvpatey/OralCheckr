import { ThemeType } from "../../App";
import { ThemeToggleContainer } from "./styles/WelcomeNavBarStyles";
import { ThemeToggle } from "./components/ThemeToggle";

interface WelcomeNavBarProps {
  themeToggler: () => void;
  theme: ThemeType;
}

export function WelcomeNavBar({ themeToggler, theme }: WelcomeNavBarProps) {
  return (
    <ThemeToggleContainer>
      <ThemeToggle themeToggler={themeToggler} theme={theme} />
    </ThemeToggleContainer>
  );
}

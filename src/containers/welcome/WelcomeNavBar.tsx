import { ThemeType } from "../../App";
import {
  ThemeToggleContainer,
  NavLinksContainer,
  TooltipWrapper,
} from "./styles/WelcomeNavBarStyles";
import { ThemeToggle } from "./components/ThemeToggle";

// Props for welcome navigation bar
interface WelcomeNavBarProps {
  themeToggler: () => void;
  theme: ThemeType;
}

// Navigation bar with theme toggle only
export function WelcomeNavBar({ themeToggler, theme }: WelcomeNavBarProps) {
  return (
    <ThemeToggleContainer>
      <NavLinksContainer>
        <TooltipWrapper
          data-tooltip={theme === ThemeType.DARK ? "Light Mode" : "Dark Mode"}
        >
          <ThemeToggle themeToggler={themeToggler} theme={theme} />
        </TooltipWrapper>
      </NavLinksContainer>
    </ThemeToggleContainer>
  );
}

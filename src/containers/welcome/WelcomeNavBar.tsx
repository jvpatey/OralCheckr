import { ThemeType } from "../../App";
import {
  ThemeToggleContainer,
  NavLinksContainer,
  StyledLink,
  TooltipWrapper,
} from "./styles/WelcomeNavBarStyles";
import { ThemeToggle } from "./components/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths } from "../../common/constants/routes";

// Props for welcome navigation bar
interface WelcomeNavBarProps {
  themeToggler: () => void;
  theme: ThemeType;
}

// Navigation bar with theme toggle and support link
export function WelcomeNavBar({ themeToggler, theme }: WelcomeNavBarProps) {
  return (
    <ThemeToggleContainer>
      <NavLinksContainer>
        <StyledLink to={RoutePaths.ABOUT} data-tooltip="Support">
          <FontAwesomeIcon icon={faInfoCircle} size="lg" />
        </StyledLink>
        <TooltipWrapper
          data-tooltip={theme === ThemeType.DARK ? "Light Mode" : "Dark Mode"}
        >
          <ThemeToggle themeToggler={themeToggler} theme={theme} />
        </TooltipWrapper>
      </NavLinksContainer>
    </ThemeToggleContainer>
  );
}

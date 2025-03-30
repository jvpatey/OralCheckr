import { ThemeType } from "../../App";
import {
  ThemeToggleContainer,
  NavLinksContainer,
  StyledLink,
} from "./styles/WelcomeNavBarStyles";
import { ThemeToggle } from "./components/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths } from "../../common/constants/routes";

interface WelcomeNavBarProps {
  themeToggler: () => void;
  theme: ThemeType;
}

export function WelcomeNavBar({ themeToggler, theme }: WelcomeNavBarProps) {
  return (
    <ThemeToggleContainer>
      <NavLinksContainer>
        <StyledLink to={RoutePaths.ABOUT}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "6px" }} />
          About
        </StyledLink>
      </NavLinksContainer>
      <ThemeToggle themeToggler={themeToggler} theme={theme} />
    </ThemeToggleContainer>
  );
}

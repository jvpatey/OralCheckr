import { useEffect, useState } from "react";
import { ThemeType } from "../../App";
import { RoutePaths } from "../../common/constants/routes";
import {
  GlassNavBar,
  NavContainer,
  NavLinksWrapper,
  NavLinksContainer,
  NavIndicator,
  NavLink,
  NavRightSection,
  NavSupportLink,
  TooltipWrapper,
} from "./styles/WelcomeNavBarStyles";
import { ThemeToggle } from "./components/ThemeToggle";
import { useScrollSpy } from "../../hooks/useScrollSpy";

// Props for welcome navigation bar
interface WelcomeNavBarProps {
  themeToggler: () => void;
  theme: ThemeType;
}

// Navigation bar with glassmorphism design and scroll tracking
export function WelcomeNavBar({ themeToggler, theme }: WelcomeNavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(["hero", "features"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
  };

  const sections = ["hero", "features"];
  const activeIndex = sections.indexOf(activeSection);
  const pillLinkCount = 2;

  return (
    <GlassNavBar $isScrolled={isScrolled}>
      <NavContainer>
        <NavLinksWrapper>
          <NavLinksContainer>
            {activeIndex >= 0 && (
              <NavIndicator
                $activeIndex={activeIndex}
                $linkCount={pillLinkCount}
              />
            )}
            <NavLink
              $isActive={activeSection === "hero"}
              onClick={() => handleNavClick("hero")}
              type="button"
            >
              Home
            </NavLink>
            <NavLink
              $isActive={activeSection === "features"}
              onClick={() => handleNavClick("features")}
              type="button"
            >
              Features
            </NavLink>
          </NavLinksContainer>
        </NavLinksWrapper>

        <NavRightSection>
          <NavSupportLink to={RoutePaths.ABOUT}>Support</NavSupportLink>
          <TooltipWrapper
            data-tooltip={theme === ThemeType.DARK ? "Light Mode" : "Dark Mode"}
          >
            <ThemeToggle themeToggler={themeToggler} theme={theme} />
          </TooltipWrapper>
        </NavRightSection>
      </NavContainer>
    </GlassNavBar>
  );
}

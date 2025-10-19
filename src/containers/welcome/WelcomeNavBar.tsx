import { useEffect, useState } from "react";
import { ThemeType } from "../../App";
import {
  GlassNavBar,
  NavContainer,
  NavLinksWrapper,
  NavLinksContainer,
  NavLink,
  NavRightSection,
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

  // Debug: log active section changes
  useEffect(() => {
    console.log("Active section changed to:", activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    console.log("=== Nav Click ===", sectionId);
    
    const element = document.getElementById(sectionId);
    if (!element) {
      console.error(`❌ Section with id "${sectionId}" not found`);
      return;
    }

    console.log("✅ Element found:", element);

    // Use scrollIntoView for more reliable scrolling
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Adjust for fixed navbar after scrolling starts
    setTimeout(() => {
      const yOffset = -100; // Navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
  };

  return (
    <GlassNavBar $isScrolled={isScrolled}>
      <NavContainer>
        <NavLinksWrapper>
          <NavLinksContainer>
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

import { useLocation } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";
import { AuthContext } from "../../authentication/AuthContext";
import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  SidebarContainer,
  SidebarTrack,
  SidebarIndicator,
  SidebarLink,
  SidebarLinkLabel,
} from "../styles/SidebarStyles";

// Props for sidebar navigation
interface SidebarProps {
  links: { name: string; path: string }[];
}

function isLinkActive(
  link: { path: string },
  currentPath: string
): boolean {
  return (
    currentPath === link.path ||
    (link.path === RoutePaths.QUESTIONNAIRE &&
      currentPath.startsWith(RoutePaths.QUESTIONNAIRE) &&
      currentPath !== RoutePaths.RESULTS)
  );
}

// Sidebar navigation component
export function Sidebar({ links }: SidebarProps) {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const currentPath =
    location.pathname + location.hash.replace("#", "");

  const activeIndex = useMemo(() => {
    const i = links.findIndex((link) => isLinkActive(link, currentPath));
    return i;
  }, [links, currentPath]);

  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const updateIndicator = useCallback(() => {
    const track = trackRef.current;
    if (!track || activeIndex < 0) {
      setIndicator((prev) =>
        prev.top === 0 && prev.height === 0 ? prev : { top: 0, height: 0 }
      );
      return;
    }
    const el = linkRefs.current[activeIndex];
    if (!el) {
      return;
    }
    setIndicator({
      top: el.offsetTop,
      height: el.offsetHeight,
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, links.length]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateIndicator);
      return () => window.removeEventListener("resize", updateIndicator);
    }
    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(track);
    window.addEventListener("resize", updateIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  // Hide sidebar for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarContainer>
      <SidebarTrack ref={trackRef}>
        {activeIndex >= 0 && indicator.height > 0 && (
          <SidebarIndicator
            style={{ top: indicator.top, height: indicator.height }}
          />
        )}
        {links.map((link, index) => {
          const isActive = isLinkActive(link, currentPath);

          return (
            <SidebarLink
              to={link.path}
              key={link.path}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              $isActive={isActive}
            >
              <SidebarLinkLabel>{link.name}</SidebarLinkLabel>
            </SidebarLink>
          );
        })}
      </SidebarTrack>
    </SidebarContainer>
  );
}

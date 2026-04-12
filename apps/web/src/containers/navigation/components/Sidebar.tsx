import { useLocation } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";
import { AuthContext } from "../../authentication/AuthContext";
import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import {
  SidebarContainer,
  SidebarTrack,
  SidebarLinksGroup,
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
      currentPath !== RoutePaths.RESULTS &&
      currentPath !== RoutePaths.APPOINTMENT_SUMMARY)
  );
}

// Sidebar navigation component
export function Sidebar({ links }: SidebarProps) {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const currentPath =
    location.pathname + location.hash.replace("#", "");

  const activeIndex = useMemo(() => {
    const i = links.findIndex((link) => isLinkActive(link, currentPath));
    return i;
  }, [links, currentPath]);

  const linksGroupKey = useMemo(
    () => links.map((l) => l.path).join("|"),
    [links]
  );

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
  }, [updateIndicator, linksGroupKey]);

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

  const groupTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <SidebarContainer>
      <SidebarTrack ref={trackRef}>
        <AnimatePresence mode="wait" initial={false}>
          <SidebarLinksGroup
            key={linksGroupKey}
            initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, filter: "blur(3px)" }
            }
            transition={groupTransition}
          >
            {activeIndex >= 0 && indicator.height > 0 && (
              <SidebarIndicator
                style={{ top: indicator.top, height: indicator.height }}
              />
            )}
            {links.map((link, index) => {
              const isActive = isLinkActive(link, currentPath);
              const pinToBottom =
                link.path === RoutePaths.APPOINTMENT_SUMMARY;

              return (
                <SidebarLink
                  to={link.path}
                  key={link.path}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  $isActive={isActive}
                  $pinToBottom={pinToBottom}
                >
                  <SidebarLinkLabel>{link.name}</SidebarLinkLabel>
                </SidebarLink>
              );
            })}
          </SidebarLinksGroup>
        </AnimatePresence>
      </SidebarTrack>
    </SidebarContainer>
  );
}

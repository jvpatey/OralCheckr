import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { Sidebar } from "../components/Sidebar";
import {
  navbarLinks,
  sidebarLinks as sidebarNavLinks,
  NavLink,
} from "../common/links";
import { Router } from "../Router";
import { getFullPath } from "../common/constants/routes";
import { RoutePaths } from "../common/constants/routes";

interface RenderNavsProps {
  themeToggler: () => void;
  currentTheme: string;  // Add currentTheme prop
}

// Function to render the navigation components of the app
export function RenderNavs({ themeToggler, currentTheme }: RenderNavsProps) {
  const location = useLocation();
  const [sidebarLinks, setSidebarLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;
    const isHabitTrackerRoute = currentPath.startsWith(
      getFullPath("/habit-tracker")
    );
    const isQuestionnaireRoute = currentPath.startsWith(
      getFullPath("/questionnaire")
    );

    if (isHabitTrackerRoute) {
      setSidebarLinks(
        sidebarNavLinks.filter(
          (link) =>
            link.path.startsWith(getFullPath(RoutePaths.HABITS)) ||
            link.path.startsWith(getFullPath(RoutePaths.ANALYTICS))
        )
      );
    } else if (isQuestionnaireRoute) {
      setSidebarLinks(
        sidebarNavLinks.filter(
          (link) =>
            link.path.startsWith(getFullPath(RoutePaths.QUESTIONNAIRE)) ||
            link.path.startsWith(getFullPath(RoutePaths.RESULTS))
        )
      );
    } else {
      setSidebarLinks([]);
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar links={navbarLinks} themeToggler={themeToggler} theme={currentTheme} />
      {sidebarLinks.length > 0 && <Sidebar links={sidebarLinks} />}
      <Router />
    </>
  );
}
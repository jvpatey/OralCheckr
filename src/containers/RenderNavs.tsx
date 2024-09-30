import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { Sidebar } from "../components/Sidebar";
import {
  navbarLinks,
  sidebarLinks as sidebarNavLinks,
  NavLink,
} from "../common/links";
import { RoutePaths } from "../common/constants/routes";
import { ThemeType } from "../App";

interface RenderNavsProps {
  themeToggler: () => void;
  currentTheme: ThemeType;
}

// Function to render the navigation components of the app
export function RenderNavs({ themeToggler, currentTheme }: RenderNavsProps) {
  const location = useLocation();
  const [sidebarLinks, setSidebarLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;
    const isHabitTrackerRoute = currentPath.startsWith(RoutePaths.HABITS);
    const isQuestionnaireRoute = currentPath.startsWith(RoutePaths.QUESTIONNAIRE);

    if (isHabitTrackerRoute) {
      setSidebarLinks(
        sidebarNavLinks.filter(
          (link) =>
            link.path.startsWith(RoutePaths.HABITS) ||
            link.path.startsWith(RoutePaths.ANALYTICS)
        )
      );
    } else if (isQuestionnaireRoute) {
      setSidebarLinks(
        sidebarNavLinks.filter(
          (link) =>
            link.path.startsWith(RoutePaths.QUESTIONNAIRE) ||
            link.path.startsWith(RoutePaths.RESULTS)
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
    </>
  );
}
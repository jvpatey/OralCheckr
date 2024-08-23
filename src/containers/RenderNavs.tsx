import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { Sidebar } from "../components/Sidebar";
import { links, NavLink } from "../common/links";
import { Router } from "../Router";
import { getFullPath } from "../common/constants/routes";
import { RoutePaths } from "../common/constants/routes";

// Function to render the navigation components of the app
export function RenderNavs() {
  const location = useLocation();
  const [sidebarLinks, setSidebarLinks] = useState<NavLink[]>([]);
  const navbarLinks = links
    .filter((link) => link.displayIn === "navbar" || link.displayIn === "both")
    .map((link) => ({
      text: link.name,
      href: link.path,
      icon: link.icon,
    }));

  // Hook to update the sidebar links whenever the URL path changes.
  useEffect(() => {
    const currentPath = location.pathname;

    // Determine if the current path is related to the habit tracker section
    const isHabitTrackerRoute = currentPath.startsWith(
      getFullPath("/habit-tracker")
    );

    // Determine if the current path is related to the questionnaire section
    const isQuestionnaireRoute = currentPath.startsWith(
      getFullPath("/questionnaire")
    );

    // Update the sidebar links based on the current route
    if (isHabitTrackerRoute) {
      setSidebarLinks(
        links.filter(
          (link) =>
            link.displayIn !== "navbar" &&
            (link.path.startsWith(getFullPath(RoutePaths.HABITS)) ||
              link.path.startsWith(getFullPath(RoutePaths.ANALYTICS)))
        )
      );
    } else if (isQuestionnaireRoute) {
      setSidebarLinks(
        links.filter(
          (link) =>
            link.displayIn !== "navbar" &&
            (link.path.startsWith(getFullPath(RoutePaths.QUESTIONNAIRE)) ||
              link.path.startsWith(getFullPath(RoutePaths.RESULTS)))
        )
      );
    } else {
      setSidebarLinks([]);
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar links={navbarLinks} />
      {sidebarLinks.length > 0 && <Sidebar links={sidebarLinks} />}
      <Router />
    </>
  );
}

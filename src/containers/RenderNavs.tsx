import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Sidebar } from "../components/Sidebar";
import {
  habitTrackerLinks,
  questionnaireLinks,
  SidebarLink,
} from "../common/SidebarLinks";
import { navbarLinks } from "../common/NavbarLinks";
import { Router } from "../Router";
import { getFullPath, RoutePaths } from "../common/Routes";

// Function to render the navigation components of the app
export function RenderNavs() {
  const location = useLocation();
  const [sidebarLinks, setSidebarLinks] = useState<SidebarLink[]>([]);

  // Hook to update the sidebar links whenever the URL path changes.
  useEffect(() => {
    const currentPath = location.pathname;

    // Determine if the current path is related to the habit tracker section
    const isHabitTrackerRoute = currentPath.startsWith(
      getFullPath("/habit-tracker")
    );

    // Determine if the current path is related to the questionnaire section
    const isQuestionnaireRoute = currentPath.startsWith(getFullPath("/ques"));

    console.log("Current Path:", currentPath);
    console.log(
      "Full Path for Questionnaire:",
      getFullPath(RoutePaths.QUESTIONNAIRE)
    );
    console.log("Is Habit Tracker Route:", isHabitTrackerRoute);
    console.log("Is Questionnaire Route:", isQuestionnaireRoute);

    // Update the sidebar links based on the current route
    if (isHabitTrackerRoute) {
      setSidebarLinks(habitTrackerLinks);
    } else if (isQuestionnaireRoute) {
      setSidebarLinks(questionnaireLinks);
    } else {
      setSidebarLinks([]);
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar links={navbarLinks} />{" "}
      {sidebarLinks.length > 0 && <Sidebar links={sidebarLinks} />} <Router />
    </>
  );
}

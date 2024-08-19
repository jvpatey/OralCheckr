import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";
import {
  habitTrackerLinks,
  questionnaireLinks,
  SidebarLink,
} from "./common/SidebarLinks";
import { navbarLinks } from "./common/NavbarLinks";
import { Router } from "./Router";

function RenderNavs() {
  const location = useLocation();
  const isHabitTrackerRoute = location.pathname.includes("/habit-tracker");
  const isQuestionnaireRoute = location.pathname.includes("/ques");

  let sidebarLinks: SidebarLink[] = [];
  if (isHabitTrackerRoute) {
    sidebarLinks = habitTrackerLinks;
  } else if (isQuestionnaireRoute) {
    sidebarLinks = questionnaireLinks;
  }

  return (
    <>
      <NavBar links={navbarLinks} />
      {sidebarLinks.length > 0 && <Sidebar links={sidebarLinks} />}
      <Router />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <RenderNavs />
    </BrowserRouter>
  );
}

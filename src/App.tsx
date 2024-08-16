import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Router } from "./Router";
import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";
import { links as sidebarLinks } from "./common/SidebarLinks";
import { links as navbarLinks } from "./common/NavbarLinks";

function RenderNavs() {
  const location = useLocation();
  const isHabitTrackerRoute = location.pathname.includes("/habit-tracker");

  return (
    <>
      <NavBar links={navbarLinks} />
      {isHabitTrackerRoute && <Sidebar links={sidebarLinks} />}
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

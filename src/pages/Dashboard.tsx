import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

export function Dashboard() {
  const links = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Questionnaire", href: "/questionnaire" },
  ];

  const sidebarLinks = [
    { text: "Oral Health Status", href: "/oral-health" },
    { text: "Habit Tracker", href: "/habit-tracker" },
    { text: "Recommendations", href: "/recommendations" },
  ];

  return (
    <div className="full-page-bg">
      <NavBar links={links} />
      <SideBar links={sidebarLinks} />
    </div>
  );
}

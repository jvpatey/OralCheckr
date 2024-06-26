import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { DashboardCard } from "../components/DashboardCard";

export function Recommendations() {
  const links = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Questionnaire", href: "/questionnaire" },
  ];

  const sidebarLinks = [
    { text: "Oral Health Status", href: "/dashboard" },
    { text: "Habit Tracker", href: "/habittracker" },
    { text: "Recommendations", href: "/recommendations" },
  ];

  const activeLink = sidebarLinks.find(
    (link) => window.location.pathname === link.href
  );
  const activeTitle = activeLink ? activeLink.text : "Dashboard";

  return (
    <div className="full-page-bg">
      <NavBar links={links} />
      <div className="dashboard-container">
        <SideBar links={sidebarLinks} />
        <div className="dashboard-card-container">
          <DashboardCard title={activeTitle} />
        </div>
      </div>
    </div>
  );
}

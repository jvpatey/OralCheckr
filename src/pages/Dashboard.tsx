import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { DashboardCard } from "../components/DashboardCard";
import { RoutePaths } from "../common/Routes";

export function Dashboard() {
  const links = [
    { text: "Dashboard", href: RoutePaths.DASHBOARD },
    { text: "Questionnaire", href: RoutePaths.QUESTIONNAIRE },
    { text: "Log Out", href: RoutePaths.LOGIN },
  ];

  const sidebarLinks = [
    { text: "Oral Health Status", href: RoutePaths.DASHBOARD },
    { text: "Habit Tracker", href: RoutePaths.HABIT_TRACKER },
    { text: "Recommendations", href: RoutePaths.RECOMMENDATIONS },
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

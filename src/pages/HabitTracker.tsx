import "bootstrap/dist/css/bootstrap.min.css";
import { sidebarLinks } from "../App";
import { DashboardCard } from "../components/DashboardCard";

export function HabitTracker() {
  const activeLink = sidebarLinks.find(
    (link) => window.location.pathname === link.href
  );
  const activeTitle = activeLink ? activeLink.text : "Dashboard";

  return (
    <div className="full-page-bg">
      <div className="dashboard-card-container">
        <DashboardCard title={activeTitle} />
      </div>
    </div>
  );
}

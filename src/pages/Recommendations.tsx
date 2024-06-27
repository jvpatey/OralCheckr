import "bootstrap/dist/css/bootstrap.min.css";
import { DashboardCard } from "../components/DashboardCard";
import { sidebarLinks } from "../App";

export function Recommendations() {
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

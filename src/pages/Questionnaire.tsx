import "bootstrap/dist/css/bootstrap.min.css";
import { links } from "../App";
import { DashboardCard } from "../components/DashboardCard";

export function Questionnaire() {
  const activeLink = links.find(
    (link) => window.location.pathname === link.href
  );
  const activeTitle = activeLink ? activeLink.text : "Dashboard";

  return (
    <div className="full-page-bg">
      <div className="dashboard-container">
        <div className="dashboard-card-container">
          <DashboardCard title={activeTitle} />
        </div>
      </div>
    </div>
  );
}

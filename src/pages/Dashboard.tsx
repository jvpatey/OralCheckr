import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { DashboardCard } from "../components/DashboardCard";
import { links, sidebarLinks } from "../App";

export function Dashboard() {
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

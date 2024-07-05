import "bootstrap/dist/css/bootstrap.min.css";
import { links } from "../App";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { DashboardCard } from "../components/DashboardCard";

export function Dashboard() {
  const activeLink = links.find(
    (link) => window.location.pathname === link.href
  );
  const activeTitle = activeLink ? activeLink.text : "Dashboard";

  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <DashboardCard title={activeTitle} />
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

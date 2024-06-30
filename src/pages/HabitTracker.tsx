import "bootstrap/dist/css/bootstrap.min.css";
import { links } from "../App";
import { DashboardCard } from "../components/DashboardCard";
import styled from "styled-components";

// styled-component styles for Habit Tracker Page

const PageBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    max-width: 100vw;
  }
`;

const DashboardCardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;

  @media (max-width: 1100px) {
    margin-left: 0;
    padding: 10px;
  }
`;

export function HabitTracker() {
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

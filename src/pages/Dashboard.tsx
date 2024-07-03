import "bootstrap/dist/css/bootstrap.min.css";
import { links } from "../App";
import { DashboardCard } from "../components/DashboardCard";
import styled from "styled-components";

// styled-component styles for Dashboard Page

const PageBackground = styled.div`
  min-height: 100vh;
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

  @media (max-height: 700px) {
    padding: 10px;
  }
`;

const StyledCard = styled(DashboardCard)`
  width: 80vw;
  max-width: 1400px;
  height: 80vh;
  min-height: 60vh;
  background-color: #e0e0e0;
  border: transparent;
  border-radius: 20px;
  margin-top: 68px;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @media (max-height: 700px) {
    height: auto;
    margin-top: 20px;
  }
`;

export function Dashboard() {
  const activeLink = links.find(
    (link) => window.location.pathname === link.href
  );
  const activeTitle = activeLink ? activeLink.text : "Dashboard";

  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <StyledCard title={activeTitle} />
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

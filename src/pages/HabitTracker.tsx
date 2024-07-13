import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { DashboardCard } from "../components/styled/DashboardCard";
import { Container } from "react-bootstrap";

export function HabitTracker() {
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <DashboardCard>
            <Container fluid></Container>
          </DashboardCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

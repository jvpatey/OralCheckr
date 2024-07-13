import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { DashboardCard } from "../components/styled/DashboardCard";
import { Container, Row, Col } from "react-bootstrap";
import { OralHealthStatus } from "../components/OralHealthStatus";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  height: 100%;
`;

const StyledRow = styled(Row)`
  height: 50%;
  margin: 0;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export function Dashboard() {
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <DashboardCard>
            <StyledContainer fluid>
              <StyledRow>
                <StyledCol md={6}>
                  <OralHealthStatus />
                </StyledCol>
                <StyledCol md={6}>Recommendations</StyledCol>
              </StyledRow>
              <StyledRow>
                <StyledCol>Habit Tracker</StyledCol>
              </StyledRow>
            </StyledContainer>
          </DashboardCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

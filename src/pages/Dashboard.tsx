import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { DashboardCard } from "../components/styled/DashboardCard";
import { Container, Row, Col } from "react-bootstrap";
import { OralHealthStatus } from "../components/OralHealthStatus";
import { Recommendations } from "../components/Recommendations";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  height: 100%;
`;

const StyledRow = styled(Row)`
  height: 50%;
  margin: 0;
  justify-content: center;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const FullWidthRow = styled(Row)`
  height: 50%;
  width: 100%;
  margin: 0;
`;

const MarginCol = styled(Col)`
  margin-left: auto;
`;

export function Dashboard() {
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <DashboardCard>
            <StyledContainer fluid>
              <StyledRow>
                <MarginCol md={6}>
                  <OralHealthStatus />
                </MarginCol>
                <StyledCol md={6}>
                  <Recommendations />
                </StyledCol>
              </StyledRow>
              <FullWidthRow>
                <StyledCol>Habit Tracker</StyledCol>
              </FullWidthRow>
            </StyledContainer>
          </DashboardCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

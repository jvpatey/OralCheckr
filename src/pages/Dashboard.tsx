import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../components/Styled/PageBackground";
import { DashboardContainer } from "../components/Styled/DashboardContainer";
import { DashboardCardContainer } from "../components/Styled/DashboardCardContainer";
import { DashboardCard } from "../components/Styled/DashboardCard";
import { Container, Row, Col } from "react-bootstrap";
import { OralHealthStatus } from "../components/OralHealthStatus";
import { Recommendations } from "../components/Recommendations";
import { HabitTrackerDash } from "../components/HabitTrackerDash";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
`;

const StyledRow = styled(Row)`
  height: 50%;
  margin: 0;
  @media (max-width: 1100px) {
    height: auto;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  padding: 5px;
  @media (max-width: 1100px) {
    padding: 10px 0;
  }
`;

const FullWidthRow = styled(Row)`
  height: 50%;
  width: 100%;
  margin: 0;
  @media (max-width: 1100px) {
    height: auto;
  }
`;

export function Dashboard() {
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <DashboardCard>
            <StyledContainer fluid>
              <StyledRow>
                <StyledCol xs={12} md={6}>
                  <OralHealthStatus />
                </StyledCol>
                <StyledCol xs={12} md={6}>
                  <Recommendations />
                </StyledCol>
              </StyledRow>
              <FullWidthRow>
                <StyledCol xs={12}>
                  <HabitTrackerDash />
                </StyledCol>
              </FullWidthRow>
            </StyledContainer>
          </DashboardCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

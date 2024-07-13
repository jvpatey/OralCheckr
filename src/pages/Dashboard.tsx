import "bootstrap/dist/css/bootstrap.min.css";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { DashboardCard } from "../components/styled/DashboardCard";
import { Container, Row, Col } from "react-bootstrap";

export function Dashboard() {
  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <DashboardCard>
            <Container fluid>
              <Row className="h-50">
                <Col md={6} className="d-flex">
                  Oral health status
                </Col>
                <Col md={6} className="d-flex">
                  Recommendations
                </Col>
              </Row>
              <Row className="h-50">
                <Col className="d-flex">Habit Tracker</Col>
              </Row>
            </Container>
          </DashboardCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}

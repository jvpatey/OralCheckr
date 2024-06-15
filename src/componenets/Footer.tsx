import { Container, Row, Col } from "react-bootstrap";

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer">
        <Row>
          <Col>
            <p>
              &copy; 2024 OralCheckr - All Rights Reserved - GetCoding Module 3
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

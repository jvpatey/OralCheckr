import { Card, Carousel } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background-color: #e0e0e0;
  border: transparent;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
  background-color #f5f5f5;

  .carousel-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export function Recommendations() {
  return (
    <StyledCard>
      <Card.Header>Recommendations</Card.Header>
      <Card.Body>
        <StyledCarousel>
          <Carousel.Item>
            <div>Recommendation details for Category 1.</div>
          </Carousel.Item>
        </StyledCarousel>
      </Card.Body>
    </StyledCard>
  );
}

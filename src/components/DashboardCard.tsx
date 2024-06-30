import { Card } from "react-bootstrap";
import styled from "styled-components";

interface DashboardCardProps {
  title: string;
}

const StyledCard = styled(Card)`
  width: 97vw;
  height: 87vh;
  min-width: 300px;
  min-height: 300px;
  background-color: #e0e0e0;
  border: transparent;
  border-radius: 20px;
  margin-top: 68px;
  animation: fadeInUp 1s ease-out;

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
`;

export function DashboardCard({ title }: DashboardCardProps) {
  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </StyledCard>
  );
}

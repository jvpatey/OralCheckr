import { Card } from "react-bootstrap";
import styled from "styled-components";

interface DashboardCardProps {
  title: string;
}

const StyledCard = styled(Card)`
  // width: 80vw;
  // height: 100%;
  // min-width: 300px;
  // min-height: 400px;
  // background-color: #e0e0e0;
  // border: transparent;
  // border-radius: 20px;
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

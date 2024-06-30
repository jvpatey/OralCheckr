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
`;

export function DashboardCard({ title }: DashboardCardProps) {
  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {/* This page will contain the oral health status and recommendations */}
      </Card.Body>
    </StyledCard>
  );
}

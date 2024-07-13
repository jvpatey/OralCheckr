import { Card } from "react-bootstrap";
import styled from "styled-components";
import { ReactNode } from "react";

const StyledCard = styled(Card)`
  width: 90vw;
  max-width: 1400px;
  height: 80vh;
  min-height: 60vh;
  background-color: #e0e0e0;
  border: transparent;
  border-radius: 20px;
  margin-top: 68px;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;

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

  @media (max-height: 700px) {
    height: auto;
    margin-top: 20px;
  }
`;

const StyledCardBody = styled(Card.Body)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

interface DashboardCardProps {
  children: ReactNode;
}

export function DashboardCard({ children }: DashboardCardProps) {
  return (
    <StyledCard>
      <StyledCardBody>{children}</StyledCardBody>
    </StyledCard>
  );
}

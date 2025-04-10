import { Card } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  height: auto;
  min-height: 40vh;
  background-color: ${({ theme }) => theme.blue};
  border: 4px solid ${({ theme }) => theme.blue};
  border-radius: 20px;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center center;

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

  @media (max-width: 768px) {
    width: 90%;
    margin: 10px auto;
    min-height: 250px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.green};
    border: 4px solid ${({ theme }) => theme.green};
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StyledCardBody = styled(Card.Body)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-y: auto;
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 30px;
  color: ${({ theme }) => theme.backgroundColor};
  transition: color 0.3s ease;
`;

const CardIcon = styled(FontAwesomeIcon)`
  font-size: 36px;
  color: ${({ theme }) => theme.backgroundColor};
  margin-bottom: 15px;
  transition: color 0.3s ease;
`;

const CardText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.backgroundColor};
  margin: 10px;
`;

type DashboardCardProps = {
  title: string;
  description: string;
  buttonLink: string;
  icon: any;
};

// functionalcomponent for Landing card buttons
export function LandingCard({
  title,
  description,
  buttonLink,
  icon,
}: DashboardCardProps) {
  return (
    <Link to={buttonLink} style={{ textDecoration: "none" }}>
      <StyledCard>
        <StyledCardBody>
          <CardTitle>{title}</CardTitle>
          <CardIcon icon={icon} />
          <CardText>{description}</CardText>
        </StyledCardBody>
      </StyledCard>
    </Link>
  );
}

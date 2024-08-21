import { Card } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../common/utilities/color-utils";

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  height: auto;
  min-height: 40vh;
  background-color: ${colors.blue};
  border: 4px solid ${colors.blue};
  border-radius: 20px;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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
    background-color: ${colors.green};
    border: 4px solid ${colors.green};
    transform: scale(1.05);
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
  color: ${colors.bgWhite};
  transition: color 0.3s ease;
`;

const CardIcon = styled(FontAwesomeIcon)`
  font-size: 36px;
  color: ${colors.bgWhite};
  margin-bottom: 15px;
  transition: color 0.3s ease;
`;

const CardText = styled.p`
  font-size: 16px;
  color: ${colors.bgWhite};
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

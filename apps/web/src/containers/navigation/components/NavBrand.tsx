import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";

// Modern brand text matching welcome screen styling
const BrandText = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Enhanced gradient text effect matching welcome screen */
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    letter-spacing: -0.75px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: -0.5px;
  }
`;

// Navigation brand component with modern styling
export function NavBrand() {
  return (
    <BrandText as={Link} to={RoutePaths.LANDING}>
      OralCheckr
    </BrandText>
  );
}

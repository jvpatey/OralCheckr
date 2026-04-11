import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";
import { HeroTitleAccent } from "../../welcome/styles/WelcomeStyles";

const BrandText = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: ${({ theme }) => theme.textPrimary};
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export function NavBrand() {
  return (
    <BrandText as={Link} to={RoutePaths.LANDING}>
      Oral
      <HeroTitleAccent as="span">Checkr</HeroTitleAccent>
    </BrandText>
  );
}

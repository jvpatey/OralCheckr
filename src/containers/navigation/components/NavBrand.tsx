import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";

const BrandText = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: ${({ theme }) => theme.textGrey};

  &:hover {
    color: ${({ theme }) => theme.blue};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 0;
  }

  @media (max-width: 768px) {
    &::after {
      content: "";
      display: block;
      height: 40px;
    }
  }
`;

const LogoImage = styled.img`
  height: 40px;
`;

export function NavBrand() {
  return (
    <BrandText as={Link} to={RoutePaths.LANDING}>
      <LogoImage src="images/logo-blue.png" alt="Logo" />
      OralCheckr
    </BrandText>
  );
}

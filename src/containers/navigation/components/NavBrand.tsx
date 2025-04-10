import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../common/constants/routes";

const BrandText = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: ${({ theme }) => theme.textGrey};
  transition: color 0.4s ease-out;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.blue};
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
  margin-right: 8px;
  transition: transform 0.4s ease-out;

  ${BrandText}:hover & {
    transform: scale(1.05);
  }
`;

const BrandName = styled.span`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${({ theme }) => theme.blue};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease-out;
  }

  ${BrandText}:hover &::after {
    transform: scaleX(1);
  }
`;

export function NavBrand() {
  return (
    <BrandText as={Link} to={RoutePaths.LANDING}>
      <LogoImage src="images/logo-blue.png" alt="Logo" />
      <BrandName>OralCheckr</BrandName>
    </BrandText>
  );
}

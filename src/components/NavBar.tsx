import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "../common/Routes";
import styled from "styled-components";

interface NavBarProps {
  links: { text: string; href: string }[];
}

// styled-components styling for Navbar

const CustomNavbar = styled(Navbar)`
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
  animation: fadeInDown 1s ease-out;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const BrandText = styled(Navbar.Brand)`
  margin-right: auto;
  font-size: x-large;
  color: #222831;

  &:hover {
    color: #07889b;
    font-weight: bold;
  }
`;

const LogoImage = styled.img`
  height: 45px;
  margin-bottom: 5px;
`;

const DropdownIcon = styled.div`
  color: #222831;
  cursor: pointer;

  &:hover {
    color: #0375b4;
    transform: scale(1.25);
  }
`;

const CustomCollapse = styled(Navbar.Collapse)`
  background-color: #f5f5f5;

  @media (max-width: 992px) {
    position: absolute;
    top: 56px;
    right: 0;
    width: 100%;
    max-width: 250px;
  }

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 1rem;
  }

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const CustomNavLink = styled(Nav.Link)`
  color: #222831;
  margin-right: 25px;

  &:hover {
    color: #07889b;
    transform: scale(1.05);
  }

  &.active {
    color: #07889b;
    font-weight: bold;
    transform: scale(1.1);
    background-color: transparent;
  }
`;

export function NavBar({ links }: NavBarProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  const handleLogout = () => {
    localStorage.setItem("authenticated", "false");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <CustomNavbar expand="lg" fixed="top">
      <Container fluid>
        <BrandText as={Link} to={RoutePaths.DASHBOARD}>
          <LogoImage src="/OralCheckr/images/logo2.png" alt="Logo" />
          OralCheckr
        </BrandText>
        <Dropdown className="ms-auto d-lg-none">
          <DropdownIcon>
            <Dropdown.Toggle as="span" id="dropdown-basic">
              <FontAwesomeIcon icon={faBars} />
            </Dropdown.Toggle>
          </DropdownIcon>

          <Dropdown.Menu align="end">
            {links.map((link) => (
              <Dropdown.Item
                className={location.pathname === link.href ? "active" : ""}
                key={link.href}
                as={Link}
                to={link.href === RoutePaths.LOGIN ? "/" : link.href}
                onClick={
                  link.href === RoutePaths.LOGIN ? handleLogout : undefined
                }
              >
                {link.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <CustomCollapse id="basic-navbar-nav">
          <Nav className="ms-auto d-none d-lg-flex">
            {links.map((link) => (
              <CustomNavLink
                className={location.pathname === link.href ? "active" : ""}
                key={link.href}
                as={Link}
                to={link.href}
                onClick={
                  link.href === RoutePaths.LOGIN ? handleLogout : undefined
                }
              >
                {link.text}
              </CustomNavLink>
            ))}
          </Nav>
        </CustomCollapse>
      </Container>
    </CustomNavbar>
  );
}

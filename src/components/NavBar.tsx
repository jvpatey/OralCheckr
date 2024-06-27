import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { RoutePaths } from "../common/Routes";

interface NavBarProps {
  links: { text: string; href: string }[];
}

export function NavBar({ links }: NavBarProps) {
  const location = useLocation();

  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href={RoutePaths.DASHBOARD} className="brand-text">
          <img
            src="public/images/logo2.png"
            alt="Logo"
            style={{ height: "40px", marginBottom: "10px" }}
          />
          OralCheckr
        </Navbar.Brand>
        <Dropdown className="ms-auto d-lg-none">
          <Dropdown.Toggle
            as="span"
            id="dropdown-basic"
            className="dropdown-icon"
          >
            <FontAwesomeIcon icon={faBars} />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            {links.map((link, index) => (
              <Dropdown.Item
                className={`dropdown-link ${
                  location.pathname === link.href ? "active" : ""
                }`}
                key={index}
                as={NavLink}
                to={link.href}
              >
                {link.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
          <Nav className="ms-auto d-none d-lg-flex">
            {links.map((link, index) => (
              <Nav.Link
                className={`navlink-style ${
                  location.pathname === link.href ? "active" : ""
                }`}
                key={index}
                as={NavLink}
                to={link.href}
              >
                {link.text}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

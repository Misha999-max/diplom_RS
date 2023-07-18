import React from "react";

import { Container, Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const HeaderComponent = ({ url }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          {/* <img
            alt=""
            src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png"
            width="30"
            height="30"
            className="d-inline-block "
          />{" "} */}
          ONLINE-SHOP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link className="linkItem" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="linkItem" to="/contakt">
                Contacts
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="linkItem" to="/address">
                Address
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Button variant="primary">Log In</Button>
            <Button variant="primary" className="ml-2">
              Sign out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;

/* eslint-disable react/prop-types */

import React from "react";

import { Container, Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import localStorageService from "../services/localStorage.service";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/users";

const HeaderComponent = ({ url }) => {
  const user = useSelector(getCurrentUser());
  console.log(user);

  const accessToken = localStorageService.getAccessToken();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png"
              width="30px"
              height="10px"
              className="d-inline-block"
            />
            ONLINE-SHOP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link as="span">
                <Link className="linkItem" to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link className="linkItem" to="/contakt">
                  Contacts
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link className="linkItem" to="/address">
                  Address
                </Link>
              </Nav.Link>
              {accessToken && (
                <Nav.Link as="span">
                  <Link className="linkItem" to="/basketUser">
                    твоя корзина
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link as="span">
                {accessToken ? (
                  <span> Привет {user ? user.login : "неизвестный"} </span>
                ) : (
                  <Link to="/login">
                    <Button variant="primary">Log In</Button>
                  </Link>
                )}

                {accessToken && (
                  <Link to="/logout">
                    <Button variant="primary" className="logOut">
                      log out
                    </Button>
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;

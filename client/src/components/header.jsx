/* eslint-disable react/prop-types */

import React from "react";

import { Container, Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser, getIsLoggedIn } from "../store/users";

const HeaderComponent = ({ url }) => {
  const user = useSelector(getCurrentUser());
  console.log(user);

  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="https://www.pngall.com/wp-content/uploads/5/NASA-Logo-PNG-Free-Download.png"
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

              {isLoggedIn ? (
                <Nav.Link as="span">
                  <Link className="linkItem" to="/address">
                    Admin Pannel
                  </Link>
                </Nav.Link>
              ) : (
                ""
              )}

              {isLoggedIn && (
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
                {isLoggedIn ? (
                  <span> Привет {user ? user.email : "неизвестный"} </span>
                ) : (
                  <Link to="/login">
                    <button className="btn__singUp">
                      Sign up
                      <div className="arrow-wrapper">
                        <div className="arrow"></div>
                      </div>
                    </button>
                  </Link>
                )}

                {isLoggedIn && (
                  <Link to="/logout">
                    <button className="Btn">
                      <div className="sign">
                        <svg viewBox="0 0 512 512">
                          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg>
                      </div>

                      <div className="text">Logout</div>
                    </button>
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

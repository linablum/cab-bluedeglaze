import React from "react";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function NavBar() {
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand className="navbar-brand" href="#home">
          BLUE DEGLAZE
        </Navbar.Brand>
        <Navbar.Toggle
          className="navbar-toggler"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" href="#home">
              home
            </Nav.Link>
            <Nav.Link className="nav-link" href="#about">
              about
            </Nav.Link>
            <Nav.Link className="nav-link" href="#lakes">
              lakes
            </Nav.Link>
            <Nav.Link className="nav-link" href="#login">
              login
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="nav-link" href="#profile">
              profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

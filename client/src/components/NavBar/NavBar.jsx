import React, { useContext } from "react";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../../context/AuthContext";
import Logout from "../Logout";

function NavBar() {
  const { user } = useContext(AuthContext);

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand className="navbar-brand" href="/">
          BLUE DEGLAZE
        </Navbar.Brand>
        <Navbar.Toggle
          className="navbar-toggler"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" href="/">
              home
            </Nav.Link>
            <Nav.Link className="nav-link" href="/about">
              about
            </Nav.Link>
            <Nav.Link className="nav-link" href="/lakes">
              lakes
            </Nav.Link>
            {user ? (
              ""
            ) : (
              <Nav.Link className="nav-link" href="/login">
                login
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link className="nav-link" href="/profile">
                  profile
                </Nav.Link>
                <Logout />
                {/* <Nav.Link className="nav-link" href="/logout">
                  logout
                </Nav.Link> */}
              </>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

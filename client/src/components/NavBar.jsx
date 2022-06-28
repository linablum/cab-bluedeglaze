import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="#home">BLUE DEGLAZE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#about">ABOUT</Nav.Link>
            <Nav.Link href="#lakes">LAKES</Nav.Link>
            <Nav.Link href="#login">LOGIN</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#profile">PROFILE</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

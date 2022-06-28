import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Blue Deglaze</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Lakes</Nav.Link>
          <Nav.Link href="#features">Profile</Nav.Link>
          <Nav.Link href="#pricing">About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';

function NavBar() {
 return (
   <>
      <Navbar  bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Brand href="/simulate">Simulacion</Navbar.Brand>
          
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/simulate">Simulacion</Nav.Link>
              
            </Nav>

        </Container>
      </Navbar>
   </>
 );
}

export default NavBar;
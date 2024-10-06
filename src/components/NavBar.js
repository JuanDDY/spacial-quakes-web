import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';

function NavBar() {
 return (
   <>
      <Navbar  bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Brand href="/modelo">Modelo</Navbar.Brand>
          <Navbar.Brand href="/mision1">Mision1</Navbar.Brand>
          <Navbar.Brand href="/mision2">Mision2</Navbar.Brand>
          <Navbar.Brand href="/descripcion">Nosotros</Navbar.Brand>


        </Container>
      </Navbar>
   </>
 );
}

export default NavBar;
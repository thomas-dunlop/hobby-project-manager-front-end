import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <Navbar /*fixed="top"*/>
            <Container fluid>
                <Navbar.Brand href='/'>Hobby Planner</Navbar.Brand>
                <Nav>
                    <Nav.Link class ='navItems' href='/'>Home</Nav.Link>
                    <Nav.Link class ='navItems' href='/Recipes'>Recipes</Nav.Link>
                    <Nav.Link class ='navItems' href='/Inventory'>Inventory</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="/login">Thomas Dunlop</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
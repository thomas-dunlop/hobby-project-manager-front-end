import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import getCookie from '../functions/getCookie';
import { useState, useEffect } from 'react';
import URL from '../constants';

const Header = () => {
    const [pageData, setPageData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const csrftoken = getCookie('csrftoken');
    const handleSubmit = (event) => {
        fetch(URL + 'account/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken
              },
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
        }).then(data => {
            window.location.href = data["url"]
        })
        .catch(error => {
            console.error("Error adding project", error)
        })

        event.preventDefault()
    }

    useEffect(() => {
        //Replace with API variable
        fetch(URL + 'data/userinfo')
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
        })
        .then(data => {
            setPageData(data)
            setLoaded(true)
        })
        .catch(error => {
            console.error("Error fetching data", error)
        })
        .finally(() =>{
            setLoaded(true)
        })
    }, [])

    if(loaded === false){
        return <p>Loading</p>
    }

    return (
        <Navbar>
            <Container fluid>
                <Navbar.Brand href='/'>Hobby Planner</Navbar.Brand>
                <Nav>
                    <Nav.Link class ='navItems' href='/'>Home</Nav.Link>
                    <Nav.Link class ='navItems' href='/Recipes'>Recipes</Nav.Link>
                    <Nav.Link class ='navItems' href='/Inventory'>Inventory</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <div>
                        <Navbar.Text>
                            Signed in as: {pageData.username}
                        </Navbar.Text>
                        <Button onClick={handleSubmit} style={{
                            marginLeft: '5px',
                        }}>Logout</Button>
                    </div>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
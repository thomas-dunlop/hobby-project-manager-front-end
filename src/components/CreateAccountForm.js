import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import CSRFToken from './csrftoken';
import { useState } from 'react';
import getCookie from '../functions/getCookie';
import URL from '../constants';

const CreateAccountForm = () => {
    const [value, setValue] = useState({
        email: '',
        username: '',
        password: '',
    })
    const csrftoken = getCookie('csrftoken');

    const handleChange = (event) => {
        const target = event.target
        const name = target.name
        let data = target.value
        setValue({
            ...value,
            [name]: data
        })
    }

    const handleSubmit = (event) => {
        fetch(URL + 'account/create-account/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken
              },
            body: JSON.stringify(value)
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

        setValue({
            email: '',
            username: '',
            password: '',
        })
        event.preventDefault()
    }
    return (
        <div class="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Hobby Project Tracker: CreateAccount
                    </Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <CSRFToken />
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={value.email} onChange = {handleChange} placeholder="Enter Email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={value.username} onChange = {handleChange} placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={value.password} onChange = {handleChange} placeholder="Enter Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginLeft: '5px', marginRight: '5px'}}>Create Account</Button>
                    </Form>
                    <br></br>
                    <Button variant="primary" href='/login/' style={{marginLeft: '5px', marginRight: '5px'}}>Already have an account? Login</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CreateAccountForm;
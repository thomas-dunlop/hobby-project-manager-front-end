import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CSRFToken from './csrftoken';
import { useState } from 'react';
import getCookie from '../functions/getCookie';
import URL from '../constants';

const EditMaterialForm = (props) => {
    const [value, setValue] = useState({
        name: props.material.name,
        partNumber: props.material.partNumber,
        company: props.material.company,
        link: props.material.link,
        category: props.category
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
        fetch(URL + 'data/material/' + props.material.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken
              },
            body: JSON.stringify(value)
        })
        .then(response => {
            if (response.ok) {
                window.location.reload()
            } 
        })
        .catch(error => {
            console.error("Error adding project", error)
        })

        setValue({
            name: props.material.name,
            partNumber: props.material.partNumber,
            company: props.material.company,
            link: props.material.link,
            category: props.category
        })
        event.preventDefault()
    }
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <CSRFToken />
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={value.name} onChange = {handleChange} placeholder="Enter Name"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="partNumber">
                    <Form.Label>Part Number</Form.Label>
                    <Form.Control type="text" name="partNumber" value={value.partNumber} onChange = {handleChange} placeholder="Enter Part Number"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" name="company" value={value.company} onChange = {handleChange} placeholder="Enter Company"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="link">
                    <Form.Label>Link</Form.Label>
                    <Form.Control type="url" name="link" value={value.link} onChange = {handleChange} placeholder="Enter URL to Item"/>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default EditMaterialForm;
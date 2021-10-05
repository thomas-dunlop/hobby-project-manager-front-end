import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CSRFToken from './csrftoken';
import { useState } from 'react';
import getCookie from '../functions/getCookie';

const NewItemForm = (props) => {
    const [value, setValue] = useState({
        lotNumber: '',
        expiryDate: '',
        material: props.material
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
        fetch('http://127.0.0.1:8000/data/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken
              },
            body: JSON.stringify(value)
        })
        .then(response => {
            if (response.ok) {} 
        })
        .catch(error => {
            console.error("Error adding project", error)
        })

        setValue({
            lotNumber: '',
            expiryDate: '',
            material: props.material
        })
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <CSRFToken />
                <Form.Group className="mb-3" controlId="lotNumber">
                    <Form.Label>Lot Number</Form.Label>
                    <Form.Control type="text" name="lotNumber" value={value.lotNumber} onChange = {handleChange} placeholder="Enter Lot Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="expiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control type="date" name="expiryDate" value={value.expiryDate} onChange = {handleChange} placeholder="Enter Expiry Date" />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewItemForm;
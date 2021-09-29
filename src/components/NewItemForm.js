import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewItemForm = (props) => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="lotNumber">
                    <Form.Label>Lot Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Lot Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Expiry Date">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Expiry Date" />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewItemForm;
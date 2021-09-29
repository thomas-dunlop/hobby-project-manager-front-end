import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditProjectDescriptionForm = (props) => {
    //Replace with API call
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="projectDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" value={props.description}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" type="text" placeholder="Put your thoughts here!" value={props.notes}/>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default EditProjectDescriptionForm;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewMaterialForm = (props) => {
    //Replace with API call
    const projectList = [
        {name: "Empire of Dust"},
        {name: "Late War Wehrmatch"},
        {name: "Sanguine Fists"}
    ]

    return (
        <div> 
            <Form>
                <Form.Group className="mb-3" controlId="materialName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="partNumber">
                    <Form.Label>Part Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Part Number"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="link">
                    <Form.Label>Link</Form.Label>
                    <Form.Control type="url" placeholder="Enter URL to Item"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="materialProject">
                    <Form.Label>Projects</Form.Label>
                    <Form.Select multiple>
                        {projectList.map(project => {
                            return <option value={project.name}>{project.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewMaterialForm;
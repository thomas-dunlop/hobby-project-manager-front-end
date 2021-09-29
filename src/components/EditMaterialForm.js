import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditMaterialForm = (props) => {
    //Replace with API call
    const projectList = [
        {id: '1', name: "Empire of Dust"},
        {id: '2', name: "Late War Wehrmatch"},
        {id: '3', name: "Sanguine Fists"}
    ]

    function createProjectSelectList(array, item) {
        if (array.some(element => element.id === item.id)) {
            return <option selected value={item.name}>{item.name}</option>
        } else {
            return <option value={item.name}>{item.name}</option>
        }
    }

    return (
        <div>
            <Form>
                    <Form.Group className="mb-3" controlId="materialName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={props.name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="partNumber">
                        <Form.Label>Part Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Part Number" value={props.partNumber}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="company">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" placeholder="Enter Company" value={props.company}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="link">
                        <Form.Label>Link</Form.Label>
                        <Form.Control type="url" placeholder="Enter URL to Item" value={props.link}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="partProject">
                        <Form.Label>Projects</Form.Label>
                        <Form.Select multiple>
                            {projectList.map(project => createProjectSelectList(props.projects, project))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
        </div>
    )
}

export default EditMaterialForm;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditRecipeForm = (props) => {
    //Replace with API call
    const projectList = [
        {id: '1', name: "Empire of Dust"},
        {id: '2', name: "Late War Wehrmatch"},
        {id: '3', name: "Sanguine Fists"}
    ]

    function createProjectSelectList(selectedArray, item) {
        if (selectedArray.some(element => element.id === item.id)) {
            return <option selected value={item.name}>{item.name}</option>
        } else {
            return <option value={item.name}>{item.name}</option>
        }
    }

    return (
        <div>
            <Form>
                    <Form.Group className="mb-3" controlId="recipeName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={props.name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipeDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" value={props.description}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipeProject">
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

export default EditRecipeForm;
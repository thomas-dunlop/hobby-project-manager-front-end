import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewProjectForm = (props) => {
    //Replace with API call
    const recipeList = [
        {name: "Faded Red Cloth"},
        {name: "Sanguine Fist Armor"},
    ]
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="projectName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" type="text" placeholder="Enter Notes" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectImg">
                    <Form.Label>Link to Image</Form.Label>
                    <Form.Control type="url" placeholder="Enter URL to Image" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectRecipes">
                    <Form.Label>Recipes</Form.Label>
                    <Form.Select multiple>
                        {recipeList.map(recipe => {
                            return <option value={recipe.name}>{recipe.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewProjectForm;
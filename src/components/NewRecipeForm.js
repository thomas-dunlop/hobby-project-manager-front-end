import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewRecipeForm = (props) => {
    //Replace with API call
    const projectList = [
        {name: "Empire of Dust"},
        {name: "Late War Wehrmatch"},
        {name: "Sanguine Fists"}
    ]
    const recipeList = [
        {name: "Faded Red Cloth"},
        {name: "Sanguine Fist Armor"},
    ]

    let addToProject
    let selectProject;
    if (props.directAdd === true) {
        addToProject = 'content';
        selectProject = 'none'
    } else {
        addToProject = 'none';
        selectProject = 'content'
    }

    return (
        <div>
            <div style = {{display: addToProject}}>
                <h5>Add Existing Recipe</h5>
                <Form>
                    <Form.Group className="mb-3" controlId="projectRecipes">
                        <Form.Label>Recipes</Form.Label>
                        <Form.Select>
                            {recipeList.map(recipe => {
                                return <option value={recipe.name}>{recipe.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <hr></hr>
                <p class="d-flex justify-content-center">or</p>
                <hr></hr>
                <h5>Create New Recipe</h5>
            </div>
            <div> 
                <Form>
                    <Form.Group className="mb-3" controlId="recipeName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipeDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipeProject" style = {{display: selectProject}}>
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
        </div>
    )
}

export default NewRecipeForm;
import {Header, RecipeAccordion, AddButton, ProjectCard, EditButton} from '../components';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const ProjectPage = () => {
    //Replace with API call
    const projectInfo = {
        name: "Empire of Dust",
        img: "https://i2.wp.com/dash28.org/wp-content/uploads/2020/01/pasted-image-0-2.png?fit=1307%2C747&ssl=1",
        description: "Empire of Dust army for Kings of War using models from OnePageRules",
        notes: "Need to find time to work on this",
        recipes: [
            {
                id: "1",
                name: "Faded Red Cloth",
                description: "Fadded red cloth recipe using stippling with a drybrush.",
                projects: [
                    {id: '1', name: "Empire of Dust", img: "https://i2.wp.com/dash28.org/wp-content/uploads/2020/01/pasted-image-0-2.png?fit=1307%2C747&ssl=1"},
                    {id: '2', name: "Late War Wehrmatch", img: "https://cdn.shopify.com/s/files/1/0814/4233/products/12527787_10156646466715257_897851306_n_grande.jpg?v=1548046121"}
                ],
                steps: [
                    {
                        orderValue: '1', 
                        description: "Basecoat with galvorback red",
                        materials: [
                            {id: '1', name: "Gal Vorbak Red"}
                        ]
                    }
                ]
            }
        ]
    }
    projectInfo.type = "projectDescription"
    const newType = {type: "Recipe", directAdd: true} 
    return (
        <div>
            <Header />
            <Container>
                {ProjectCard(projectInfo)}
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs = 'auto'>
                                <Card.Title>{projectInfo.description}</Card.Title>
                            </Col>
                            <Col>
                                <div class="d-flex justify-content-end">
                                    {EditButton(projectInfo)}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr></hr>
                                <Card.Text>{projectInfo.notes}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br></br>
                <h4>Recipes</h4>
                <Accordion>
                    {projectInfo.recipes.map(recipe => RecipeAccordion(recipe))}
                </Accordion>
                <br></br>
                <Container>
                    {AddButton(newType)}
                </Container>
            </Container>
        </div>
    )
}

export default ProjectPage;
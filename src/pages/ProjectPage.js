import {Header, RecipeAccordion, AddButton, ProjectCard, EditButton} from '../components';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import URL from '../constants';

const ProjectPage = () => {
    const [pageData, setPageData] = useState([])
    const [editData, setEditData] = useState({
            type: '',
            data: {}
        }
    )
    const [loaded, setLoaded] = useState(false)
    const {id}  = useParams();

    const newType = {type: "Recipe", directAdd: true} 

    useEffect(() => {
        fetch(URL + 'data/project/' + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
        })
        .then(data => {
            setPageData(data[0])
            setEditData({
                type: 'Project',
                data: data[0]
            })
            setLoaded(true)
        })
        .catch(error => {
            console.error("Error fetching data", error)
        })
        .finally(() =>{
            setLoaded(true)
        })
    }, [])

    if(loaded === false){
        return <p>Loading</p>
    }
    
    return (
        <div>
            <Header />
            <Container>
                {ProjectCard(pageData.project)}
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs = 'auto'>
                                <Card.Title>{pageData.project.description}</Card.Title>
                            </Col>
                            <Col>
                                <div class="d-flex justify-content-end">
                                    <EditButton props={editData}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr></hr>
                                <Card.Text>{pageData.project.notes}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br></br>
                <h4>Recipes</h4>
                <Accordion>
                    {pageData.recipes.map(recipe => {return <RecipeAccordion props={recipe}/>})}
                </Accordion>
                <br></br>
                <Container>
                    <AddButton props={newType}/>
                </Container>
            </Container>
        </div>
    )
}

export default ProjectPage;
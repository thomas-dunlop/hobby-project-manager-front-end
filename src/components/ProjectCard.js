import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { DeleteButton } from '.';

const ProjectCard = (props) => {
    return (
        <div>
            <Card style={{height: 'auto'}}>
                <Card.Img src={props.img}/>
                <Card.ImgOverlay>
                    <Card.Title>
                        <Container>
                            <Row>
                                <Col>
                                    <a href = {'/Projects/' + props.id} class = "projectCardA">{props.name}</a>
                                </Col>
                                <Col>
                                    <div class="d-flex justify-content-end">
                                        {DeleteButton(props)}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Title>
                </Card.ImgOverlay>
            </Card>
            <br></br>
        </div>
    )
}

export default ProjectCard;
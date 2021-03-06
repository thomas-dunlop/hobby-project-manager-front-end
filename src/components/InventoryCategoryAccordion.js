import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { InventoryAccordionItem, AddButton} from '.';

const InventoryCategoryAccordion = (props) => {
    const newType = {type: "Material", category: props.category}
    return (
        <div>
            <h1>{props.category}</h1>
            <Container>
                <Row>
                    <Col xs={2}>Name</Col>
                    <Col xs={2}>Part Number</Col>
                    <Col xs={2}>Company</Col>
                    <Col xs={1}>Link</Col>
                    <Col>Projects</Col>
                    <Col xs={1}></Col>
                </Row>
            </Container>
            <Accordion>
                {props.materials.map(material => {
                    return <InventoryAccordionItem props={material}/>
                    })}
            </Accordion>
            <br></br>
            <Container>
                <AddButton props={newType}/>
            </Container>
            <br></br>
        </div>
    )
}

export default InventoryCategoryAccordion;
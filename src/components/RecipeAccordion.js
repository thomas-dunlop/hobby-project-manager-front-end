import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EditButton, DeleteButton, AddButton } from '.';
import React, {useState} from 'react';

import { ProjectIcon, MaterialIcon} from '.';

const RecipeAccordion = (props) => {
    //Replace with API call
    const materialsList = [
        { 
            name: 'Paint',
            materials: [
                {id: '1', name: 'Gal Vorbak Red'},
                {id: '2', name: 'Celestra Grey'},
                {id: '4', name: 'Ulthuan Grey'},
                {id: '3', name: 'Military Green'},
            ]
        },
        { 
            name: 'Glue',
            materials: [
                {id: '5', name: 'Insta-Cure+™ Super Glue, CA'},
            ]
        },
    ]

    function generateOptions(selectedArray, item) {
        if (selectedArray.some(element => element.id === item.id)) {
            return <option selected value={item.name}>{item.name}</option>
        } else {
            return <option value={item.name}>{item.name}</option>
        }
    }
    function generateOptGroups(selectedArray, category) {
        let options = category.materials.map(material => generateOptions(selectedArray, material))
        let optgroup = <optgroup label={category.name}>{options}</optgroup>
        return optgroup
    }

    //Edit Table Logic
    const [inEditMode, setInEditMode] = useState({status: false, rowKey: null});
    const [stepValues, setStepValues] = useState({orderValue: null, description: null, materials: []});
    
    const onEdit = ({id, currentValues}) => {
        setInEditMode({status: true, rowKey: id})
        setStepValues(currentValues)
    }

    const onCancel = () => {
        setInEditMode({status: false, rowKey: null})
        setStepValues({orderValue: null, description: null, materials: []});
    };

    
    const onSave = ({id, newValues}) => {
        updateInventory ({id, newValues})
    }

    //Replace with call to API
    const updateInventory = ({id, newValues}) => {
        let index = props.steps.findIndex(element => element.id === id)
        props.steps[index].description = newValues.description;
        props.steps[index].orderValue = newValues.orderValue;
        props.steps[index].materials = newValues.materials
        onCancel();
    }

    props.type = "Recipe";
    return (
        <div>
            <AccordionItem  eventKey = {props.id}> 
                <AccordionHeader>
                    <Container>
                        <Row>
                            <Col>
                               {props.name}
                            </Col>
                            <Col>
                                <div class="d-flex justify-content-end">
                                    {props.projects.map(project => ProjectIcon(project))}
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div class="d-flex justify-content-end">
                                    {EditButton(props)}
                                    {DeleteButton(props)}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </AccordionHeader>
                <AccordionBody>
                    <p>{props.description}</p>
                    <hr></hr>
                    <table class='recipeStepTable'>
                        <tr>
                            <th>Step</th>
                            <th>Description</th>
                            <th>Materials</th>
                        </tr>
                        {props.steps.map(step => (
                            <tr key={step.id}>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === step.id ? (
                                            <input value={stepValues.orderValue}
                                            onChange={(event) => setStepValues({orderValue: event.target.value})}
                                            />
                                        ) : (
                                            step.orderValue
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === step.id ? (
                                            <input value={stepValues.description}
                                               onChange={(event) => setStepValues({description: event.target.value})}
                                               />
                                        ) : (
                                            step.description
                                        )
                                    }
                                </td>
                                <td>
                                    <div class="d-flex flex-row">
                                        {
                                            inEditMode.status && inEditMode.rowKey === step.id ? (
                                                <select multiple
                                                onChange={(event) => setStepValues({materials: event.target.value})}
                                                >
                                                    {materialsList.map(category => (generateOptGroups(step.materials, category)))}
                                                </select>
                                            ) : (
                                                step.materials.map(material => (MaterialIcon(material)))
                                            )
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-end">
                                    {
                                        inEditMode.status && inEditMode.rowKey === step.id ? (
                                            <React.Fragment>
                                                <Button 
                                                    variant = "success" 
                                                    onClick={() => onSave({id: step.id, newValues: {
                                                        orderValue: stepValues.orderValue, 
                                                        description: stepValues.description, 
                                                        materials: stepValues.materials
                                                    }})}
                                                >
                                                    Save
                                                </Button> 

                                                <Button variant = "danger" onClick={() => onCancel()} style={{marginLeft: 8}}>
                                                    Cancel
                                                </Button> 
                                            </React.Fragment>
                                        ) : (
                                            
                                                <Button id="iconButton"  onClick={
                                                    () => onEdit({id: step.id, currentValues: {orderValue: step.orderValue, description: step.description, materials: step.materials}})
                                                }>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Button> 
                                            
                                        )
                                    }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div  class="d-flex justify-content-center"> 
                        {AddButton({type: "Step"})}
                    </div>
                </AccordionBody>
            </AccordionItem>
        </div>
    )
}

export default RecipeAccordion;
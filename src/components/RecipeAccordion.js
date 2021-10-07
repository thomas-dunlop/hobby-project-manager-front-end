import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EditButton, DeleteButton, AddButton } from '.';
import React, {useState, useEffect} from 'react';
import getCookie from '../functions/getCookie';
import URL from '../constants';

import { ProjectIcon, MaterialIcon} from '.';

const RecipeAccordion = ({props}) => {
    const csrftoken = getCookie('csrftoken');
    const newType = {type: "Step", recipe: props.recipe.id}
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch(URL + 'data/material')
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
        })
        .then(data => {
            setPageData(data)
            setLoaded(true)
        })
        .catch(error => {
            console.error("Error fetching data", error)
        })
        .finally(() =>{
            setLoaded(true)
        })
    }, [])
    
    const materialList = pageData.map(element => generateOptGroups(element))

    function generateOptions(item) {
        return {'value': item.id, 'label': item.name}
    }
    function generateOptGroups(category) {
        let options = category.materials.map(material => generateOptions(material.material))
        let optgroup = {'label': category.category, 'options': options}
        return optgroup
    }

    //Edit Table Logic
    const getCurrentMaterials = (currentMaterials) => {
        const modifiedMaterials = currentMaterials.map(element => {
            return {'value': element.id, 'label': element.name}})
        return modifiedMaterials
    }

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

    const handleSelectChange = (selectedOption) => {
        setStepValues({
            ...stepValues,
            materials: selectedOption
        })
    }

    const updateInventory = ({id, newValues}) => {
        fetch(URL + 'data/step/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken
              },
            body: JSON.stringify(newValues)
        })
        .then(response => {
            if (response.ok) {window.location.reload()} 
        })
        .catch(error => {
            console.error("Error adding project", error)
        })

        onCancel();

    }

    if(loaded === false){
        return <p>Loading</p>
    }

    const editData = {type: "Recipe", data: props}
    return (
        <div>
            <AccordionItem  eventKey = {props.recipe.id}> 
                <AccordionHeader>
                    <Container>
                        <Row>
                            <Col>
                               {props.recipe.name}
                            </Col>
                            <Col>
                                <div class="d-flex justify-content-end">
                                    {props.projects.map(project => ProjectIcon(project))}
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div class="d-flex justify-content-end">
                                    <EditButton props={editData}/>
                                    {DeleteButton({target: 'recipe', id: props.recipe.id})}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </AccordionHeader>
                <AccordionBody>
                    <p>{props.recipe.description}</p>
                    <hr></hr>
                    <table class='recipeStepTable'>
                        <tr>
                            <th>Step</th>
                            <th>Description</th>
                            <th>Materials</th>
                        </tr>
                        {props.steps.map(step => (
                            <tr key={step.step.id}>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === step.step.id ? (
                                            <input value={stepValues.orderValue}
                                            onChange={(event) => setStepValues({...stepValues, orderValue: event.target.value})}
                                            />
                                        ) : (
                                            step.step.orderValue
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === step.step.id ? (
                                            <input value={stepValues.description}
                                               onChange={(event) => setStepValues({...stepValues, description: event.target.value})}
                                            />
                                        ) : (
                                            step.step.description
                                        )
                                    }
                                </td>
                                <td>
                                    <div class="d-flex flex-row">
                                        {
                                            inEditMode.status && inEditMode.rowKey === step.step.id ? (
                                                <Select
                                                    defaultValue={[]}
                                                    isMulti
                                                    value={stepValues.materials}
                                                    onChange = {handleSelectChange}
                                                    options={materialList}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                            />
                                            ) : (
                                                step.materials.map(material => (MaterialIcon(material)))
                                            )
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-end">
                                    {
                                        inEditMode.status && inEditMode.rowKey === step.step.id ? (
                                            <React.Fragment>
                                                <Button 
                                                    variant = "success" 
                                                    onClick={() => onSave({id: step.step.id, newValues: {
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
                                                    () => onEdit({id: step.step.id, currentValues: {orderValue: step.step.orderValue, description: step.step.description, materials: getCurrentMaterials(step.materials)}})
                                                }>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Button> 
                                            
                                        )
                                    }
                                    {DeleteButton({target: 'step', id: step.step.id})}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div  class="d-flex justify-content-center"> 
                        <AddButton props={newType}/>
                    </div>
                </AccordionBody>
            </AccordionItem>
        </div>
    )
}

export default RecipeAccordion;
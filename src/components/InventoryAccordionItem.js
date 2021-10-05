import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { ProjectIcon, DeleteButton, EditButton, AddButton } from '.';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import getCookie from '../functions/getCookie';

const InventoryAccordionItem = ({props}) => {
    const newType = {type: "Item", material: props.material.id}
    const editData = {type: "Material", data: props}
    const csrftoken = getCookie('csrftoken');
    //Edit Table Logic
    const [inEditMode, setInEditMode] = useState({status: false, rowKey: null});
    const [itemValues, setItemValues] = useState({lotNumber: null, expiryDate: null});
    
    const onEdit = ({id, currentValues}) => {
        setInEditMode({status: true, rowKey: id})
        setItemValues(currentValues)
    }

    const onCancel = () => {
        setInEditMode({status: false, rowKey: null})
        setItemValues({lotNumber: null, expiryDate: null});
    };

    
    const onSave = ({id, newValues}) => {
        updateInventory ({id, newValues})
    }

    //Replace with call to API
    const updateInventory = ({id, newValues}) => {
        fetch('http://127.0.0.1:8000/data/inventory/' + id, {
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

    return (
        <AccordionItem eventKey = {props.material.id}>
            <AccordionHeader>
                <Container>
                    <Row>
                        <Col xs={2}><Badge bg="secondary">{props.inventory.length}</Badge> {props.material.name}</Col>
                        <Col xs={2}>{props.material.partNumber}</Col>
                        <Col xs={2}>{props.material.company}</Col>
                        <Col xs={1}><a href={props.material.link}>Link</a></Col>
                        {<Col>
                            <div class="d-flex flex-row">
                                {props.projects.map(project => (ProjectIcon(project)))}
                            </div>
                        </Col>}
                        <Col xs={1}>
                            <div class="d-flex flex-row">
                                <EditButton props={editData}/>
                                {DeleteButton({target: 'material', id: props.material.id})}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </AccordionHeader>
            <AccordionBody>
                <table>
                    <tr>
                        <th>Lot Number</th>
                        <th>Expiry Date (YYYY/MM/DD)</th>
                    </tr>
                    {props.inventory.map(item => (
                        <tr key={item.id}>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={itemValues.lotNumber}
                                        onChange={(event) => setItemValues({...itemValues, lotNumber: event.target.value})}
                                        />
                                    ) : (
                                        item.lotNumber
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={itemValues.expiryDate}
                                        onChange={(event) => setItemValues({...itemValues, expiryDate: event.target.value})}
                                        type='date'
                                        />
                                    ) : (
                                        item.expiryDate
                                    )
                                }
                            </td>
                            <td>
                                <div class="d-flex flex-row">
                                    <div class="d-flex justify-content-end">
                                    {
                                        inEditMode.status && inEditMode.rowKey === item.id ? (
                                            <React.Fragment>
                                                <Button variant = "success" onClick={() => onSave({id: item.id, newValues: {lotNumber: itemValues.lotNumber, expiryDate: itemValues.expiryDate}})}>
                                                    Save
                                                </Button> 

                                                <Button variant = "danger" onClick={() => onCancel()} style={{marginLeft: 8}}>
                                                    Cancel
                                                </Button> 
                                            </React.Fragment>
                                        ) : (
                                            
                                                <Button id="iconButton"  onClick={
                                                    () => onEdit({id: item.id, currentValues: {lotNumber: item.lotNumber, expiryDate: item.expiryDate}})
                                                }>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Button> 
                                            
                                        )
                                    }
                                    {DeleteButton({target: 'inventory', id: item.id})}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
                <div  class="d-flex justify-content-center"> 
                    <AddButton props={newType} />
                </div>
            </AccordionBody>
        </AccordionItem>
        
    )
}

export default InventoryAccordionItem;
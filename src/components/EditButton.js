import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { EditRecipeForm, EditProjectDescriptionForm, EditMaterialForm } from '.';

const EditButton = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    let form
    if (props.type === "projectDescription") {
        form = EditProjectDescriptionForm(props)
    } else if (props.type === "Recipe"){
        form = EditRecipeForm(props)
    } else if (props.type === "Material") {
        form = EditMaterialForm(props)
    } else {
        form = "Error, need to build form"
    }


    return (
        <div>
            <Button id="iconButton"  onClick={handleShow}>
                <FontAwesomeIcon icon={faEdit}/>
            </Button>   

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{form}</Modal.Body>
            </Modal>          
        </div>
    )
}

export default EditButton;
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { NewProjectForm, NewRecipeForm, NewStepForm, NewMaterialForm, NewItemForm, AddRecipeForm} from '.';

const AddButton = ({props}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    let form
    let height = "90px";
    let width = "90px";
    let size = '4x'

    if (props.type === "Project") {
        form = NewProjectForm(props)
    } else if (props.type === "Recipe"){
        form = NewRecipeForm(props)
    } else if (props.type === 'Step') {
        height = "54px";
        width = "54px";
        size = '2x';
        form = NewStepForm(props)
    } else if (props.type === 'Item') {
        height = "54px";
        width = "54px";
        size = '2x';
        form = NewItemForm(props)
    } else if (props.type === "Material") {
        form = NewMaterialForm(props)
    } else {
        form = "Error, need to build form"
    }

    return (
        <div class='d-flex justify-content-center'>
            <Button id="iconButton" onClick={handleShow} style={{
                height: height,
                width: width,
            }}>
                <FontAwesomeIcon icon={faPlusCircle} size={size}/>
            </Button>    

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New {props.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{form}</Modal.Body>
            </Modal>        
        </div>
        
    )
}

export default AddButton;
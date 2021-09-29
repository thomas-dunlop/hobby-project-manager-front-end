import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteButton = (props) => {
    return (
        <div>
            <Button id="iconButton" href = {"/Projects"}>
                <FontAwesomeIcon icon={faTrash}/>
            </Button>            
        </div>
    )
}

export default DeleteButton;
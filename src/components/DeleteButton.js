import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import getCookie from '../functions/getCookie';

const DeleteButton = (props) => {
    const url = 'http://127.0.0.1:8000/data/' + props.target + '/' + props.id
    const csrftoken = getCookie('csrftoken');
    const handleSubmit = (event) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRFTOKEN': csrftoken
              },
        })
        .then(response => {
            if (response.ok) {
                window.location.reload()
            } 
        })
        .catch(error => {
            console.error("Error adding project", error)
        })
        event.preventDefault()
    }

    return (
        <div>
            <Button id="iconButton" onClick = {handleSubmit}>
                <FontAwesomeIcon icon={faTrash}/>
            </Button>            
        </div>
    )
}

export default DeleteButton;
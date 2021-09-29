import Button from 'react-bootstrap/Button';

const MaterialIcon = (props) => {
    return (
        <div>
            <Button href = {"/Inventory"} style={{
                marginLeft: '5px',
                marginRight: '5px',
            }}>
                {props.name}
            </Button>{' '}
        </div>
    )
}

export default MaterialIcon;
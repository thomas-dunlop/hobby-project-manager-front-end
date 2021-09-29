import Button from 'react-bootstrap/Button';

const ProjectIcon = (props) => {
    return (
        <div>
            <Button href = {"/Projects/" + props.id} style={{
                backgroundImage: `url('${props.img}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                border: 'none',
                marginLeft: '5px',
                marginRight: '5px',
            }}>
                {props.name}
            </Button>{' '}
        </div>
    )
}

export default ProjectIcon;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CSRFToken from './csrftoken';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import getCookie from '../functions/getCookie';
import URL from '../constants';

const NewRecipeForm = (props) => {
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [value, setValue] = useState({
        name: '',
        description: '',
        projects: []
    })
    const csrftoken = getCookie('csrftoken');

    useEffect(() => {
        //Replace with API variable
        fetch(URL + 'data/project')
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

    
    const projectList = pageData.map(element =>  {
        return {'value': element.id, 'label': element.name}
    })
    
    const handleChange = (event) => {
        const target = event.target
        const name = target.name
        let data = target.value
        setValue({
            ...value,
            [name]: data
        })
    }

    const handleSelectChange = (selectedOption) => {
        setValue({
            ...value,
            projects: selectedOption
        })
    }

    const handleSubmit = (event) => {
        fetch(URL + 'data/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken
              },
            body: JSON.stringify(value)
        })
        .then(response => {
            if (response.ok) {window.location.reload()} 
        })
        .catch(error => {
            console.error("Error adding project", error)
        })

        setValue({
            name: '',
            description: '',
            projects: []
        })

        event.preventDefault()
    }

    if(loaded === false){
        return <p>Loading</p>
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <CSRFToken />
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={value.name} onChange = {handleChange} placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={value.description} onChange = {handleChange} placeholder="Enter Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projects">
                    <Form.Label>Projects</Form.Label>
                    <Select
                        defaultValue={[]}
                        isMulti
                        value={value.projects}
                        onChange = {handleSelectChange}
                        options={projectList}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewRecipeForm;
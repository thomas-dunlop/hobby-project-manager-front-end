import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CSRFToken from './csrftoken';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import getCookie from '../functions/getCookie';

const NewProjectForm = (props) => {
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [value, setValue] = useState({
        name: '',
        description: '',
        notes: '',
        image: '',
        status: 'active',
        recipes: []
    })
    const csrftoken = getCookie('csrftoken');

    useEffect(() => {
        //Replace with API variable
        fetch('http://127.0.0.1:8000/data/recipe')
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

    
    const recipeList = pageData.map(element =>  {
        return {'value': element.recipe.id, 'label': element.recipe.name}
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
            recipes: selectedOption
        })
    }

    const handleSubmit = (event) => {
        fetch('http://127.0.0.1:8000/data/project', {
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
            notes: '',
            image: '',
            status: 'active',
            recipes: ''
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

                <Form.Group className="mb-3" controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" name="notes" value={value.notes} onChange = {handleChange} type="text" placeholder="Enter Notes" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Link to Image</Form.Label>
                    <Form.Control type="url"  name="image" value={value.image} onChange = {handleChange} placeholder="Enter URL to Image" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projects">
                    <Form.Label>Recipes</Form.Label>
                    <Select
                        defaultValue={[]}
                        isMulti
                        value={value.recipes}
                        onChange = {handleSelectChange}
                        options={recipeList}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewProjectForm;
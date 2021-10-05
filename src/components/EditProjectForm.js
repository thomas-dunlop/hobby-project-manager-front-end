import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CSRFToken from './csrftoken';
import { useState, useEffect } from 'react';
import getCookie from '../functions/getCookie';
import Select from 'react-select';

const EditProjectForm = (props) => {
    const currentRecipes = props.recipes.map(element => {
        return {'value': element.recipe.id, 'label': element.recipe.name}
    })
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [value, setValue] = useState({
        name: props.project.name,
        description: props.project.description,
        notes: props.project.notes, 
        image: props.project.image,
        status: 'active',
        recipes: currentRecipes
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
        fetch('http://127.0.0.1:8000/data/project/' + props.project.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrftoken
              },
            body: JSON.stringify(value)
        })
        .then(response => {
            if (response.ok) {} 
        })
        .catch(error => {
            console.error("Error adding project", error)
        })

        setValue({
            name: props.name,
            description: props.description,
            notes: props.notes, 
            image: props.image,
            status: 'active',
            recipes: currentRecipes
        })
    }

    if(loaded === false){
        return <p>Loading</p>
    }

    return (
        <div>
            <CSRFToken />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={value.name} onChange = {handleChange} placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={value.description} onChange = {handleChange} placeholder="Enter Description"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" type="text" name="notes" value={value.notes} onChange = {handleChange} placeholder="Put your thoughts here!"/>
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

export default EditProjectForm;
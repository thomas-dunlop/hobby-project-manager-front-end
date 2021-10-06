import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CSRFToken from './csrftoken';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import getCookie from '../functions/getCookie';

const AddRecipeForm = (props) => {

    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [value, setValue] = useState({
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
            if (response.ok) {
                window.location.reload()
            } 
        })
        .catch(error => {
            console.error("Error adding project", error)
        })

        setValue({
            recipes: []
        })
        event.preventDefault()
    }

    if(loaded === false){
        return <p>Loading</p>
    }

    return (
        <div >
        <h5>Add Existing Recipe</h5>
        <Form onSubmit={handleSubmit}>
            <CSRFToken />
            <Form.Group className="mb-3" controlId="projectRecipes">
                <Form.Group className="mb-3" controlId="projects">
                    <Select
                        defaultValue={[]}
                        isMulti
                        value={value.projects}
                        onChange = {handleSelectChange}
                        options={recipeList}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </Form.Group>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <hr></hr>
        <p class="d-flex justify-content-center">or</p>
        <hr></hr>
        <h5>Create New Recipe</h5>
        </div>
    )
}

export default AddRecipeForm;

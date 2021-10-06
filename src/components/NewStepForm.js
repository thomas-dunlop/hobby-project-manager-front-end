import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CSRFToken from './csrftoken';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import getCookie from '../functions/getCookie';

const NewStepForm = (props) => {
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [value, setValue] = useState({
        orderValue: '',
        description: '',
        materials: [],
        recipe: props.recipe
    })
    const csrftoken = getCookie('csrftoken');

    useEffect(() => {
        //Replace with API variable
        fetch('http://127.0.0.1:8000/data/material')
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

    
    const materialList = pageData.map(element => generateOptGroups(element))

    function generateOptions(item) {
        return {'value': item.id, 'label': item.name}
    }
    function generateOptGroups(category) {
        let options = category.materials.map(material => generateOptions(material.material))
        let optgroup = {'label': category.category, 'options': options}
        return optgroup
    }
    
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
            materials: selectedOption
        })
    }

    const handleSubmit = (event) => {
        fetch('http://127.0.0.1:8000/data/step', {
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
            orderValue: '',
            description: '',
            materials: [],
            recipe: props.recipe
        })

        event.preventDefault()
    }

    if(loaded === false){
        return <p>Loading</p>
    }

    //Replace with API call
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <CSRFToken />
                <Form.Group className="mb-3" controlId="orderValue">
                    <Form.Label>Step Number</Form.Label>
                    <Form.Control type="number" name="orderValue" value={value.orderValue} onChange = {handleChange} placeholder="Enter Step Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={value.description} onChange = {handleChange} placeholder="Enter Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="materials">
                    <Form.Label>Materials</Form.Label>
                    <Select
                        defaultValue={[]}
                        isMulti
                        value={value.materials}
                        onChange = {handleSelectChange}
                        options={materialList}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewStepForm;
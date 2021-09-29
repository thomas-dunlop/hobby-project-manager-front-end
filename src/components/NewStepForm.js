import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewStepForm = (props) => {
    //Replace with API call
    const materialsList = [
        { 
            name: 'Paint',
            materials: [
                {name: 'Gal Vorbak Red'},
                {name: 'Celestra Grey'},
                {name: 'Ulthuan Grey'},
                {name: 'Military Green'},
            ]
        },
        { 
            name: 'Glue',
            materials: [
                {name: 'Insta-Cure+™ Super Glue, CA'},
            ]
        },
    ]

    function generateOptions(item) {
        return <option value={item.name}>{item.name}</option>
    }
    function generateOptGroups(category) {
        let options = category.materials.map(material => generateOptions(material))
        let optgroup = <optgroup label={category.name}>{options}</optgroup>
        return optgroup
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="orderValue">
                    <Form.Label>Step Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter Step Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="StepDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectRecipes">
                    <Form.Label>Recipes</Form.Label>
                    <Form.Select multiple>
                        {materialsList.map(category => (generateOptGroups(category)))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewStepForm;
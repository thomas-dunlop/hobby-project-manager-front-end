import {Header, RecipeAccordion} from '../components';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import { AddButton } from '../components';
import { useEffect, useState } from 'react';

const Recipes = () => {
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const newType = {type: "Recipe", directAdd: false} 

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

    if(loaded === false){
        return <p>Loading</p>
    }
    
    return (
        <div>
            <Header />
            <br></br>
            <Container>
                <Accordion>
                    {pageData.map(item => {
                        return <RecipeAccordion props={item} />
                        })
                    }
                </Accordion>
            </Container>
            <br></br>
            <Container>
                <AddButton props={newType} />
            </Container>
        </div>
    )
}

export default Recipes;
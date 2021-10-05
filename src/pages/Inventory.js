import Container from 'react-bootstrap/Container';
import {Header} from '../components';
import { InventoryCategoryAccordion } from '../components';
import { useEffect, useState } from 'react';

const Inventory = () => {
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    
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

    if(loaded === false){
        return <p>Loading</p>
    }
   
    return (
        <div>
            <Header />
            <Container>
                {pageData.map(category => (InventoryCategoryAccordion(category)))}
            </Container>
        </div>
    )
}

export default Inventory;
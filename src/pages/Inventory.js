import Container from 'react-bootstrap/Container';
import {Header} from '../components';
import { InventoryCategoryAccordion, AddButton} from '../components';
import { useEffect, useState } from 'react';
import URL from '../constants';

const Inventory = () => {
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const newType = {type: "Category"}
    
    useEffect(() => {
        fetch(URL + 'data/material')
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
            <br></br>
            <Container>
                <AddButton props={newType} />
            </Container>
        </div>
    )
}

export default Inventory;
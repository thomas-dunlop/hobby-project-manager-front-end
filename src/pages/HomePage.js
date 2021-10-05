import {Header, ProjectCard, AddButton} from '../components';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [pageData, setPageData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const newType = {type: "Project"} 

    useEffect(() => {
        //Replace with API variable
        fetch('http://127.0.0.1:8000/data/project')
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
            <Container >
                {pageData.map(item => ProjectCard(item))}
            </Container>
            <Container>
                <AddButton props={newType} />
            </Container>
            </div>
    )
}

export default HomePage;
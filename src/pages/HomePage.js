import {Header, ProjectCard, AddButton} from '../components';
import Container from 'react-bootstrap/Container';

const HomePage = () => {
    //Replace with call to API
    const projectList = [
        {id: '1', name: "Empire of Dust", img: "https://i2.wp.com/dash28.org/wp-content/uploads/2020/01/pasted-image-0-2.png?fit=1307%2C747&ssl=1"},
        {id: '2', name: "Late War Wehrmatch", img: "https://cdn.shopify.com/s/files/1/0814/4233/products/12527787_10156646466715257_897851306_n_grande.jpg?v=1548046121"},
        {id: '3', name: "Sanguine Fists", img: "https://www.warhammer-community.com/wp-content/uploads/2019/10/40kDarcyIFShowcase-Oct23-MkIVSquad4yhs.jpg"}
    ]
    const newType = {type: "Project"} 
    return (
        <div>
            <Header />
            <br></br>
            <Container >
                {projectList.map(item => ProjectCard(item))}
            </Container>
            <Container>
                {AddButton(newType)}
            </Container>
        </div>
    )
}

export default HomePage;
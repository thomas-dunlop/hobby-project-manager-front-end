import {Header, RecipeAccordion} from '../components';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import { AddButton } from '../components';

const Recipes = () => {
    //Replace with API call
    const recipeList = [
        {
            id: "1",
            name: "Faded Red Cloth",
            description: "Fadded red cloth recipe using stippling with a drybrush.",
            projects: [
                {id: '1', name: "Empire of Dust", img: "https://i2.wp.com/dash28.org/wp-content/uploads/2020/01/pasted-image-0-2.png?fit=1307%2C747&ssl=1"},
                {id: '2', name: "Late War Wehrmatch", img: "https://cdn.shopify.com/s/files/1/0814/4233/products/12527787_10156646466715257_897851306_n_grande.jpg?v=1548046121"}
            ],
            steps: [
                {
                    id: '1',
                    orderValue: '1', 
                    description: "Basecoat with galvorback red",
                    materials: [
                        {id: '1', name: "Gal Vorbak Red"}
                    ]
                }
            ]
        },
        {
            id: "2",
            name: "Sanguine Fist Armor",
            description: "Recipe for white power armor with green shadows ",
            projects: [
                {id: '3', name: "Sanguine Fists", img: "https://www.warhammer-community.com/wp-content/uploads/2019/10/40kDarcyIFShowcase-Oct23-MkIVSquad4yhs.jpg"}
            ],
            steps: [
                {
                    id: '2',
                    orderValue: '1', 
                    description: "Basecoat with 50/50 mix of celestra grey and military green",
                    materials: [
                        {id: '2', name: "Celestra Grey"},
                        {id: '3', name: "Military Green"}
                    ]
                }, 
                {
                    id: '3',
                    orderValue: '2', 
                    description: "Zenithally apply ulthuan grey to model with airbrush",
                    materials: [
                        {id: '4', name: "Uthuan Grey"},
                    ]
                }
            ]
        }
    ]
    const newType = {type: "Recipe", directAdd: false} 
    return (
        <div>
            <Header />
            <br></br>
            <Container>
                <Accordion>
                    {recipeList.map(item => RecipeAccordion(item))}
                </Accordion>
            </Container>
            <br></br>
            <Container>
                {AddButton(newType)}
            </Container>
        </div>
    )
}

export default Recipes;
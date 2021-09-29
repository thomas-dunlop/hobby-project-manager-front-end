import Container from 'react-bootstrap/Container';
import {Header} from '../components';
import { InventoryCategoryAccordion } from '../components';

const Inventory = () => {
    //Replace with API call
    const inventoryList = [
        {
            name: 'Paint',
            materials: [
                {
                    id: '1',
                    name: 'Gal Vorbak Red',
                    partNumber: 'N/A',
                    company: 'Games Workshop',
                    link: 'https://www.games-workshop.com/en-CA/Base-Gal-Vorbak-Red-2019',
                    projects: [
                        {id: '1', name: "Empire of Dust", img: "https://i2.wp.com/dash28.org/wp-content/uploads/2020/01/pasted-image-0-2.png?fit=1307%2C747&ssl=1"},
                        {id: '2', name: "Late War Wehrmatch", img: "https://cdn.shopify.com/s/files/1/0814/4233/products/12527787_10156646466715257_897851306_n_grande.jpg?v=1548046121"}
                    ],
                    items: [
                        {id: '1', lotNumber: '1234', expiryDate: '2021/10/12'},
                        {id: '2', lotNumber: '4321', expiryDate: '2021/12/24'}
                    ]
                }, 
                {
                    id: '2',
                    name: 'Celestra Grey',
                    partNumber: 'N/A',
                    company: 'Games Workshop',
                    link: 'https://www.games-workshop.com/en-CA/Base-Celestra-Grey-2019',
                    projects: [
                        {id: '3', name: "Sanguine Fists", img: "https://www.warhammer-community.com/wp-content/uploads/2019/10/40kDarcyIFShowcase-Oct23-MkIVSquad4yhs.jpg"}
                    ],
                    items: [
                        {id: '3', lotNumber: '1234', expiryDate: '2021/10/12'},
                        {id: '4', lotNumber: '4321', expiryDate: '2021/12/24'}
                    ]
                },
                {
                    id: '4',
                    name: 'Ulthuan Grey',
                    partNumber: 'N/A',
                    company: 'Games Workshop',
                    link: 'https://www.games-workshop.com/en-CA/Layer-Ulthuan-Grey-2019',
                    projects: [
                        {id: '3', name: "Sanguine Fists", img: "https://www.warhammer-community.com/wp-content/uploads/2019/10/40kDarcyIFShowcase-Oct23-MkIVSquad4yhs.jpg"}
                    ],
                    items: [
                        {id: '5', lotNumber: '1234', expiryDate: '2021/10/12'},
                        {id: '6', lotNumber: '4321', expiryDate: '2021/12/24'}
                    ]
                },
                {
                    id: '3',
                    name: 'Military Green',
                    partNumber: '70.975',
                    company: 'Vallejo',
                    link: 'https://acrylicosvallejo.com/en/product/hobby/model-color-en/military-green-70975/',
                    projects: [
                        {id: '3', name: "Sanguine Fists", img: "https://www.warhammer-community.com/wp-content/uploads/2019/10/40kDarcyIFShowcase-Oct23-MkIVSquad4yhs.jpg"}
                    ],
                    items: [
                        {id: '7', lotNumber: '1234', expiryDate: '2021/10/12'},
                    ]
                }
            ]
        }, 
        {
            name: 'Glue',
            materials: [
                {
                    id: '5',
                    name: 'Insta-Cure+™ Super Glue, CA',
                    partNumber: 'BSI-106',
                    company: 'bSi',
                    link: 'https://bsi-inc.com/hobby/insta_cure_plus.html',
                    projects: [
                        {id: '1', name: "Empire of Dust", img: "https://i2.wp.com/dash28.org/wp-content/uploads/2020/01/pasted-image-0-2.png?fit=1307%2C747&ssl=1"},
                        {id: '2', name: "Late War Wehrmatch", img: "https://cdn.shopify.com/s/files/1/0814/4233/products/12527787_10156646466715257_897851306_n_grande.jpg?v=1548046121"},
                        {id: '3', name: "Sanguine Fists", img: "https://www.warhammer-community.com/wp-content/uploads/2019/10/40kDarcyIFShowcase-Oct23-MkIVSquad4yhs.jpg"}
                    ],
                    items: [
                        {id: '8', lotNumber: '1234', expiryDate: '2021/10/12'},
                        {id: '9', lotNumber: '4321', expiryDate: '2021/12/24'}
                    ]
                }
            ]
        }
    ];
    return (
        <div>
            <Header />
            <Container>
                {inventoryList.map(category => (InventoryCategoryAccordion(category)))}
            </Container>
        </div>
    )
}

export default Inventory;
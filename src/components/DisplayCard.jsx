import './DisplayCard.css'
import { CardTemp } from './CardTemp';

export function DisplayCard({ image, callback }) {
    return (
        <div id="gameboard" onClick={callback}>
        {
        image.map((elem, i) => 
            <CardTemp
            key={elem.name}
            name={elem.name}
            image={(elem.image)}
        > 
        </CardTemp> 
        )
        }
        </div>
    )
}
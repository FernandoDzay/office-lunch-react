import './food-card.scss';
import Button from './Button';
import img from '../../../libraries/assets/img/default_image.jpg';

export default function FoodCard({title}) {

    return (
        <div className='food-card'>
            <img src={img} alt="Comida" title="Comida" />
            <p className="title">empanizados de pollo</p>
            <Button text="agregar" />
        </div>
    );
}
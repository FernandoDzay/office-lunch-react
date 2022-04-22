import '../food-card.scss';
import defaultImg from '../../../../libraries/assets/img/default_image.jpg';
import Button from '../FoodCardComponents/Button';

export default function FoodCard({full_name, image, loading, children, mainClick, btnText}) {
    
    const api_url = process.env.REACT_APP_API_URL;
    let foodImage = image === 'default.jpg' ? defaultImg : `${api_url}/images/food/${image}`;
    if(image === undefined) foodImage = defaultImg;
    
    return (
        <div className='food-card'>
            <img src={foodImage} alt="Comida" title="Comida" />
            <p className="title">{full_name}</p>
            { children }
            <Button text={btnText} loading={loading} onClick={mainClick} />
        </div>
    );
}
import '../food-card.scss';
import defaultImg from '../../../../libraries/assets/img/default_image.jpg';
import Button from '../FoodCardComponents/Button';
import { useEffect, useState } from 'react';

export default function FoodCard({full_name, image, loading, children, mainClick, btnText}) {
    const api_url = process.env.REACT_APP_API_URL;
    const [foodImage, setFoodImage] = useState(null);

    useEffect(() => {
        let foodImage = image === 'default.jpg' ? defaultImg : `${api_url}/images/foods/${image}`;
        if(image === undefined) foodImage = defaultImg;
        setFoodImage(foodImage);
    }, [image, api_url]);

    
    return (
        <div className='food-card'>
            <img src={foodImage} alt="Comida" title="Comida" height="328" onError={() => setFoodImage(defaultImg)} />
            <p className="title">{full_name}</p>
            { children }
            <Button text={btnText} loading={loading} onClick={mainClick} />
        </div>
    );
}
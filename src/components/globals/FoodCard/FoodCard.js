import { useState } from 'react';
import GenericFoodCard from './inheritance/FoodCard';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { useDispatch } from 'react-redux';

const FoodCard = ({id, full_name, image}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const addFood = () => {
        setLoading(true);
        fetch(`${api_url}/orders/create-user-order`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({food_id: id})
        })
        .then(r => r.json())
        .then(r => dispatch(getUserOrders()))
        .catch(e => console.log(e))
        .finally(r =>setLoading(false));
    }
    
    return <GenericFoodCard full_name={full_name} image={image} loading={loading} mainClick={addFood} btnText="Agregar" />;
}


export default FoodCard;
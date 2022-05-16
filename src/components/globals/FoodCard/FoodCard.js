import API from '../../../class/API';
import GenericFoodCard from './inheritance/FoodCard';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const FoodCard = ({id, full_name, image}) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.layout);
    const dispatch = useDispatch();

    const addFood = () => {
        setLoading(true);
        API('POST', '/orders/create-user-order', {food_id: id})
        .then(r => dispatch(getUserOrders(user.id)))
        .catch(e => {})
        .finally(r =>setLoading(false));
    }
    
    return <GenericFoodCard full_name={full_name} image={image} loading={loading} mainClick={addFood} btnText="Agregar" />;
}


export default FoodCard;
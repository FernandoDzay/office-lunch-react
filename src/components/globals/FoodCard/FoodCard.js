import API from '../../../class/API';
import GenericFoodCard from './inheritance/FoodCard';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { openModal } from '../../../store/slices/ordersSlice';
import { getMenu } from '../../../store/slices/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const FoodCard = ({id, full_name, image}) => {
    const [loading, setLoading] = useState(false);
    const { user, activeSideBar } = useSelector(state => state.layout);
    const dispatch = useDispatch();

    const addFood = () => {
        setLoading(true);
        API('POST', '/orders/create-user-order', {food_id: id})
        .then(r => {
            dispatch(getUserOrders(user.id));
            if(!activeSideBar) dispatch(openModal({title: "Correcto!", description: 'Tu comida ha sido añadida', nextStep: 'success'}));
        })
        .catch(e => {
            if(e.data && e.data.display) dispatch(openModal({title: e.data.display, description: '', nextStep: 'fail'}));
            else dispatch(openModal({title: 'Error', description: 'Ocurrió un error al añadir tu pedido', nextStep: 'fail'}));
            dispatch(getMenu());
        })
        .finally(r =>setLoading(false));
    }
    
    return <GenericFoodCard full_name={full_name} image={image} loading={loading} mainClick={addFood} btnText="Agregar" />;
}


export default FoodCard;
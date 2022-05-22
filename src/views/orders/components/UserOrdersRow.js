import IconButton from '../../../components/globals/IconButton/IconButton';
import API from '../../../class/API';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { useState } from 'react';


const UserOrdersRow = ({order}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.layout);

    const handleClick = () => {
        const body = order.food_id !== undefined ? {food_id: order.food_id} : {extra_id: order.extra_id};

        setLoading(true);
        API('DELETE', '/orders/delete-user-order', body)
        .then(r => dispatch(getUserOrders(user.id)))
        .catch(e => setLoading(false));
    }

    return (
        <tr>
            <td>{ order.name }</td>
            <td>{ order.user_price }</td>
            <td>
                <IconButton color="red" icon="delete" onClick={handleClick} loading={loading} />
            </td>
        </tr>
    );
}

export default UserOrdersRow;
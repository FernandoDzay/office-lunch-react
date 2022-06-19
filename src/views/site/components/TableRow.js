import { useState } from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../../class/API';
import { openModal } from '../../../store/slices/ordersSlice';
import { getMenu } from '../../../store/slices/menuSlice';


const TableRow = ({index, extra}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user, activeSideBar } = useSelector(state => state.layout);

    const handleClick = () => {
        setLoading(true);
        API('POST', '/orders/create-user-order', {extra_id: extra.id})
        .then(r => {
            dispatch(getUserOrders(user.id));
            if(!activeSideBar) dispatch(openModal({title: "Correcto!", description: 'Tu extra ha sido añadida', nextStep: 'success'}));
        })
        .catch(e => {
            if(e.data && e.data.display) dispatch(openModal({title: e.data.display, description: '', nextStep: 'fail'}));
            else dispatch(openModal({title: 'Error', description: 'Ocurrió un error al añadir tu pedido', nextStep: 'fail'}));
            dispatch(getMenu());
        })
        .finally(r =>setLoading(false));
    }

    return (
        <tr>
            <td>{index}</td>
            <td>{extra.name}</td>
            <td>{extra.price}</td>
            <td><IconButton color="blue" icon="plus" loading={loading} onClick={handleClick} /></td>
        </tr>
    );
}


export default TableRow;
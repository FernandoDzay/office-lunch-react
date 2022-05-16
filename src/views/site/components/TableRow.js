import { useState } from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../../class/API';


const TableRow = ({index, extra}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.layout);

    const handleClick = () => {
        setLoading(true);
        API('POST', '/orders/create-user-order', {extra_id: extra.id})
        .then(async r => {
            await dispatch(getUserOrders(user.id));
            setLoading(false);
        })
        .catch(e => setLoading(false));
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
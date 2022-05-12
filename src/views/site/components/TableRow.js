import { useState } from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { useDispatch } from 'react-redux';


const TableRow = ({index, extra}) => {
    const dispatch = useDispatch();

    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(false);


    const handleClick = () => {
        setLoading(true);
        fetch(`${api_url}/orders/create-user-order`, {
            method: 'POST',
            headers: {Authorization: `bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({extra_id: extra.id})
        })
        .then(r => r.json())
        .then(async data => {
            await dispatch(getUserOrders());
            setLoading(false);
        })
        .catch(error => setLoading(false));
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
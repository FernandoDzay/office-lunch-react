import {useState} from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import {connect} from 'react-redux';
import {getUserOrders} from '../../../redux/actions/layoutActions';


const TableRow = ({index, extra, getUserOrders}) => {
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
            await getUserOrders();
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


const mapDispatchToProps = dispatch => ({getUserOrders: () => dispatch(getUserOrders())});
export default connect(null, mapDispatchToProps)(TableRow);
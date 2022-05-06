import {useState} from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import {getMenu} from '../../container/actions';
import {connect} from 'react-redux';


const MenuTableRow = ({id, index, food, getMenu}) => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(false);

    const handleDeleteMenu = async () => {
        setLoading(true);
        await fetch(`${api_url}/menu/remove-food/${id}`, {method: 'DELETE', headers: {Authorization: `bearer ${token}`}});
        await getMenu();
        setLoading(false);
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{food.full_name}</td>
            <td>{food.price}</td>
            <td>{food.discount}</td>
            <td><IconButton loading={loading} onClick={handleDeleteMenu} icon="delete" color="red" /></td>
        </tr>
    );
}


const mapDispatchToProps = dispatch => ({getMenu: () => dispatch(getMenu())});
export default connect(null, mapDispatchToProps)(MenuTableRow);
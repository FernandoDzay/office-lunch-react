import {useState} from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { getMenu } from '../../../store/slices/menuSlice';
import { useDispatch } from 'react-redux';


const MenuTableRow = ({id, index, food}) => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteMenu = () => {
        setLoading(true);
        fetch(`${api_url}/menu/remove-food/${id}`, {method: 'DELETE', headers: {Authorization: `bearer ${token}`}})
        .then(r => dispatch(getMenu()))
        .catch(e => setLoading(false));
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


export default MenuTableRow;
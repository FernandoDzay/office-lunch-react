import {useState} from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { getMenu } from '../../../store/slices/menuSlice';
import { useDispatch } from 'react-redux';
import API from '../../../class/API';
import { openModal } from '../../../store/slices/ordersSlice';


const MenuTableRow = ({id, index, food}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteMenu = () => {
        setLoading(true);
        API('DELETE', `/menu/remove-food/${id}`)
        .then(r => dispatch(getMenu()))
        .catch(e => {
            dispatch(openModal({
                title:  'Ups!',
                description:  e.data && e.data.error ? e.data.error : 'Ocurrió un error interno',
                nextStep: 'fail'
            }));
            setLoading(false)
        });
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
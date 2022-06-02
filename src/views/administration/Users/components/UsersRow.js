import { useDispatch } from 'react-redux';
import IconButton from '../../../../components/globals/IconButton/IconButton';
import { openModal } from '../../../../store/slices/usersSlice';


const UsersRow = ({user}) => {
    const months = [null, 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( openModal(user.id) );
    }
    

    return (
        <tr>
            <td>{ user.username }</td>
            <td>{ user.email }</td>
            <td>{ `${months[user.birth_month]} ${user.birth_day}`}</td>
            <td>{ user.is_admin ? 'Administrador' : 'Normal' }</td>
            <td>{ user.status }</td>
            <td>
                <IconButton color="blue" icon="edit" onClick={handleClick} />
            </td>
        </tr>
    );
}

export default UsersRow;
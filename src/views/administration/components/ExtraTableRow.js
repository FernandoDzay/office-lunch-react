import { useState } from 'react';
import { getExtras } from '../../../store/slices/extrasSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IconButton from '../../../components/globals/IconButton/IconButton';


const ExtraTableRow = ({index, extra}) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const handleEditExtra = () => navigate(`/edit-extra?id=${extra.id}`);
    const handleDeleteExtra = async () => {
        setDeleteLoading(true);
        fetch(`${api_url}/extras/delete/${extra.id}`, {method: 'DELETE', headers: {Authorization: `bearer ${token}`}})
        .then(r => dispatch(getExtras()))
        .catch(e => setDeleteLoading(false));
    }


    return (
        <tr>
            <td>{index + 1}</td>
            <td>{extra.name}</td>
            <td>{extra.price}</td>
            <td><IconButton color="orange" icon="edit" onClick={handleEditExtra} /></td>
            <td><IconButton color="red" icon="delete" loading={deleteLoading} onClick={handleDeleteExtra} /></td>
        </tr>
    );

}


export default ExtraTableRow;
import { useState } from 'react';
import { getExtras } from '../../../store/slices/extrasSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IconButton from '../../../components/globals/IconButton/IconButton';
import API from '../../../class/API';


const ExtraTableRow = ({index, extra}) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEditExtra = () => navigate(`/edit-extra?id=${extra.id}`);
    const handleDeleteExtra = async () => {
        setDeleteLoading(true);
        API('DELETE', `/extras/delete/${extra.id}`)
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
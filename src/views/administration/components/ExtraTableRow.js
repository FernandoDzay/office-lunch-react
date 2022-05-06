import {useState} from 'react';
import {connect} from 'react-redux';
import {getExtras} from '../../container/actions';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { Navigate } from 'react-router-dom';


const ExtraTableRow = ({index, extra, getExtras}) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [goEditExtra, setGoEditExtra] = useState(false);

    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const handleEditExtra = () => setGoEditExtra(true);
    const handleDeleteExtra = async () => {
        setDeleteLoading(true);
        await fetch(`${api_url}/extras/delete/${extra.id}`, {method: 'DELETE', headers: {Authorization: `bearer ${token}`}});
        await getExtras();
        setDeleteLoading(false);
    }


    if(goEditExtra) return <Navigate to={`/edit-extra?id=${extra.id}`} />;
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


const mapDispatchToProps = dispatch => ({getExtras: async () => dispatch(getExtras())});
export default connect(null, mapDispatchToProps)(ExtraTableRow);
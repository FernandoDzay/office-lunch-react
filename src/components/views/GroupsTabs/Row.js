import IconButton from "../../globals/IconButton/IconButton";
import API from "../../../class/API";
import { getUsersGroups } from "../../../store/slices/groupsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


const Row = ({is_admin, index, relation}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        API('DELETE', `/groups/delete/${relation.id}`)
        .then(r => dispatch( getUsersGroups() ))
        .catch(e => setLoading(false));
    }
    

    return (
        <tr>
            <td>{ index }</td>
            <td>{ relation.user.username }</td>
            { is_admin && <td><IconButton loading={loading} color="red" icon="delete" onClick={handleClick} /></td> }
        </tr>
    );
}


export default Row;
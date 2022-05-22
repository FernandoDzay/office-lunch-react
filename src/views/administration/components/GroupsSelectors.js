import { useState, useEffect } from "react";
import FormGroup from "../../../components/globals/Inputs/FormGroup";
import Select from "../../../components/globals/Inputs/Select";
import Button from "../../../components/globals/Button/Button";
import ViewForm from "../../../components/globals/ViewForm/ViewForm";
import { useSelector, useDispatch } from "react-redux";
import { getGroups, getUsersGroups } from "../../../store/slices/groupsSlice";
import { getUsers } from "../../../store/slices/usersSlice";
import API from "../../../class/API";


const GroupsSelectors = () => {
    const { groups, loadingGroups } = useSelector(state => state.groups);
    const { users, loadingUsers } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const [values, setValues] = useState({user_id: '', group_id: ''});
    const [addLoading, setAddLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch( getGroups() );
        dispatch( getUsers() );
    }, [dispatch])

    useEffect(() => {
        if(users.length > 0 && groups.length > 0) {
            setValues({user_id: users[0].id, group_id: groups[0].id});
        }
    }, [users, groups])

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleClick = (e) => {
        e.preventDefault();
        const { user_id, group_id } = values;
        setAddLoading(true);

        API('POST', '/groups/set', {user_id, group_id})
        .then(r => {
            dispatch( getUsersGroups() );
            setError('');
        })
        .catch(e => setError('Ocurrió un error al añadir'))
        .finally(r => setAddLoading(false));
    }


    return (
        <ViewForm className="group-selectors">
            <p>Selecciona un usuario, y asígnale un grupo apretando el botón</p>
            <FormGroup forceNotEmpty={true}>
                <label>Usuario</label>
                <Select name="user_id" value={values.user_id} loading={loadingUsers} onChangeHandler={handleChange} >
                    {users.map(user => (
                        <option key={ user.id } value={ user.id }>{ user.username }</option>
                    ))}
                </Select>
            </FormGroup>
            <FormGroup forceNotEmpty={true}>
                <label>Grupo</label>
                <Select name="group_id" value={values.group_id} loading={loadingGroups} onChangeHandler={handleChange} >
                    {groups.map(group => (
                        <option key={ group.id } value={ group.id }>{ group.id }</option>
                    ))}
                </Select>
            </FormGroup>

            { error && <p className="error">{ error }</p> }
            <Button color="blue" icon="plus" loading={addLoading} onClick={handleClick}>Asignar</Button>
        </ViewForm>
    );
}


export default GroupsSelectors;
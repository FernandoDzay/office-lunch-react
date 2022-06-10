import ViewTitle from "../../../components/globals/ViewTitle/ViewTitle";
import ViewDescription from "../../../components/globals/ViewDescription/ViewDescription";

import Table from "../../../components/globals/Table/Table";
import { getUsers } from '../../../store/slices/usersSlice';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersRow from "./components/UsersRow";
import UserModal from "./components/UserModal";


const Users = () => {
    const dispatch = useDispatch();
    const { users, usersLoading } = useSelector(state => state.users);
    const loading = users.length === 0 ? usersLoading : false;
    const thead = ['Nombre', 'Email', 'Cumpleaños', 'Permisos', 'Status', 'Modificar'];


    useEffect(() => {
        dispatch( getUsers() );
    }, [dispatch]);


    return (
        <>
            <ViewTitle>Usuarios</ViewTitle>
            <ViewDescription>Administrar a todos los usuarios</ViewDescription>

            <Table thead={thead} caption="Usuarios" loading={loading} responsive={true}>
                {users.map(user => <UsersRow key={user.id} user={user} />)}
            </Table>

            <UserModal />
        </>
    );
}


export default Users;
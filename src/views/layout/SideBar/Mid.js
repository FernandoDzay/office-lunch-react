import { useState, useEffect } from "react";
import {Navigate} from "react-router-dom";
import Modal from "../../../components/globals/Modal/Modal";
import Button from "../../../components/globals/Button/Button";
import UserImage from "./UserImage";
import {connect} from 'react-redux';
import {getLoggedUser} from '../../../redux/actions/layoutActions';


const Mid = ({getLoggedUser, loading, user: {username, is_admin}}) => {
    const [schedule, setSchedule] = useState('Horario: ');
    const [logout, setLogout] = useState(false);
    const [modal, setModal] = useState(false);

    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const getGroup = () => {
        fetch(`${api_url}/groups/get-user-group`, {
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(data => {
            if(data.error) return setSchedule('Tu horario aún no está configurado');
            if(data.start_time) return setSchedule(`Horario: ${data.start_time}`);
        })
        .catch(e => setSchedule('Ocurrió un error al obtener tu horario'));
    }
    
    useEffect(getGroup, [api_url, token]);
    useEffect(getLoggedUser, [getLoggedUser]);

    const handleLogoutClick = () => {
        setModal(true);
    }

    const triggerLogout = () => {
        localStorage.clear();
        setModal(false);
        setTimeout(() => { setLogout(true) }, 250);
    }

    const handleCloseModal = () => setModal(false);

    
    if(logout) return <Navigate to="/login" />
    return (
        <div className="mid">
            <UserImage />
            <p className="name">{loading ? '...' : username}</p>
            <p className="schedule">{ schedule }</p>

            <div className="icons">
                {is_admin && <button><i className="zmdi zmdi-settings"></i></button>}
                <button onClick={handleLogoutClick}><i className="zmdi zmdi-power"></i></button>
            </div>

            <Modal active={modal} handleCloseModal={handleCloseModal}>
                <p className="title center">Cerrar sesión</p>
                <p className="description center">¿Estás seguro que deseas cerrar tu sesión?</p>
                <div className="bot">
                    <Button color="blue" onClick={triggerLogout}>Sí</Button>
                    <Button color="red" onClick={handleCloseModal}>No</Button>
                </div>
            </Modal>
        </div>
    );
}


const mapStateToProps = state => ({user: state.layoutReducers.user, loading: state.layoutReducers.loadingUser});
const mapDispatchToProps = dispatch => ({ getLoggedUser: () => dispatch(getLoggedUser()) });
export default connect(mapStateToProps, mapDispatchToProps)(Mid);
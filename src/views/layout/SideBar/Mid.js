import { useState, useEffect } from "react";
import {Navigate} from "react-router-dom";
import Modal from "../../../components/globals/Modal/Modal";
import Button from "../../../components/globals/Button/Button";
import UserImage from "./UserImage";
import { getLoggedUser } from '../../../store/slices/layoutSlice';
import { useSelector, useDispatch } from 'react-redux';


const Mid = () => {
    const [schedule, setSchedule] = useState('Horario: ');
    const [logout, setLogout] = useState(false);
    const [modal, setModal] = useState(false);

    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const loading = useSelector(state => state.layout.loadingUser);
    const { username, is_admin } = useSelector(state => state.layout.user);
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getLoggedUser());
    }, [dispatch]);

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
                {is_admin ? <button><i className="zmdi zmdi-settings"></i></button> : null}
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


export default Mid;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/globals/Modal/Modal";
import Button from "../../../components/globals/Button/Button";
import UserImage from "./UserImage";
import { getLoggedUser } from '../../../store/slices/layoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import API from "../../../class/API";


const Mid = () => {
    const [schedule, setSchedule] = useState('Horario: ');
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const loading = useSelector(state => state.layout.loadingUser);
    const { username, is_admin } = useSelector(state => state.layout.user);
    const dispatch = useDispatch();

    useEffect(() => {
        API('GET', '/groups/get-user-group')
        .then(response => setSchedule(`Horario: ${response.data.start_time}`))
        .catch(error => {
            if(error.data && error.data.error) return setSchedule('Tu horario aún no está configurado');
            setSchedule('Ocurrió un error al obtener tu horario');
        });
    }, []);

    useEffect(() => {
        dispatch(getLoggedUser());
    }, [dispatch]);

    const handleLogoutClick = () => {
        setModal(true);
    }

    const triggerLogout = () => {
        localStorage.clear();
        setModal(false);
        setTimeout(() => { navigate('/login', {replace: true}); }, 250);
    }

    const handleConfigClick = () => {
        navigate('/config', {replace: true});
    }

    const handleCloseModal = () => setModal(false);

    
    return (
        <div className="mid">
            <UserImage />
            <p className="name">{loading ? '...' : username}</p>
            <p className="schedule">{ schedule }</p>

            <div className="icons">
                {is_admin ? <button onClick={handleConfigClick}><i className="zmdi zmdi-settings"></i></button> : null}
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
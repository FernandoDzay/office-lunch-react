import { useSelector } from 'react-redux';
import Modal from '../../components/globals/Modal/InfoModal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const SessionExpired = () => {
    const {expiredSession} = useSelector(state => state.layout);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const handleCloseModal = () => {
        localStorage.clear();
        setModal(false);
        setTimeout(() => navigate('/login', {replace: true}), 300);
    }

    useEffect(() => {
        if(expiredSession) setModal(true);
    }, [expiredSession])
    
    return (
        <Modal
            active={modal}
            type='fail'
            title='Tu sessión ha expirado'
            description='Al apretar Ok, serás redirigido al login'
            handleCloseModal={handleCloseModal}
        />
    );
}


export default SessionExpired;
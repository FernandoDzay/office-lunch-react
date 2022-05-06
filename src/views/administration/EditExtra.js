import {useState, useEffect} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import ExtraForm from './components/ExtraForm';
import Loader from '../../components/globals/Loader/Loader';
import Modal from '../../components/globals/Modal/InfoModal';
import { Navigate } from 'react-router-dom';


const EditExtra = () => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const [initialFormState, setInitialFormState] = useState({});
    const [loading, setLoading] = useState(true);
    const [goBack, setGoBack] = useState(false);
    const [modal, setModal] = useState({
        active: false,
        title: '',
        description: '',
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        const extraNotFoundState = {
            active: true,
            title: 'Error',
            description: 'Extra no encontrada',
        };
        const errorState = {
            active: true,
            title: 'Error',
            description: 'Ocurrió un error inesperado',
        };

        if(!(id >= 0)) return setModal(extraNotFoundState);

        fetch(`${api_url}/extras/${id}`, {headers: {Authorization: `bearer ${token}`}})
        .then(r => r.json())
        .then(data => {
            if(!data.id) return setModal(extraNotFoundState);
            setInitialFormState(data);
            setLoading(false);
        })
        .catch(e => setModal(errorState));
    }, [token, api_url])

    const handleCloseModal = () => {
        setModal({...modal, active: false});
        setGoBack(true);
    }

    const {active, title, description} = modal;


    if(goBack) return <Navigate to="/add-menu" />;
    return (
        <>
            <ViewTitle>Editar Extra</ViewTitle>
            <ViewDescription>En esta sección puedes editar un extra</ViewDescription>

            { loading ? <Loader color="blue" size="3" withContainer={true} /> : <ExtraForm initialState={initialFormState} forceNotEmpty={true} /> }

            <Modal active={active} type='fail' title={title} description={description} handleCloseModal={handleCloseModal} />
        </>
    );
}

export default EditExtra;
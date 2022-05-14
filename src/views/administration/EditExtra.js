import {useState, useEffect} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import ExtraForm from './components/ExtraForm';
import Loader from '../../components/globals/Loader/Loader';
import Modal from '../../components/globals/Modal/InfoModal';
import { useNavigate } from 'react-router-dom';
import API from '../../class/API';


const EditExtra = () => {
    const [initialFormState, setInitialFormState] = useState({});
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({
        active: false,
        title: '',
        description: '',
    });
    const navigate = useNavigate();
    const {active, title, description} = modal;
    
    
    

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

        API('GET', `/extras/${id}`)
        .then(response => {
            if(!response.data.id) return setModal(extraNotFoundState);
            setInitialFormState(response.data);
            setLoading(false);
        })
        .catch(e => setModal(errorState));
    }, [])

    const handleCloseModal = () => {
        setModal({...modal, active: false});
        navigate('/add-menu', {replace: true})
    }

    


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
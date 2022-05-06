import {useState, useEffect} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodForm from './components/FoodForm';
import Loader from '../../components/globals/Loader/Loader';
import Modal from '../../components/globals/Modal/InfoModal';
import { Navigate } from 'react-router-dom';


const EditFood = () => {
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
        const foodNotFoundState = {
            active: true,
            title: 'Error',
            description: 'Comida no encontrada',
        };
        const errorState = {
            active: true,
            title: 'Error',
            description: 'Ocurrió un error inesperado',
        };

        if(!(id >= 0)) return setModal(foodNotFoundState);

        fetch(`${api_url}/foods/${id}`, {headers: {Authorization: `bearer ${token}`}})
        .then(r => r.json())
        .then(data => {
            if(!data.id) return setModal(foodNotFoundState)
            setInitialFormState(data)
            setLoading(false);
        })
        .catch(e => this.setState(errorState));

    }, [api_url, token])

    const handleCloseModal = () => {
        setModal({...modal, active: false});
        setGoBack(true);
    }

    const {active, title, description} = modal;

    if(goBack) return <Navigate to="/add-menu" />;
    return (
        <>
            <ViewTitle>Editar Comida</ViewTitle>
            <ViewDescription>En esta sección puedes editar una comida</ViewDescription>

            { loading ? <Loader color="blue" size="3" withContainer={true} /> : <FoodForm initialState={initialFormState} forceNotEmpty={true} /> }

            <Modal active={active} type='fail' title={title} description={description} handleCloseModal={handleCloseModal} />
        </>
    );
}

export default EditFood;
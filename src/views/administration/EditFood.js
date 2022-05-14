import {useState, useEffect} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodForm from './components/FoodForm';
import Loader from '../../components/globals/Loader/Loader';
import Modal from '../../components/globals/Modal/InfoModal';
import { useNavigate } from 'react-router-dom';
import API from '../../class/API';


const EditFood = () => {
    const [initialFormState, setInitialFormState] = useState({});
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({
        active: false,
        title: '',
        description: '',
    });
    const {active, title, description} = modal;
    const navigate = useNavigate();


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

        API('GET', `/foods/${id}`)
        .then(response => {
            if(!response.data.id) return setModal(foodNotFoundState)
            setInitialFormState(response.data)
            setLoading(false);
        })
        .catch(e => this.setState(errorState));

    }, [])

    const handleCloseModal = () => {
        setModal({...modal, active: false});
        navigate('/add-menu', {replace: true})
    }


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
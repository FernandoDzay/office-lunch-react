import {useState, useEffect} from 'react';
import Modal from '../../../components/globals/Modal/InfoModal';
import ViewForm from '../../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../../components/globals/Inputs/FormGroup';
import Input from '../../../components/globals/Inputs/Input';
import Button from '../../../components/globals/Button/Button';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import { Navigate } from 'react-router-dom';


const ExtraForm = ({forceNotEmpty, initialState}) => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    const initialExtraState = {
        name: '',
        price: '',
    };
    const modalInitialState = {
        modal: {
            active: false,
            title: '',
            description: '',
            type: 'fail'
        }
    };

    const [loading, setLoading] = useState(false);
    const [goBack, setGoBack] = useState(false);
    const [modal, setModal] = useState(modalInitialState);
    const [extra, setExtra] = useState(initialExtraState);
    const [errors, setErrors] = useState(initialExtraState);

    useEffect(() => {
        if(!initialState) return;
        setExtra(initialState);
    }, [initialState])

    const handleChange = e => setExtra({...extra, [e.target.name]: e.target.value});

    const handleClick = e => {
        e.preventDefault();
        if(!validateForm()) return;
        
        const body = JSON.stringify(extra);
        setLoading(true);

        const fetchUrl = `${api_url}/extras/${initialState ? 'update' : 'create'}`;
        const method = initialState ? 'PUT' : 'POST';
        const headers = {Authorization: `bearer ${token}`, 'Content-Type': 'application/json'};

        fetch(fetchUrl, {method, headers, body})
        .then(r => {
            if(r.status === 201 || r.status === 200) {
                setLoading(false);
                setModal({
                    active: true,
                    title: 'Listo!',
                    description: `Tu extra ha sido ${initialState ? 'editada' : 'creada'} con éxito`,
                    type: 'success',
                });
                return;
            }
            throw new Error('No se pudo crear el extra');
        })
        .catch(e => {
            setLoading(false);
            setModal({
                active: true,
                title: 'Ocurrió un error',
                description: `No se pudo ${initialState ? 'actualizar' : 'crear'} el extra`,
                type: 'fail',
            });
        });
    }

    const validateForm = () => {
        const {name, price} = extra;
        const validationErrors = {...initialExtraState};
        
        if(!isLength(name, {min: 4, max: 30})) validationErrors.name = "Debe tener longitud entre 4 y 30";
        if(!(price >= 0)) validationErrors.price = "El precio debe de ser un número";

        if(isEmpty(name)) validationErrors.name = "Este campo es requerido";
        if(isEmpty(price + '')) validationErrors.price = "Este campo es requerido";
        
        setErrors(validationErrors);

        return JSON.stringify(validationErrors) === JSON.stringify(initialExtraState);
    }

    const handleCloseModal = (e) => {
        e.preventDefault();
        if(initialState) {
            setModal(modalInitialState);
            setGoBack(true);
        }
        else setModal(modalInitialState);
    }

    const {active, title, description, type} = modal;
    const {name, price} = extra;

    if(goBack) return <Navigate to="/add-menu" />;
    return (
        <ViewForm>

            <FormGroup message="Escribe el nombre del extra" error={errors.name} forceNotEmpty={forceNotEmpty} >
                <label htmlFor="name">Nombre completo del extra</label>
                <Input name="name" onChangeHandler={handleChange} value={name} />
            </FormGroup>

            <FormGroup message="Precio del extra" error={errors.price} forceNotEmpty={forceNotEmpty} >
                <label htmlFor="price">Precio</label>
                <Input name="price" onChangeHandler={handleChange} value={price} />
            </FormGroup>

            <Button color="blue" icon="plus" loading={loading} onClick={handleClick}>{ initialState ? 'Editar extra'  : 'Agregar extra' }</Button>
            <Modal active={active} title={title} description={description} type={type} handleCloseModal={handleCloseModal} />

        </ViewForm>
    );
}

export default ExtraForm;
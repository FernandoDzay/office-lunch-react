import {useState, useEffect} from 'react';
import Modal from '../../../components/globals/Modal/InfoModal';
import ViewForm from '../../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../../components/globals/Inputs/FormGroup';
import Input from '../../../components/globals/Inputs/Input';
import Button from '../../../components/globals/Button/Button';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import { useNavigate } from 'react-router-dom';
import API from '../../../class/API';


const ExtraForm = ({forceNotEmpty, initialState}) => {
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
    const [modal, setModal] = useState(modalInitialState);
    const [extra, setExtra] = useState(initialExtraState);
    const [errors, setErrors] = useState(initialExtraState);
    const navigate = useNavigate();

    useEffect(() => {
        if(!initialState) return;
        setExtra(initialState);
    }, [initialState])

    const handleChange = e => setExtra({...extra, [e.target.name]: e.target.value});

    const handleClick = e => {
        e.preventDefault();
        if(!validateForm()) return;
        
        const fetchUrl = `/extras/${initialState ? 'update' : 'create'}`;
        const method = initialState ? 'PUT' : 'POST';

        setLoading(true);

        API(method, fetchUrl, extra)
        .then(r => {
            setLoading(false);
            setModal({
                active: true,
                title: 'Listo!',
                description: `Tu extra ha sido ${initialState ? 'editada' : 'creada'} con éxito`,
                type: 'success',
            });
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
            navigate('/add-menu', {replace: true});
        }
        else setModal(modalInitialState);
    }

    const {active, title, description, type} = modal;
    const {name, price} = extra;
    const icon = initialState ? 'edit'  : 'plus';


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

            <Button color="blue" icon={icon} loading={loading} onClick={handleClick}>{ initialState ? 'Editar extra'  : 'Agregar extra' }</Button>
            <Modal active={active} title={title} description={description} type={type} handleCloseModal={handleCloseModal} />

        </ViewForm>
    );
}

export default ExtraForm;
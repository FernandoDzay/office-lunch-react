import {useState, useEffect} from 'react';
import Modal from '../../../components/globals/Modal/InfoModal';
import ViewForm from '../../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../../components/globals/Inputs/FormGroup';
import Input from '../../../components/globals/Inputs/Input';
import InputFile from '../../../components/globals/Inputs/InputFile';
import Button from '../../../components/globals/Button/Button';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import { useNavigate } from 'react-router-dom';


const FoodForm = ({initialState, forceNotEmpty}) => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    const initialFoodState = {
        full_name: '',
        short_name: '',
        price: '',
        image: ''
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
    const [food, setFood] = useState(initialFoodState);
    const [errors, setErrors] = useState(initialFoodState);
    const navigate = useNavigate();


    useEffect(() => {
        if(!initialState) return;
        const short_name = initialState.short_name ? initialState.short_name : '';
        setFood({...initialState, short_name});
    }, [initialState])

    const handleChange = (e) => {
        if(e.target.files === null) return setFood({...food, [e.target.name]: e.target.value});
        const image = e.target.files[0];
        if(image === undefined) return false;
        setFood({...food, image});
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(!validateForm()) return;
        
        const body = getBodydata();
        setLoading(true);

        const fetchUrl = `${api_url}/foods/${initialState ? 'update' : 'create'}`;
        const method = initialState ? 'PUT' : 'POST';
        const headers = {Authorization: `bearer ${token}`};

        fetch(fetchUrl, {method, headers, body})
        .then(r => {
            if(r.status === 201 || r.status === 200) {
                setLoading(false);
                setModal({
                    active: true,
                    title: 'Listo!',
                    description: `Tu comida ha sido ${initialState ? 'editada' : 'creada'} con éxito`,
                    type: 'success',
                });
                return;
            }
            throw new Error('No se pudo crear la comida');
        })
        .catch(e => {
            setLoading(false);
            setModal({
                active: true,
                title: 'Ocurrió un error',
                description: `No se pudo ${initialState ? 'actualizar' : 'crear'} la comida`,
                type: 'fail',
            });
        });
    }

    const getBodydata = () => {
        const body = new FormData();
        const data = {...food};
        Object.entries(data).forEach(([key, value]) => { if(value !== null && value !== '') body.append(key, value); });
        return body;
    }

    const validateForm = () => {
        const {full_name, short_name, price, image} = food;
        const validationErrors = {...initialFoodState};
        
        if(!isLength(full_name, {min: 4, max: 30})) validationErrors.full_name = "Debe tener longitud entre 4 y 30";
        if(short_name.length > 0) if(!isLength(short_name, {min: 4, max: 30})) validationErrors.short_name = "Debe tener longitud entre 4 y 30";
        if(!(price >= 0)) validationErrors.price = "El precio debe de ser un número";

        if(isEmpty(full_name)) validationErrors.full_name = "Este campo es requerido";
        if(isEmpty(price + '')) validationErrors.price = "Este campo es requerido";


        if(image && typeof image !== 'string') if( !['image/jpeg', 'image/png'].includes(image.type) ) validationErrors.image = "El archivo debe de ser una imagen";
        
        setErrors(validationErrors);

        return JSON.stringify(validationErrors) === JSON.stringify(initialFoodState);
    }

    const handleCloseModal = (e) => {
        e.preventDefault();
        if(initialState) {
            setModal(modalInitialState);
            navigate('/add-menu', {replace: true})
        }
        else setModal(modalInitialState);
    }

    const {active, title, description, type} = modal;
    const {full_name, short_name, price, image} = food;
    const icon = initialState ? 'edit'  : 'plus';


    return (
        <ViewForm>

            <FormGroup message="Este nombre es el que sale en la tarjeta de comida" error={errors.full_name} forceNotEmpty={forceNotEmpty} >
                <label htmlFor="full_name">Nombre completo de la comida</label>
                <Input name="full_name" onChangeHandler={handleChange} value={full_name} />
            </FormGroup>

            <FormGroup message="Éste nombre se utiliza al copiar la orden" error={errors.short_name} forceNotEmpty={forceNotEmpty} >
                <label htmlFor="short_name">Nombre corto de la comida (opcional)</label>
                <Input name="short_name" onChangeHandler={handleChange} value={short_name} />
            </FormGroup>

            <FormGroup message="Precio completo de la comida sin descuento" error={errors.price} forceNotEmpty={forceNotEmpty} >
                <label htmlFor="price">Precio</label>
                <Input name="price" onChangeHandler={handleChange} value={price} />
            </FormGroup>

            <FormGroup message="Este campo es opcional" error={errors.image} forceNotEmpty={forceNotEmpty} >
                <label htmlFor="image">Agrega una foto de la comida (opcional)</label>
                <InputFile name="image" onChangeHandler={handleChange} value={image} />
            </FormGroup>

            <Button color="blue" icon={icon} loading={loading} onClick={handleClick}>{ initialState ? 'Editar comida'  : 'Agregar comida' }</Button>
            <Modal active={active} title={title} description={description} type={type} handleCloseModal={handleCloseModal} />

        </ViewForm>
    );
}


export default FoodForm;
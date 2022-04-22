import {Component} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import Layout from '../layout/Layout';
import Modal from '../../components/globals/Modal/InfoModal';
import ViewForm from '../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../components/globals/Inputs/FormGroup';
import Input from '../../components/globals/Inputs/Input';
import InputFile from '../../components/globals/Inputs/InputFile';
import Button from '../../components/globals/Button/Button';

import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';

class CreateFood extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');
        this.initialFoodState = {
            full_name: '',
            short_name: '',
            price: '',
            image: ''
        };
        this.modalInitialState = {
            modal: {
                active: false,
                title: '',
                description: '',
                type: 'fail'
            }
        };

        this.state = {
            loading: false,
            modal: {...this.modalInitialState},
            food: {...this.initialFoodState},
            errors: {...this.initialFoodState}
        };
    }

    handleChange = (e) => {
        if(e.target.files === null) return this.setState({food: {...this.state.food, [e.target.name]: e.target.value}});
        const image = e.target.files[0];
        if(image === undefined) return false;
        this.setState({food: {...this.state.food, image}});
    }

    handleClick = (e) => {
        e.preventDefault();
        if(!this.validateForm()) return;
        
        const body = this.getBodydata();
        this.setState({loading: true});

        fetch(`${this.api_url}/foods/create`, {
            method: 'POST',
            headers: {Authorization: `bearer ${this.token}`},
            body
        })
        .then(r => {
            if(r.status === 201) {
                return this.setState({
                    loading: false,
                    modal: {
                        active: true,
                        title: 'Listo!',
                        description: 'Tu comida ha sido creada con éxito',
                        type: 'success',
                    }
                });
            }
            throw new Error('No se pudo crear la comida');
        })
        .catch(e => {
            this.setState({
                loading: false,
                modal: {
                    active: true,
                    title: 'Ocurrió un error',
                    description: 'No se pudo crear la comida',
                    type: 'fail',
                }
            })
        });
    }

    getBodydata = () => {
        const body = new FormData();
        const data = {...this.state.food};
        Object.entries(data).forEach(([key, value]) => { if(value !== null && value !== '') body.append(key, value); });
        return body;
    }

    validateForm = () => {
        const {full_name, short_name, price, image} = this.state.food;
        const validationErrors = {...this.initialFoodState};
        
        if(!isLength(full_name, {min: 4, max: 30})) validationErrors.full_name = "Debe tener longitud entre 4 y 30";
        if(short_name.length > 0) if(!isLength(short_name, {min: 4, max: 30})) validationErrors.short_name = "Debe tener longitud entre 4 y 30";
        if(!isInt(price) && !isFloat(price)) validationErrors.price = "El precio debe de ser un número";

        if(isEmpty(full_name)) validationErrors.full_name = "Este campo es requerido";
        if(isEmpty(price)) validationErrors.price = "Este campo es requerido";

        if(image) if( !['image/jpeg', 'image/png'].includes(image.type) ) validationErrors.image = "El archivo debe de ser una imagen";
        
        this.setState({errors: validationErrors});

        return JSON.stringify(validationErrors) === JSON.stringify(this.initialFoodState);
    }
    

    render() {
        const {modal: {active, title, description, type}, food: {full_name, short_name, price, image}, errors, loading} = this.state;
        const {handleChange, handleClick} = this;


        return (
            <Layout>
                <ViewTitle>Crear Comida</ViewTitle>
                <ViewDescription>En esta sección puedes crear una nueva comida</ViewDescription>

                <ViewForm>

                    <FormGroup message="Este nombre es el que sale en la tarjeta de comida" error={errors.full_name}>
                        <label htmlFor="full_name">Nombre completo de la comida</label>
                        <Input name="full_name" onChangeHandler={handleChange} value={full_name} />
                    </FormGroup>

                    <FormGroup message="Éste nombre se utiliza al copiar la orden" error={errors.short_name}>
                        <label htmlFor="short_name">Nombre corto de la comida (opcional)</label>
                        <Input name="short_name" onChangeHandler={handleChange} value={short_name} />
                    </FormGroup>

                    <FormGroup message="Precio completo de la comida sin descuento" error={errors.price}>
                        <label htmlFor="price">Precio</label>
                        <Input name="price" onChangeHandler={handleChange} value={price} />
                    </FormGroup>

                    <FormGroup message="Este campo es opcional" error={errors.image}>
                        <label htmlFor="image">Agrega una foto de la comida (opcional)</label>
                        <InputFile name="image" onChangeHandler={handleChange} value={image} />
                    </FormGroup>

                    <Button color="blue" icon="plus" loading={loading} onClick={handleClick}>Agregar comida</Button>
                    <Modal active={active} title={title} description={description} type={type} handleCloseModal={() => this.setState(this.modalInitialState)} />
                </ViewForm>

            </Layout>
        );
    }

}

export default CreateFood;
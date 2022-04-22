import {Component} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import Layout from '../layout/Layout';
import Modal from '../../components/globals/Modal/InfoModal';
import ViewForm from '../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../components/globals/Inputs/FormGroup';
import Input from '../../components/globals/Inputs/Input';
import Button from '../../components/globals/Button/Button';

import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';

class CreateExtra extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');
        this.initialExtraState = {
            name: '',
            price: '',
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
            extra: {...this.initialExtraState},
            errors: {...this.initialExtraState}
        };
    }

    handleChange = (e) => {
        this.setState({extra: {...this.state.extra, [e.target.name]: e.target.value}});
    }

    handleClick = (e) => {
        e.preventDefault();
        if(!this.validateForm()) return;
        
        this.setState({loading: true});

        fetch(`${this.api_url}/extras/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${this.token}`
            },
            body: JSON.stringify({...this.state.extra})
        })
        .then(r => {
            if(r.status === 201) {
                return this.setState({
                    loading: false,
                    modal: {
                        active: true,
                        title: 'Listo!',
                        description: 'Tu extra ha sido creado con éxito',
                        type: 'success',
                    }
                });
            }
            throw new Error('No se pudo crear el extra');
        })
        .catch(e => {
            this.setState({
                loading: false,
                modal: {
                    active: true,
                    title: 'Ocurrió un error',
                    description: 'No se pudo crear el extra',
                    type: 'fail',
                }
            })
        });
    }

    validateForm = () => {
        const {name, price} = this.state.extra;
        const validationErrors = {...this.initialExtraState};
        
        if(!isLength(name, {min: 4, max: 30})) validationErrors.name = "Debe tener longitud entre 4 y 30";
        if(!isInt(price) && !isFloat(price)) validationErrors.price = "El precio debe de ser un número";

        if(isEmpty(name)) validationErrors.name = "Este campo es requerido";
        if(isEmpty(price)) validationErrors.price = "Este campo es requerido";
        
        this.setState({errors: validationErrors});

        return JSON.stringify(validationErrors) === JSON.stringify(this.initialExtraState);
    }
    

    render() {
        const {modal: {active, title, description, type}, extra: {name, price}, errors, loading} = this.state;
        const {handleChange, handleClick} = this;


        return (
            <Layout>
                <ViewTitle>Crear Extra</ViewTitle>
                <ViewDescription>En esta sección puedes crear un nuevo extra</ViewDescription>

                <ViewForm>

                    <FormGroup message="Escribe el nombre del extra" error={errors.name}>
                        <label htmlFor="name">Nombre completo del extra</label>
                        <Input name="name" onChangeHandler={handleChange} value={name} />
                    </FormGroup>

                    <FormGroup message="Precio del extra" error={errors.price}>
                        <label htmlFor="price">Precio</label>
                        <Input name="price" onChangeHandler={handleChange} value={price} />
                    </FormGroup>

                    <Button color="blue" icon="plus" loading={loading} onClick={handleClick}>Agregar extra</Button>

                </ViewForm>

                <Modal active={active} title={title} description={description} type={type} handleCloseModal={() => this.setState(this.modalInitialState)} />
            </Layout>
        );
    }

}

export default CreateExtra;
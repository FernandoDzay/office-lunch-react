import {Component} from 'react';
import Modal from '../../../components/globals/Modal/InfoModal';
import ViewForm from '../../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../../components/globals/Inputs/FormGroup';
import Input from '../../../components/globals/Inputs/Input';
import Button from '../../../components/globals/Button/Button';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import { Navigate } from 'react-router-dom';


class ExtraForm extends Component {

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
            goBack: false,
            modal: {...this.modalInitialState},
            extra: {...this.initialExtraState},
            errors: {...this.initialExtraState}
        };
    }

    componentDidMount(prevState) {
        if(!this.props.initialState) return;
        this.setState({...this.state, ...this.props.initialState});
    }

    handleChange = (e) => {
        this.setState({extra: {...this.state.extra, [e.target.name]: e.target.value}});
    }

    handleClick = (e) => {
        e.preventDefault();
        if(!this.validateForm()) return;
        
        const body = JSON.stringify(this.state.extra);
        const {initialState} = this.props;
        this.setState({loading: true});

        const fetchUrl = `${this.api_url}/extras/${initialState ? 'update' : 'create'}`;
        const method = initialState ? 'PUT' : 'POST';
        const headers = {Authorization: `bearer ${this.token}`, 'Content-Type': 'application/json'};

        fetch(fetchUrl, {method, headers, body})
        .then(r => {
            if(r.status === 201 || r.status === 200) {
                return this.setState({
                    loading: false,
                    modal: {
                        active: true,
                        title: 'Listo!',
                        description: `Tu extra ha sido ${initialState ? 'editada' : 'creada'} con éxito`,
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
                    description: `No se pudo ${initialState ? 'actualizar' : 'crear'} el extra`,
                    type: 'fail',
                }
            })
        });
    }

    validateForm = () => {
        const {name, price} = this.state.extra;
        const validationErrors = {...this.initialExtraState};
        
        if(!isLength(name, {min: 4, max: 30})) validationErrors.name = "Debe tener longitud entre 4 y 30";
        if(!(price >= 0)) validationErrors.price = "El precio debe de ser un número";

        if(isEmpty(name)) validationErrors.name = "Este campo es requerido";
        if(isEmpty(price + '')) validationErrors.price = "Este campo es requerido";
        
        this.setState({errors: validationErrors});

        return JSON.stringify(validationErrors) === JSON.stringify(this.initialExtraState);
    }

    handleCloseModal = (e) => {
        e.preventDefault();
        if(this.props.initialState) this.setState({...this.modalInitialState, goBack: true});
        else this.setState(this.modalInitialState);
    }
    

    render() {
        const {modal: {active, title, description, type}, extra: {name, price}, errors, loading, goBack} = this.state;
        const {forceNotEmpty, initialState} = this.props;
        const {handleChange, handleClick, handleCloseModal} = this;


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

}

export default ExtraForm;
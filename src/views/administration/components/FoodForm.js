import {Component} from 'react';
import Modal from '../../../components/globals/Modal/InfoModal';
import ViewForm from '../../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../../components/globals/Inputs/FormGroup';
import Input from '../../../components/globals/Inputs/Input';
import InputFile from '../../../components/globals/Inputs/InputFile';
import Button from '../../../components/globals/Button/Button';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import { Navigate } from 'react-router-dom';


class FoodForm extends Component {

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
            goBack: false,
            modal: {...this.modalInitialState},
            food: {...this.initialFoodState},
            errors: {...this.initialFoodState}
        };
    }

    componentDidMount(prevState) {
        if(!this.props.initialState) return;
        this.setState({...this.state, ...this.props.initialState});
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
        const {initialState} = this.props;
        this.setState({loading: true});

        const fetchUrl = `${this.api_url}/foods/${initialState ? 'update' : 'create'}`;
        const method = initialState ? 'PUT' : 'POST';
        const headers = {Authorization: `bearer ${this.token}`};

        fetch(fetchUrl, {method, headers, body})
        .then(r => {
            if(r.status === 201 || r.status === 200) {
                return this.setState({
                    loading: false,
                    modal: {
                        active: true,
                        title: 'Listo!',
                        description: `Tu comida ha sido ${initialState ? 'editada' : 'creada'} con éxito`,
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
                    description: `No se pudo ${initialState ? 'actualizar' : 'crear'} la comida`,
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
        if(!(price >= 0)) validationErrors.price = "El precio debe de ser un número";

        if(isEmpty(full_name)) validationErrors.full_name = "Este campo es requerido";
        if(isEmpty(price + '')) validationErrors.price = "Este campo es requerido";


        if(image && typeof image !== 'string') if( !['image/jpeg', 'image/png'].includes(image.type) ) validationErrors.image = "El archivo debe de ser una imagen";
        
        this.setState({errors: validationErrors});

        return JSON.stringify(validationErrors) === JSON.stringify(this.initialFoodState);
    }

    handleCloseModal = (e) => {
        e.preventDefault();
        if(this.props.initialState) this.setState({...this.modalInitialState, goBack: true});
        else this.setState(this.modalInitialState);
    }


    render() {
        const {modal: {active, title, description, type}, food: {full_name, short_name, price, image}, errors, loading, goBack} = this.state;
        const {forceNotEmpty, initialState} = this.props;
        const {handleChange, handleClick, handleCloseModal} = this;


        if(goBack) return <Navigate to="/add-menu" />;
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

                <Button color="blue" icon={initialState ? 'edit'  : 'plus'} loading={loading} onClick={handleClick}>{ initialState ? 'Editar comida'  : 'Agregar comida' }</Button>
                <Modal active={active} title={title} description={description} type={type} handleCloseModal={handleCloseModal} />

            </ViewForm>
        );
    }
}


export default FoodForm;
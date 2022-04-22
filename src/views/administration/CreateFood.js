import {Component} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import Layout from '../layout/Layout';
import Modal from '../../components/globals/Modal/InfoModal';
import ViewForm from '../../components/globals/ViewForm/ViewForm';
import FormGroup from '../../components/globals/Inputs/FormGroup';
import Input from '../../components/globals/Inputs/Input';
import InputFile from '../../components/globals/Inputs/InputFile';

class CreateFood extends Component {

    constructor(props) {
        super(props);

        const initialFoodState = {
            full_name: '',
            short_name: '',
            price: '',
            image: '',
        };

        this.state = {
            loading: false,
            modal: {
                active: false,
                title: '',
                description: '',
                type: 'fail',
            },
            food: initialFoodState,
            errors: initialFoodState
        };
    }
    

    render() {
        const {modal: {active, title, description, type}, food: {full_name, short_name, price, image}, errors} = this.state;

        return (
            <Layout>
                <ViewTitle>Crear Comida</ViewTitle>
                <ViewDescription>En esta sección puedes crear una nueva comida</ViewDescription>

                <ViewForm>

                    <FormGroup message={errors.full_name || "Este nombre saldrá en la tarjeta de comida"}>
                        <label htmlFor="full_name">Nombre completo de la comida</label>
                        <Input name="full_name" value={full_name} />
                    </FormGroup>

                    <FormGroup message={errors.short_name || "Éste nombre se utiliza al copiar la orden"}>
                        <label htmlFor="short_name">Nombre corto de la comida (opcional)</label>
                        <Input name="short_name" value={short_name} />
                    </FormGroup>

                    <FormGroup message={errors.price || "Precio completo de la comida sin descuento"}>
                        <label htmlFor="price">Precio</label>
                        <Input name="price" value={price} />
                    </FormGroup>

                    <FormGroup message={errors.image || "Este campo es opcional"}>
                        <label htmlFor="image">Nombre completo de comida (opcional)</label>
                        <InputFile name="image" value={image} />
                    </FormGroup>

                </ViewForm>

                <Modal active={active} title={title} description={description} type={type} />
            </Layout>
        );
    }

}

export default CreateFood;
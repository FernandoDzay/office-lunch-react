import {Component} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodForm from './components/FoodForm';
import Loader from '../../components/globals/Loader/Loader';
import Modal from '../../components/globals/Modal/InfoModal';
import { Navigate } from 'react-router-dom';


class EditFood extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');
        this.state = {
            initialFormState: {},
            loading: true,
            modal: {
                active: false,
                title: '',
                description: '',
            },
        };
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        const foodNotFoundState = {
            modal: {
                active: true,
                title: 'Error',
                description: 'Comida no encontrada',
            }
        };
        const errorState = {
            modal: {
                active: true,
                title: 'Error',
                description: 'Ocurrió un error inesperado',
            }
        };

        if(!(id >= 0)) return this.setState(foodNotFoundState);

        fetch(`${this.api_url}/foods/${id}`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(!data.id) return this.setState(foodNotFoundState);
            return this.setState({initialFormState: data, loading: false});
        })
        .catch(e => this.setState(errorState));
    }

    handleCloseModal = () => {
        this.setState({modal: {active: false}, goBack: true});
    }


    render() {
        const {loading, initialFormState, goBack, modal: {active, title, description}} = this.state;


        if(goBack) return <Navigate to="/add-menu" />;
        return (
            <>
                <ViewTitle>Editar Comida</ViewTitle>
                <ViewDescription>En esta sección puedes editar una comida</ViewDescription>

                { loading ? <Loader color="blue" size="3" withContainer={true} /> : <FoodForm initialState={{food: initialFormState}} forceNotEmpty={true} /> }
    
                <Modal active={active} type='fail' title={title} description={description} handleCloseModal={this.handleCloseModal} />
            </>
        );
    }

}

export default EditFood;
import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import GenericFoodCard from './inheritance/FoodCard';
import IconButton from '../../../components/globals/IconButton/IconButton';
import Modal from '../../../components/globals/Modal/InfoModal';

class AdminFoodCard extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');
        this.state = {
            mainLoading: false,
            deleteLoading: false,
            editFoodPath: null,
            modal: {
                active: false,
                title: '',
                description: '',
            },
        };
    }

    addToMenu = async () => {
        this.setState({mainLoading: true});
        const {id, mainClick} = this.props;
        await fetch(`${this.api_url}/menu/add-food/${id}`, {method: 'POST', headers: {Authorization: `bearer ${this.token}`}});
        await mainClick();
        this.setState({mainLoading: false});
    }

    editFood = () => {
        this.setState({editFoodPath: `/edit-food/?${this.props.id}`});
    }
    
    deleteFood = () => {
        this.setState({deleteLoading: true});
        const {id, deleteClick} = this.props;
        fetch(`${this.api_url}/foods/delete/${id}`, {method: 'DELETE', headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.deleteError) {
                return this.setState({
                    deleteLoading: false,
                    modal: {active: true, title: 'Error al borrar', description: data.deleteError}
                });
            }
            deleteClick();
        })
        .catch(e => this.setState({deleteLoading: false}))
    }


    render() {
        const {full_name, image} = this.props;
        const {mainLoading, editLoading, deleteLoading, modal, editFoodPath} = this.state;

        if(editFoodPath) return <Navigate to={editFoodPath} />
        return (
            <GenericFoodCard full_name={full_name} image={image} loading={mainLoading} mainClick={this.addToMenu} btnText="Agregar al menú" >

                <div className="admin-buttons">
                    <IconButton loading={editLoading} color='blue' icon="edit" onClick={this.editFood} />
                    <IconButton loading={deleteLoading} color='red' icon="delete" onClick={this.deleteFood} />
                </div>

                <Modal
                    active={modal.active}
                    type="fail"
                    title={modal.title}
                    description={modal.description}
                    handleCloseModal={() => this.setState({modal: {...modal, active: false}})}
                />
            </GenericFoodCard>
        );
    }
}

export default AdminFoodCard;
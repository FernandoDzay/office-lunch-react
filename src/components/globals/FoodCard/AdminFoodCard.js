import GenericFoodCard from './inheritance/FoodCard';
import IconButton from '../../../components/globals/IconButton/IconButton';
import Modal from '../../../components/globals/Modal/InfoModal';
import { getMenu } from '../../../store/slices/menuSlice';
import { getFoods } from '../../../store/slices/foodsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminFoodCard = ({id, full_name, image}) => {
    const [mainLoading, setMainLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [modal, setModal] = useState({
        active: false,
        title: '',
        description: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');


    const addToMenu = async () => {
        setMainLoading(true);
        fetch(`${api_url}/menu/add-food/${id}`, {method: 'POST', headers: {Authorization: `bearer ${token}`}})
        .then(r => dispatch(getMenu()))
        .finally(e => setMainLoading(false));
    }

    const editFood = () => {
        navigate(`/edit-food/?id=${id}`, {replace: true});
    }
    
    const deleteFood = () => {
        setDeleteLoading(true);
        fetch(`${api_url}/foods/delete/${id}`, {method: 'DELETE', headers: {Authorization: `bearer ${token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.deleteError) return Promise.reject(data);
        })
        .then(r => dispatch(getFoods()))
        .catch(e => {
            setDeleteLoading(false);
            const description = e.deleteError ? e.deleteError : '';
            setModal({active: true, title: 'Error al borrar', description});
        });
    }


    return (
        <GenericFoodCard full_name={full_name} image={image} loading={mainLoading} mainClick={addToMenu} btnText="Agregar al menú" >

            <div className="admin-buttons">
                <IconButton color='blue' icon="edit" onClick={editFood} />
                <IconButton loading={deleteLoading} color='red' icon="delete" onClick={deleteFood} />
            </div>

            <Modal
                active={modal.active}
                type="fail"
                title={modal.title}
                description={modal.description}
                handleCloseModal={() => setModal({...modal, active: false})}
            />
        </GenericFoodCard>
    );
}


export default AdminFoodCard;
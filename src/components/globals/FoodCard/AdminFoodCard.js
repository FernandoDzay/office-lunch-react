import GenericFoodCard from './inheritance/FoodCard';
import IconButton from '../../../components/globals/IconButton/IconButton';
import Modal from '../../../components/globals/Modal/InfoModal';
import { getMenu } from '../../../store/slices/menuSlice';
import { getFoods } from '../../../store/slices/foodsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../class/API';


const AdminFoodCard = ({id, full_name, image}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mainLoading, setMainLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [modal, setModal] = useState({
        active: false,
        title: '',
        description: '',
    });

    function addToMenu() {
        setMainLoading(true);
        API('POST', `/menu/add-food/${id}`)
        .then(r => dispatch(getMenu()))
        .finally(e => setMainLoading(false));
    }

    const editFood = () => {
        navigate(`/edit-food/?id=${id}`, {replace: true});
    }
    
    const deleteFood = () => {
        setDeleteLoading(true);
        API('DELETE', `/foods/delete/${id}`)
        .then(r => dispatch(getFoods()))
        .catch(e => {
            setDeleteLoading(false);
            const description = e.data.deleteError ? e.data.deleteError : '';
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
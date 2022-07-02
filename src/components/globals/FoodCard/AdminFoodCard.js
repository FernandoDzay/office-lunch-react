import GenericFoodCard from './inheritance/FoodCard';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { getMenu } from '../../../store/slices/menuSlice';
import { getFoods } from '../../../store/slices/foodsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../class/API';
import { openModal } from '../../../store/slices/ordersSlice';


const AdminFoodCard = ({id, full_name, image}) => {
    const { activeSideBar } = useSelector(state => state.layout);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mainLoading, setMainLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    

    const conditionalOpenModal = ({title, description, nextStep}) => {
        if(!activeSideBar) {
            dispatch(openModal({title, description, nextStep}));
        }
    }

    function addToMenu() {
        setMainLoading(true);
        API('POST', `/menu/add-food/${id}`)
        .then(r => {
            dispatch(getMenu());
            conditionalOpenModal({title: 'Correcto!', description: 'Comida añadido al menú', nextStep: 'success'});
        })
        .catch(e => {
            const description = (e.data && e.data.AddError) ? e.data.AddError : 'Ocurrió un error al añadir la comida al menú';
            conditionalOpenModal({title: 'Error!', description, nextStep: 'fail'});
        })
        .finally(e => setMainLoading(false));
    }

    const editFood = () => {
        navigate(`/edit-food/?id=${id}`, {replace: true});
    }
    
    const deleteFood = () => {
        setDeleteLoading(true);
        API('DELETE', `/foods/delete/${id}`)
        .then(r => {
            dispatch(getFoods());
            conditionalOpenModal({title: 'Correcto!', description: 'La comida fue borrada con éxito', nextStep: 'success'})
        })
        .catch(e => {
            setDeleteLoading(false);
            const description = e.data.deleteError ? e.data.deleteError : '';
            conditionalOpenModal({title: 'Error al borrar', description, nextStep: 'fail'});
        });
    }


    return (
        <GenericFoodCard full_name={full_name} image={image} loading={mainLoading} mainClick={addToMenu} btnText="Agregar al menú" >
            <div className="admin-buttons">
                <IconButton color='blue' icon="edit" onClick={editFood} />
                <IconButton loading={deleteLoading} color='red' icon="delete" onClick={deleteFood} />
            </div>
        </GenericFoodCard>
    );
}


export default AdminFoodCard;
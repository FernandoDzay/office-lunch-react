import { useEffect } from 'react';
import { getMenu } from '../../store/slices/menuSlice';
import { useSelector, useDispatch } from 'react-redux';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodCard from '../../components/globals/FoodCard/FoodCard';
import Loader from '../../components/globals/Loader/Loader';
import ExtrasSection from './components/ExtrasSection';

const Index = () => {

    const dispatch = useDispatch();
    const { menu, menuStatus, loadingMenu } = useSelector(state => state.menu);

    useEffect(() => {dispatch(getMenu())}, [dispatch])

    const getViewText = () => {
        const loadingMenuText = {
            title: 'Cargando menú...',
            description: '...',
        };
        const menuClosed = {
            title: 'Menú',
            description: 'El menú se encuentra cerrado',
        };
        const emptyMenu = {
            title: 'Menú',
            description: 'No hay ninguna comida añadida al menú',
        };
        const menuFound = {
            title: 'Menú',
            description: 'Añade tu comida del día!',
        }

        const menuTextOptions = [emptyMenu, menuClosed, menuFound];

        const viewText = loadingMenu ? loadingMenuText :  menuTextOptions[menuStatus];
        return viewText;

    }

    const viewText = getViewText();

    return (
        <>
            <ViewTitle>{viewText.title}</ViewTitle>
            <ViewDescription>{viewText.description}</ViewDescription>
            <div className="food-cards-container">{
                loadingMenu ? 
                    <Loader size="3" color="blue" />
                :
                    menu.map(item => 
                        <FoodCard 
                            key={item.food.id}
                            id={item.food.id}
                            full_name={item.food.full_name}
                            image={item.food.image}
                        />
                    )
            }</div>

            <ExtrasSection />
        </>
    );
}


export default Index;
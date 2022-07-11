import { useEffect } from 'react';
import { getMenu } from '../../store/slices/menuSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import MenuCards from './components/MenuCards';
import Loader from '../../components/globals/Loader/Loader';
import ExtrasSection from './components/ExtrasSection';
import OrdersModal from '../orders/components/OrdersModal';


const Index = () => {
    const dispatch = useDispatch();
    const { menu, menuStatus, loadingMenu } = useSelector(state => state.menu);
    const { user } = useSelector(state => state.layout);
    useEffect(() => {dispatch(getMenu())}, [dispatch]);
    const displayMenu = menuStatus === 2 ? true : false;

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
            { (user.is_admin && menuStatus === 1) ? <ViewDescription>Para activar el menú, puedes ir aquí: {<Link to="/config">Configuración</Link>}</ViewDescription> : null }
            
            <div className="food-cards-container">{
                loadingMenu ? 
                    <Loader size="3" color="blue" />
                :
                    <MenuCards display={ displayMenu } menu={ menu } />
            }</div>

            <ExtrasSection display={ displayMenu } />

            <OrdersModal />
        </>
    );
}


export default Index;
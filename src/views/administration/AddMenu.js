import {useEffect} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodCard from '../../components/globals/FoodCard/AdminFoodCard';
import Loader from '../../components/globals/Loader/Loader';
import Tabs from '../../components/globals/Tabs/Tabs';
import MenuTable from './components/MenuTable';
import ExtrasTable from './components/ExtrasTable';
import { getFoods } from '../../store/slices/foodsSlice';
import { useSelector, useDispatch } from 'react-redux';
import OrdersModal from '../orders/components/OrdersModal';


const AddMenu = () => {
    const { foods, loadingFoods } = useSelector(state => state.foods);
    const dispatch = useDispatch();
    const viewLoadingFoods = foods.length > 0 ? false : loadingFoods;
    useEffect(() => { dispatch(getFoods()) }, [dispatch]);


    return (
        <>
            <ViewTitle>Agregar al menú</ViewTitle>
            <ViewDescription>En esta sección puedes agregar las comidas disponibles que hayas configurado.</ViewDescription>
            <Tabs
                tabsText={['Comidas agregadas al menú', 'Extras']}
                tabsContent={[
                    <MenuTable />,
                    <ExtrasTable />,
                ]}
            />

            <ViewTitle>Comidas</ViewTitle>
            <div className="food-cards-container">{
                viewLoadingFoods ? 
                    <Loader color="blue" size="3" />
                :
                    foods.map(food => <FoodCard key={food.id} {...food} />)
            }</div>

            <OrdersModal />
        </>
    );
}


export default AddMenu;
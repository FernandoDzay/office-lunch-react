import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import Table from '../../components/globals/Table/Table';
import TodaysOrdersRow from './components/TodaysOrdersRow';
import { useSelector, useDispatch } from 'react-redux';
import { getTodaysOrders } from '../../store/slices/ordersSlice';
import { useEffect } from 'react';


const Orders = () => {
    const { todaysOrders, loadingTodaysOrders } = useSelector(state => state.orders);
    const isOrdersEmpty = todaysOrders.orders.length === 0;
    const loading = isOrdersEmpty ? loadingTodaysOrders : false;
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getTodaysOrders()) }, [dispatch]);


    return (
        <>
            <ViewTitle>Pedidos de todos</ViewTitle>
            <ViewDescription>{
                isOrdersEmpty ?
                'Nadie ha pedido hoy' :
                'Estos son los pedidos de hoy:'
            }</ViewDescription>

            {<Table thead={['#', 'Usuario', 'Pedido']} caption="Pedidos" loading={loading} withEnum={true}>
                { todaysOrders.orders.map((order, index) => <TodaysOrdersRow key={index} index={index} order={order} />) }
            </Table>}
        </>
    );
}


export default Orders;
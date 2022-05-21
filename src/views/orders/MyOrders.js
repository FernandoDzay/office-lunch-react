import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import Table from '../../components/globals/Table/Table';
import UserOrdersRow from './components/UserOrdersRow';
import { useSelector } from 'react-redux';


const MyOrders = () => {
    const { userOrders, loadingUserOrders } = useSelector(state => state.layout);
    const isOrdersEmpty = userOrders.orders.foods.length === 0 || userOrders.orders.foods === 0;
    const loading = isOrdersEmpty ? loadingUserOrders : false;


    return (
        <>
            <ViewTitle>Mis pedidos</ViewTitle>
            <ViewDescription>{
                isOrdersEmpty ? 
                'Aún no he pedido nada hoy' :
                'Estos son mis pedidos de hoy:'
            }</ViewDescription>

            <Table thead={['Pedido', 'Precio', 'Quitar']} caption="Pedidos" loading={loading} >
                { userOrders.orders.foods.map(order => <UserOrdersRow key={order.id} order={order} />) }
                { userOrders.orders.extras.map(order => <UserOrdersRow key={order.id} order={order} />) }
                <tr>
                    <td></td>
                    <td><strong>Total:</strong></td>
                    <td><strong>${ userOrders.net_total }</strong></td>
                </tr>
            </Table>
        </>
    );
}


export default MyOrders;
import Table from '../../../components/globals/Table/Table';
import WeekOrdersRow from './WeekOrdersRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


const WeekOrdersTable = () => {
    const { weekOrders, loadingWeekOrders } = useSelector(state => state.orders);
    const isOrdersEmpty = weekOrders.orders.length === 0;
    const loading = isOrdersEmpty ? loadingWeekOrders : false;
    const [data, setData] = useState({
        saturday: false,
        sunday: false,
        thead: ['Usuario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
    })

    useEffect(() => {
        const saturday = weekOrders.orders.filter(order => order.weekDays.saturday.orders.length > 0).length > 0;
        const sunday = weekOrders.orders.filter(order => order.weekDays.sunday.orders.length > 0).length > 0;
        const thead = ['Usuario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

        if(saturday) thead.push('Sábado');
        if(saturday) thead.push('Domingo');
        
        setData({saturday, sunday, thead});
    }, [loading, weekOrders]);


    return (
        <Table thead={ data.thead } caption="Pedidos de la semana" loading={loading} responsive={true}>
            { weekOrders.orders.map((userWeek, index) => <WeekOrdersRow key={index} userWeek={userWeek} data={data} />) }
        </Table>
    );
}


export default WeekOrdersTable;
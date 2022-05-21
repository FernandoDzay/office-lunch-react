import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import Table from '../../components/globals/Table/Table';
import WeekOrdersRow from './components/WeekOrdersRow';
import { useSelector, useDispatch } from 'react-redux';
import { getWeekOrders } from '../../store/slices/ordersSlice';
import { useEffect, useState } from 'react';
import DatePicker from '../../components/globals/DatePicker/DatePicker';
import { getDateString } from '../../utils/globalFunctions';
import Button from '../../components/globals/Button/Button';


const WeekOrders = () => {
    const { weekOrders, loadingWeekOrders } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const isOrdersEmpty = weekOrders.orders.length === 0;
    const loading = isOrdersEmpty ? loadingWeekOrders : false;
    useEffect(() => { dispatch(getWeekOrders()) }, [dispatch]);

    const [date, setDate] = useState('');
    const handleChange = date => setDate(date);
    const handleClick = () => dispatch(getWeekOrders( {date: getDateString(date)} ));
    
    return (
        <>
            <ViewTitle>Pedidos de la semana { getDateString(date) }</ViewTitle>
            <ViewDescription>{
                isOrdersEmpty ?
                'No hay pedidos para esta semana' :
                'Estos son los pedidos de esta semana:'
            }</ViewDescription>

            <Table thead={['Usuario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']} caption="Pedidos de la semana" loading={loading} >
                { weekOrders.orders.map((userWeek, index) => <WeekOrdersRow key={index} userWeek={userWeek} />) }
            </Table>

            <div className='date-picker-under-table-container'>
                <DatePicker date={date} onChange={handleChange} />
                <Button color="blue" onClick={handleClick} loading={loadingWeekOrders}>Buscar</Button>
            </div>
        </>
    );
}


export default WeekOrders;
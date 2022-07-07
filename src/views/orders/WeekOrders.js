import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import { useSelector, useDispatch } from 'react-redux';
import { getWeekOrders } from '../../store/slices/ordersSlice';
import { useEffect, useState } from 'react';
import DatePicker from '../../components/globals/DatePicker/DatePicker';
import { getDateString } from '../../utils/globalFunctions';
import Button from '../../components/globals/Button/Button';
import WeekOrdersTable from './components/WeekOrdersTable';


const WeekOrders = () => {
    const { weekOrders, loadingWeekOrders } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const [dateText, setDateText] = useState(null);
    const isOrdersEmpty = weekOrders.orders.length === 0;
    useEffect(() => { dispatch(getWeekOrders()) }, [dispatch]);

    const [date, setDate] = useState('');
    const handleChange = date => setDate(date);
    const handleClick = () => {
        dispatch(getWeekOrders( {date: getDateString(date)} ));
        setDateText( getDateString(date) );
    }
    
    return (
        <>
            <ViewTitle>{ dateText ? `Pagos de la semana ${dateText}` : 'Pagos de la semana pasada' }</ViewTitle>
            <ViewDescription>{
                isOrdersEmpty ?
                'No hay pedidos para esta semana' :
                'Estos son los pedidos de esta semana:'
            }</ViewDescription>

            <WeekOrdersTable />

            <div className='date-picker-under-table-container'>
                <DatePicker date={date} onChange={handleChange} />
                <Button color="blue" onClick={handleClick} loading={loadingWeekOrders}>Buscar</Button>
            </div>
        </>
    );
}


export default WeekOrders;
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeekOrders } from '../../store/slices/ordersSlice';
import ViewTitle from "../../components/globals/ViewTitle/ViewTitle";
import ViewDescription from "../../components/globals/ViewDescription/ViewDescription";
import Button from "../../components/globals/Button/Button";
import PaymentsTable from './components/PaymentsTable';
import TotalToPayTable from './components/TotalToPayTable';
import { getLastWeekMonday } from '../../utils/dateHelper';
import DatePicker from '../../components/globals/DatePicker/DatePicker';
import { getDateString } from '../../utils/globalFunctions';


const Payments = () => {
    const { loadingWeekOrders } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const [dateText, setDateText] = useState(null);
    const [date, setDate] = useState(new Date(getLastWeekMonday()));
    
    const handleChange = date => setDate(date);
    const handleClick = () => {
        dispatch(getWeekOrders( {date: getDateString(date)} ));
        setDateText( getDateString(date) );
    }

    useEffect(() => { dispatch(getWeekOrders( {date: getDateString(getLastWeekMonday())} )) }, [dispatch]);

    return (
        <>
            <ViewTitle>Pagos de todos</ViewTitle>
            <ViewDescription>{ dateText ? `Pagos de la semana ${dateText}` : 'Pagos de la semana pasada' }</ViewDescription>

            <PaymentsTable />

            <div className='three-table-container'>
                <TotalToPayTable />
            </div>

            <div className='date-picker-under-table-container'>
                <DatePicker date={date} onChange={handleChange} />
                <Button color="blue" onClick={handleClick} loading={loadingWeekOrders}>Buscar</Button>
            </div>
        </>
    );
}


export default Payments;
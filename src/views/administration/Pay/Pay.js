import ViewTitle from "../../../components/globals/ViewTitle/ViewTitle";
import ViewDescription from "../../../components/globals/ViewDescription/ViewDescription";
import PaymentsTable from "./components/PaymentsTable";
import PaymentModal from './components/PaymentModal';
import DatePicker from "../../../components/globals/DatePicker/DatePicker";
import Button from "../../../components/globals/Button/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingPayments, setDateText } from "../../../store/slices/paymentsSlice";
import { getDateString } from "../../../utils/globalFunctions";


const Pay = () => {
    const [date, setDate] = useState(null);
    const { dateText } = useSelector(state => state.payments);
    const dispatch = useDispatch();

    const handleChange = date => setDate(date);
    const handleClick = () => {
        dispatch( getPendingPayments({payment_date: getDateString(date)}) );
        dispatch(setDateText( getDateString(date) ));
    }

    useEffect(() => {
        dispatch( getPendingPayments() );
    }, [dispatch]);


    return (
        <>
            <ViewTitle>Pagar</ViewTitle>
            <ViewDescription>{ dateText ? `Pagos de la semana ${dateText}` : 'Pagos de la semana pasada' }</ViewDescription>

            <PaymentsTable />

            <PaymentModal date={dateText} />

            <div className='date-picker-under-table-container'>
                <DatePicker date={date} onChange={handleChange} />
                <Button color="blue" onClick={handleClick} loading={false}>Buscar</Button>
            </div>
        </>
    );
}

export default Pay;
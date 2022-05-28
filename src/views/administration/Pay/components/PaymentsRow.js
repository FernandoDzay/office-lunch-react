import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../../components/globals/IconButton/IconButton';
import { createUserPayment, getUserPayments } from '../../../../store/slices/paymentsSlice';
import { getLastWeekMonday } from '../../../../utils/dateHelper';
import { useState, useEffect } from 'react';


const PaymentsRow = ({pendingPayment}) => {
    const { id, username, total_paid, total_to_pay } = pendingPayment;
    const { loadingCreateUserPayment } = useSelector(state => state.payments);
    const dispatch = useDispatch();
    const isFullPaid = total_paid === total_to_pay;
    const [loading, setLoading] = useState(false);


    const handleCreateUserPayment = () => {
        setLoading(true);
        dispatch(createUserPayment({
            user_id: id,
            concept: "Pago completo",
            payment_date: getLastWeekMonday(),
            quantity: Number(total_to_pay) - Number(total_paid)
        }));
    }

    const handleOpenModal = () => {
        dispatch(getUserPayments({id}));
    }

    useEffect(() => {
        if(!loadingCreateUserPayment && loading) setLoading(false);
    }, [loadingCreateUserPayment, loading])


    return (
        <tr className={ isFullPaid ? 'highlight' : '' }>
            <td>{ username }</td>
            <td>{ total_paid }</td>
            <td>{ total_to_pay }</td>
            <td>
                <IconButton color="purple" icon="eye" onClick={handleOpenModal} />
            </td>
            <td>
                <IconButton color="blue" icon="check-all" disabled={isFullPaid} onClick={handleCreateUserPayment} loading={loading} />
            </td>
        </tr>
    );
}


export default PaymentsRow;
import IconButton from "../../../../components/globals/IconButton/IconButton";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteUserPayment } from "../../../../store/slices/paymentsSlice";


const UserPaymentsRow = ({userPayment}) => {
    const dispatch = useDispatch();
    const { loadingDeleteUserPayment } = useSelector(state => state.payments);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if(!loadingDeleteUserPayment && loading) setLoading(false);
    }, [loading, loadingDeleteUserPayment])


    return (
        <tr>
            <td>{ moment(userPayment.createdAt).format('YYYY-MM-DD') }</td>
            <td>{ userPayment.concept }</td>
            <td>{ userPayment.quantity }</td>
            <td>
                <IconButton icon="delete" color="red" loading={loading} onClick={() => dispatch(deleteUserPayment(userPayment))} />
            </td>
        </tr>
    );
}


export default UserPaymentsRow;
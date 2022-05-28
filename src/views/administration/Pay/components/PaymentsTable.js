import Table from "../../../../components/globals/Table/Table";
import { useSelector } from "react-redux";
import PaymentsRow from "./PaymentsRow";


const PaymentsTable = () => {
    const { pendingPayments, loadingPendingPayments } = useSelector(state => state.payments);
    const loading = pendingPayments.length === 0 ? loadingPendingPayments : false;
    

    return (
        <Table thead={['Usuario', 'Total pagado', 'Total a pagar', 'Pagos', 'Pagar todo']} caption="Pagar" loading={loading} >
            {pendingPayments.map(pendingPayment => (
                <PaymentsRow key={pendingPayment.id} pendingPayment={pendingPayment} />
            ))}
        </Table>
    );
}


export default PaymentsTable;
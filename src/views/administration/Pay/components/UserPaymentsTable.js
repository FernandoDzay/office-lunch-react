import Table from "../../../../components/globals/Table/Table";
import UserPaymentsRow from './UserPaymentsRow';
import { useSelector } from "react-redux";


const UserPaymentsTable = () => {
    const { userPayments } = useSelector(state => state.payments);

    return (
        <Table thead={['Fecha', 'Concepto', 'Pago', 'Eliminar']}>
            {userPayments.map(userPayment => (
                <UserPaymentsRow key={userPayment.id} userPayment={userPayment} />
            ))}
        </Table>
    );
}


export default UserPaymentsTable;
import Table from "../../../components/globals/Table/Table";
import { useSelector } from 'react-redux';


const PaymentsTableRow = () => {
    const { weekOrders, loadingWeekOrders } = useSelector(state => state.orders);
    const loading = weekOrders.orders.length === 0 ? loadingWeekOrders : false;
    
    return (
        <Table thead={ ['Usuario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Total'] } loading={loading} caption='Pagos de la semana' responsive={true}>
            {weekOrders.orders.map((userWeek, index) => (
                <tr key={index}>
                    <td>{ userWeek.username }</td>
                    <td>{ userWeek.weekDays.monday.net_total }</td>
                    <td>{ userWeek.weekDays.tuesday.net_total }</td>
                    <td>{ userWeek.weekDays.wednesday.net_total }</td>
                    <td>{ userWeek.weekDays.thursday.net_total }</td>
                    <td>{ userWeek.weekDays.friday.net_total }</td>
                    <td>{ userWeek.weekDays.saturday.net_total }</td>
                    <td>{ userWeek.weekDays.sunday.net_total }</td>
                    <td><strong>{ userWeek.net_total }</strong></td>
                </tr>
            ))}
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td><strong>Total:</strong></td>
                <td><strong>{ weekOrders.net_total }</strong></td>
            </tr>
        </Table>
    );
}


export default PaymentsTableRow;
import Table from "../../../components/globals/Table/Table";
import { useSelector } from 'react-redux';


const TotalToPayTable = () => {
    const { weekOrders, loadingWeekOrders } = useSelector(state => state.orders);
    const loading = weekOrders.orders.length === 0 ? loadingWeekOrders : false;
    const week = {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo',
    };


    return (
        <Table thead={ ['Día de la semana', 'Total'] } loading={loading} caption='Pagos sin descuento' >
            {Object.entries(week).map(([key, value]) => (
                <tr key={key}>
                    <td>{ value }</td>
                    <td>{ weekOrders.weekTotals[key].total }</td>
                </tr>
            ))}
            <tr>
                <td><strong>Total:</strong></td>
                <td><strong>{ weekOrders.total }</strong></td>
            </tr>
        </Table>
    );
}


export default TotalToPayTable;
import Table from "../../../components/globals/Table/Table";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";


const PaymentsTableRow = () => {
    const { weekOrders, loadingWeekOrders } = useSelector(state => state.orders);
    const loading = weekOrders.orders.length === 0 ? loadingWeekOrders : false;
    const [data, setData] = useState({
        saturday: false,
        sunday: false,
        thead: ['Usuario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Total']
    })

    useEffect(() => {
        const saturday = weekOrders.orders.filter(order => order.weekDays.saturday.orders.length > 0).length > 0;
        const sunday = weekOrders.orders.filter(order => order.weekDays.sunday.orders.length > 0).length > 0;
        const thead = ['Usuario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

        if(saturday) thead.push('Sábado');
        if(saturday) thead.push('Domingo');
        thead.push('Total');
        
        setData({saturday, sunday, thead});
    }, [loading, weekOrders]);
    
    return (
        <Table thead={ data.thead } loading={loading} caption='Pagos de la semana' responsive={true}>
            {weekOrders.orders.map((userWeek, index) => (
                <tr key={index}>
                    <td>{ userWeek.username }</td>
                    <td>{ userWeek.weekDays.monday.net_total }</td>
                    <td>{ userWeek.weekDays.tuesday.net_total }</td>
                    <td>{ userWeek.weekDays.wednesday.net_total }</td>
                    <td>{ userWeek.weekDays.thursday.net_total }</td>
                    <td>{ userWeek.weekDays.friday.net_total }</td>
                    { data.saturday && <td>{ userWeek.weekDays.saturday.net_total }</td> }
                    { data.sunday && <td>{ userWeek.weekDays.sunday.net_total }</td> }
                    <td><strong>{ userWeek.net_total }</strong></td>
                </tr>
            ))}
            <tr>
                <td colSpan='5'></td>
                { data.saturday && <td></td> }
                { data.sunday && <td></td> }
                <td><strong>Total:</strong></td>
                <td><strong>{ weekOrders.net_total }</strong></td>
            </tr>
        </Table>
    );
}


export default PaymentsTableRow;
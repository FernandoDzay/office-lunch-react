import { Fragment } from "react";

const WeekOrdersRow = ({userWeek, data}) => {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    if(data.saturday) daysOfWeek.push('saturday');
    if(data.sunday) daysOfWeek.push('sunday');

    return (
        <tr>
            <td>{ userWeek.username }</td>
            {daysOfWeek.map(day => (
                <td key={day}>
                    { userWeek.weekDays[day].orders.map((order, index) =>
                        index > 0 ? 
                        <Fragment key={index}><br /><br />{order.name}</Fragment> :
                        <Fragment key={index}>{order.name}</Fragment>) 
                    }
                </td>
            ))}
        </tr>
    );
}

export default WeekOrdersRow;
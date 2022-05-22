const TodaysOrdersRow = ({index, order}) => {

    return (
        order.orders.map((userOrder, key) => 
            <tr key={key} className={ key > 0 ? 'no-border-top' : '' }>
                <td>{ key === 0 ? index : '' }</td>
                <td>{ key === 0 ? order.username : '' }</td>
                <td>{ userOrder.name }</td>
            </tr>
        )
    );
}

export default TodaysOrdersRow;
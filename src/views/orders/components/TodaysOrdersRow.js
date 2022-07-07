const TodaysOrdersRow = ({index, order}) => {

    return (
        order.orders.map((userOrder, key) => 
            <tr key={userOrder.id} className={ key > 0 ? 'no-border-top' : '' }>
                <td>{ key === 0 ? index + 1 : '' }</td>
                <td>{ key === 0 ? order.username : '' }</td>
                <td>{ userOrder.name }</td>
            </tr>
        )
    );
}

export default TodaysOrdersRow;
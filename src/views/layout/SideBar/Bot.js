import { useEffect } from "react";
import NavItem from '../NavItem';
import NavSubItem from '../NavSubItem';
import { getUserOrders } from '../../../store/slices/layoutSlice';
import { useSelector, useDispatch } from 'react-redux';


const Bot = () => {

    const foods = [];
    const extras = [];

    const { user, userOrders } = useSelector(state => state.layout);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.id !== undefined) {
            dispatch(getUserOrders(user.id));
        }
    }, [dispatch, user.id]);

    if(userOrders.orders) {
        foods.push(...userOrders.orders.foods);
        extras.push(...userOrders.orders.extras);
    }

    return (
        <>
            <nav className="bot">
                <NavItem icon="zmdi-view-dashboard" text="Dashboard" href="/" />
                {
                    user.is_admin && 
                    <NavItem icon="zmdi-shield-security" text="Administración">
                        <NavSubItem icon="zmdi-cutlery" text="Insertar comidas del día" href="/add-menu" />
                        <NavSubItem icon="zmdi-local-pizza" text="Crear comida" href="/create-food" />
                        <NavSubItem icon="zmdi-local-cafe" text="Crear extra" href="/create-extra" />
                    </NavItem>
                }
            </nav>

            <div className="user-orders">
                <br />
                {
                    (foods.length > 0 || extras.length > 0) &&
                    <>
                        <p>Mis pedidos de hoy:</p>
                        <ul>
                            {foods.map(food => <li key={food.id}>{food.name}</li>)}
                            {extras.map(extra => <li key={extra.id}>{extra.name}</li>)}
                        </ul>
                    </>
                }
            </div>
        </>
    );
}


export default Bot;
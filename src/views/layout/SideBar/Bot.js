import { Component } from "react";
import NavItem from '../NavItem';
import NavSubItem from '../NavSubItem';
import {connect} from 'react-redux';
import {getUserOrders} from '../../../redux/actions/layoutActions';


class Bot extends Component {

    componentDidUpdate(prevProps) {
        if(prevProps.user.id !== this.props.user.id) {
            this.props.getUserOrders(this.props.user.id);
        }
    }

    render() {
        const {userOrders, user} = this.props;

        const foods = [];
        const extras = [];

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
}


const mapStateToProps = state => ({
    loading: state.layoutReducers.loadingUserOrders,
    userOrders: state.layoutReducers.userOrders,
    user: state.layoutReducers.user
});
const mapDispatchToProps = (dispatch) => ({getUserOrders: (user_id) => dispatch(getUserOrders(user_id))});
export default connect(mapStateToProps, mapDispatchToProps)(Bot);
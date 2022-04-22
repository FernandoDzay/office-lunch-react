import { Component } from "react";
import NavItem from '../NavItem';
import NavSubItem from '../NavSubItem';


class Bot extends Component {

    /* constructor(props) {
        super(props);

        
    } */

    render() {
        // const {isAdminUser} = this.props;

        return (
            <nav className="bot">
                <NavItem icon="zmdi-view-dashboard" text="Dashboard" href="/" />
                <NavItem icon="zmdi-shield-security" text="Administración">
                    <NavSubItem icon="zmdi-cutlery" text="Insertar comidas del día" href="/add-menu" />
                    <NavSubItem icon="zmdi-local-pizza" text="Crear comida" href="/create-food" />
                    <NavSubItem icon="zmdi-local-cafe" text="Crear extra" href="/create-extra" />
                </NavItem>
                <NavItem icon="zmdi-view-dashboard" text="Dashboard" href="#" />
            </nav>
        );
    }
}

export default Bot;
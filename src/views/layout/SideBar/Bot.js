import { Component } from "react";
import NavItem from '../NavItem';
import NavSubItem from '../NavSubItem';


class Bot extends Component {

    /* constructor(props) {
        super(props);

        
    } */

    render() {
        return (
            <nav className="bot">
                <NavItem icon="zmdi-view-dashboard" text="Dashboard" href="#" />
                <NavItem icon="zmdi-view-dashboard" text="Dashboard">
                    <NavSubItem icon="zmdi-timer" text="Insertar comidas del día" href="#" />
                    <NavSubItem icon="zmdi-timer" text="Insertar comidas del día" href="#" />
                    <NavSubItem icon="zmdi-timer" text="Insertar comidas del día" href="#" />
                </NavItem>
                <NavItem icon="zmdi-view-dashboard" text="Dashboard" href="#" />
            </nav>
        );
    }
}

export default Bot;
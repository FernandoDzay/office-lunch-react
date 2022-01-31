import {Component} from 'react';
import NavItem from './NavItem';
import NavSubItem from './NavSubItem';

import "../../styles/layout/side-bar.scss";
import avatar from "../../libraries/assets/img/avatar.jpg";


class SideBar extends Component {
    
    render() {
        return (
            <div className="side-bar">

                <div className="top">
                    <h1>COMPANY</h1>
                </div>

                <div className="mid">
                    <img src={ avatar } alt="Avatar" title="Avatar" />
                    <p className="name">luis</p>
                    <p className="schedule">Horario: 13:45 - 14:15</p>
                    <div className="icons">
                        <button>
                            <i className="zmdi zmdi-settings"></i>
                        </button>
                        <button>
                            <i className="zmdi zmdi-power"></i>
                        </button>
                    </div>
                </div>

                <nav className="bot">
                    <NavItem icon="zmdi-view-dashboard" text="Dashboard" href="#" />
                    <NavItem icon="zmdi-view-dashboard" text="Dashboard">
                        <NavSubItem icon="zmdi-timer" text="Insertar comidas del día" href="#" />
                        <NavSubItem icon="zmdi-timer" text="Insertar comidas del día" href="#" />
                        <NavSubItem icon="zmdi-timer" text="Insertar comidas del día" href="#" />
                    </NavItem>
                    <NavItem icon="zmdi-view-dashboard" text="Dashboard" href="#" />
                </nav>

            </div>
        );
    }
}

export default SideBar;
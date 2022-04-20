import { Component } from "react";
import {Navigate} from "react-router-dom";
import Modal from "../../../components/globals/Modal/Modal";
import Button from "../../../components/globals/Button/Button";
import UserImage from "./UserImage";


class Mid extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            schedule: 'Horario: ',
            logout: false,
            modal: false,
        }
    }

    componentDidMount() {
        this.getGroup();
    }

    getGroup = () => {
        fetch(`${this.api_url}/groups/get-user-group`, {
            headers: {
                Authorization: `bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(data => {
            if(data.error) this.setState({schedule: 'Tu horario aún no está configurado'});
            if(data.start_time) return this.setState({schedule: `Horario: ${data.start_time}`});
        })
        .catch(e => this.setState({schedule: 'Ocurrió un error al obtener tu horario'}));
    }

    handleLogoutClick = () => {
        this.setState({modal: true});
    }

    logout = () => {
        localStorage.clear();
        this.setState({modal: false});
        setTimeout(() => { this.setState({logout: true}) }, 250);
    }

    handleCloseModal = () => this.setState({modal: false});

    render() {
        const {schedule, logout, modal} = this.state;
        const {avatar, username, isAdminUser, refreshUser} = this.props;
        const {handleLogoutClick, handleCloseModal} = this;

        if(logout) return <Navigate to="/login" />
        return (
            <div className="mid">
                <UserImage avatar={avatar} refreshUser={refreshUser} />
                <p className="name">{ username }</p>
                <p className="schedule">{ schedule }</p>
                <div className="icons">
                    {
                        isAdminUser ?
                        <button>
                            <i className="zmdi zmdi-settings"></i>
                        </button> : null
                    }
                    <button onClick={handleLogoutClick}>
                        <i className="zmdi zmdi-power"></i>
                    </button>
                </div>

                <Modal active={modal} handleCloseModal={handleCloseModal}>
                    <p className="title center">Cerrar sesión</p>
                    <p className="description center">¿Estás seguro que deseas cerrar tu sesión?</p>
                    <div className="bot">
                        <Button color="blue" onClick={this.logout}>Sí</Button>
                        <Button color="red" onClick={handleCloseModal}>No</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Mid;
import {Component} from 'react';
import SideBar from './SideBar/SideBar';
import Header from './Header';
import Modal from '../../components/globals/Modal/Modal';
import Button from '../../components/globals/Button/Button';
import "../../styles/layout/layout.scss";
import { Outlet } from 'react-router-dom';


class Layout extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            showNotifications: false,
            loadingNotifications: false,
            notifications: [],
            showSideBar: true,
            showModal: false,
            nextStep: null,
            username: null,
            avatar: null,
            isAdminUser: 0,
        };
    }

    componentDidMount() {
        this.getUser();
        this.getNotifications();

        // setInterval(this.getNotifications, 60000);
    }

    getUser = () => {
        fetch(`${this.api_url}/users/logged`, {
            headers: {
                Authorization: `bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            if(data.error || !data.id) throw new Error('error!');
            if(data.authError) return this.setState({sessionExpired: true});
            
            this.setState({
                username: data.username,
                avatar: data.image && `${this.api_url}/images/users/${data.image}`,
                isAdminUser: data.is_admin,
            });
        })
        .catch(e => this.setState({username: 'Ocurrió un error al obtener tu nombre'}));
    }

    getNotifications = () => {
        if(this.state.notifications.length === 0) this.setState({loadingNotifications: true});
        fetch(`${this.api_url}/notifications/get`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            const newState = {loadingNotifications: false};
            newState.notifications = data.length > 0 ? data : [];
            this.setState({...newState});
        })
        .catch(e => {console.log(e); this.setState({loadingNotifications: false})});
    }

    handleOpenNotifications = () => this.setState({showNotifications: true});
    handleCloseNotifications = () => this.setState({showNotifications: false});
    handleOpenModal = () => this.setState({showModal: true});
    handleCloseModal = () => this.setState({showModal: false, nextStep: null});
    handleToggleSideBar = () => this.setState({showSideBar: !this.state.showSideBar});
    handleNextStep = () => this.setState({nextStep: 'success'});

    render() {
        const { showNotifications, showSideBar, showModal, nextStep, username, avatar, isAdminUser, loadingNotifications, notifications } = this.state;

        return (
            <div className="layout" id="layout">
                <div className="left">
                    <SideBar active={showSideBar} username={username} avatar={avatar} isAdminUser={isAdminUser} refreshUser={this.getUser} />
                </div>
                <div className="right">
                    <Header
                        handleToggleSideBar={this.handleToggleSideBar}
                        handleOpenModal={this.handleOpenModal}
                        handleOpenNotifications={this.handleOpenNotifications}
                        showNotifications={showNotifications}
                        handleCloseNotifications={this.handleCloseNotifications}
                        isAdminUser={isAdminUser}
                        loadingNotifications = {loadingNotifications}
                        notifications = {notifications}
                        refreshNotifications = {this.getNotifications}
                    />
                    <main className="main">
                        <Outlet />
                    </main>
                </div>
                <Modal active={showModal} nextStep={nextStep} handleCloseModal={this.handleCloseModal} >
                    <div className="bot">
                        <Button color="blue" icon="copy" onClick={this.handleNextStep}>Copiar</Button>
                        <Button color="red" icon="close-circle" onClick={this.handleCloseModal}>Cerrar</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Layout;
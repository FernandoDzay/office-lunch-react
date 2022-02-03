import {Component} from 'react';
import SideBar from './SideBar';
import Notifications from './Notifications';
import Modal from '../../components/globals/Modal/Modal';
import Button from '../../components/globals/Button/Button';

import "../../styles/layout/layout.scss";


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNotifications: false, 
            showSideBar: true,
            showModal: false
        };
    }

    handleOpenNotifications = () => this.setState({showNotifications: true});
    handleCloseNotifications = () => this.setState({showNotifications: false});
    handleOpenModal = () => this.setState({showModal: true});
    handleCloseModal = () => this.setState({showModal: false});
    handleToggleSideBar = () => this.setState({showSideBar: !this.state.showSideBar});

    render() {

        const { showNotifications, showSideBar, showModal } = this.state;

        return (
            <>
                <div className="layout" id="layout">

                    <div className="left">

                        <SideBar active={showSideBar} />

                    </div>
                    <div className="right">

                        <header>
                            <div className="left">
                                <button className="header-btn" onClick={this.handleToggleSideBar}>
                                    <i className="zmdi zmdi-more-vert"></i>
                                </button>
                            </div>
                            <div className="right">
                                <button className="header-btn" onClick={this.handleOpenModal}>
                                    <i className="zmdi zmdi-cutlery"></i>
                                </button>
                                <button className="header-btn" onClick={this.handleOpenNotifications}>
                                    <i className="zmdi zmdi-notifications-none"></i>
                                </button>
                            </div>
                            <Notifications active={showNotifications} handleCloseNotifications={this.handleCloseNotifications} />
                        </header>
                        <main className="main">
                            <div className="view">
                                { this.props.children }
                            </div>
                        </main>

                    </div>

                    
                    <Modal active={showModal} handleCloseModal={this.handleCloseModal} >
                        
                        <div className="bot">
                            <Button color="blue" icon="copy" text="Copiar" />
                            <Button color="red" icon="close-circle" text="Cerrar" onClick={this.handleCloseModal} />
                        </div>
                    </Modal>

                </div>
            </>
            
        );
    }
}

export default Layout;
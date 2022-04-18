import {Component} from 'react';
import SideBar from './SideBar/SideBar';
import Header from './Header';
import Modal from '../../components/globals/Modal/Modal';
import Button from '../../components/globals/Button/Button';
import "../../styles/layout/layout.scss";


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNotifications: false,
            showSideBar: true,
            showModal: false,
            nextStep: null
        };
    }

    handleOpenNotifications = () => this.setState({showNotifications: true});
    handleCloseNotifications = () => this.setState({showNotifications: false});
    handleOpenModal = () => this.setState({showModal: true});
    handleCloseModal = () => this.setState({showModal: false, nextStep: null});
    handleToggleSideBar = () => this.setState({showSideBar: !this.state.showSideBar});
    handleNextStep = () => this.setState({nextStep: 'success'});

    render() {
        const { showNotifications, showSideBar, showModal, nextStep } = this.state;

        return (
            <div className="layout" id="layout">
                <div className="left">
                    <SideBar active={showSideBar} />
                </div>
                <div className="right">
                    <Header 
                        handleToggleSideBar={this.handleToggleSideBar}
                        handleOpenModal={this.handleOpenModal}
                        handleOpenNotifications={this.handleOpenNotifications}
                        showNotifications={showNotifications}
                        handleCloseNotifications={this.handleCloseNotifications}
                    />
                    <main className="main">
                        { this.props.children }
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
import {Component} from 'react';
import SideBar from './SideBar';
import Notifications from './Notifications';

import "../../styles/layout/layout.scss";


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {showNotifications: false, showSideBar: true};
    }

    handleOpenNotifications = () => this.setState({showNotifications: true});
    handleCloseNotifications = () => this.setState({showNotifications: false});
    // handleToggleSideBar = () => this.setState({showSideBar: !this.state.showSideBar});
    handleToggleSideBar = () => this.setState({showSideBar: !this.state.showSideBar});

    render() {

        const { showNotifications, showSideBar } = this.state;

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
                                <button className="header-btn">
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

                </div>
            </>
            
        );
    }
}

export default Layout;
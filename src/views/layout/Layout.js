import {Component} from 'react';
import SideBar from './SideBar';
import Notifications from './Notifications';

import "../../styles/layout/layout.scss";


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {showNotifications: false}
    }

    handleOpenNotifications = () => this.setState({showNotifications: true});
    handleCloseNotifications = () => this.setState({showNotifications: false});

    render() {

        const { showNotifications } = this.state;

        return (
            <>
                <div className="layout" id="layout">

                    <header>
                        <div className="left">
                            <button className="header-btn">
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

                    <SideBar />

                    <main className="main">
                        <div className="view">
                            { this.props.children }
                        </div>
                    </main>

                </div>
            </>
            
        );
    }
}

export default Layout;
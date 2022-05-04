import Notifications from './Notifications/Notifications';
import {connect} from 'react-redux';
import {toggleSideBar, openNotifications, openMakeOrdersModal} from '../../redux/actions/layoutActions';


function Header({handleToggleSideBar, handleOpenNotifications, handleOpenMakeOrdersModal, notifications, user}) {
    const notificationsWithoutReadCount = notifications.filter(notification => !notification.has_been_read).length;


    return (
        <header>
            <div className="left">
                <button className="header-btn" onClick={handleToggleSideBar}>
                    <i className="zmdi zmdi-more-vert"></i>
                </button>
            </div>
            <div className="right">
                {
                    user.is_admin &&
                    <button className="header-btn" onClick={handleOpenMakeOrdersModal}>
                        <i className="zmdi zmdi-cutlery"></i>
                    </button>
                }
                <button className="header-btn" onClick={handleOpenNotifications}>{
                    notificationsWithoutReadCount > 0 ? 
                        <>
                            <i className="zmdi zmdi-notifications"></i>
                            <div className="number-of-notifications">{notificationsWithoutReadCount}</div>
                        </>
                    :
                        <>
                            <i className="zmdi zmdi-notifications-none"></i>
                            <div className="number-of-notifications without"></div>
                        </>
                }</button>
            </div>
            <Notifications />
        </header>
    );
}


const mapStateToProps = state => ({notifications: state.layoutReducers.notifications, user: state.layoutReducers.user});
const mapDispatchToProps = (dispatch) => ({
    handleToggleSideBar: () => dispatch(toggleSideBar()),
    handleOpenNotifications: () => dispatch(openNotifications()),
    handleOpenMakeOrdersModal: () => dispatch(openMakeOrdersModal())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
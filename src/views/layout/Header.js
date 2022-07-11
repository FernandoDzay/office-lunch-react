import Notifications from './Notifications/Notifications';
import { toggleSideBar, openNotifications, openMakeOrdersModal } from '../../store/slices/layoutSlice';
import { useSelector, useDispatch } from 'react-redux';


const Header = () => {
    const dispatch = useDispatch();
    const { notifications, user } = useSelector(state => state.layout);
    const notificationsWithoutReadCount = notifications.filter(notification => !notification.has_been_read).length;


    return (
        <header>
            <div className="left">
                <button className="header-btn" onClick={() => dispatch(toggleSideBar())}>
                    <i className="zmdi zmdi-more-vert"></i>
                </button>
            </div>
            <div className="right">
                {user.is_admin ?
                    <button className="header-btn" onClick={() => dispatch(openMakeOrdersModal())}>
                        <i className="zmdi zmdi-cutlery"></i>
                    </button>
                : null}
                <button className="header-btn" onClick={() => dispatch(openNotifications())}>
                    { notificationsWithoutReadCount > 0 ?
                         <>
                            <i className="zmdi zmdi-notifications"></i>
                            <div className="number-of-notifications">{notificationsWithoutReadCount}</div>
                        </>
                    :
                        <>
                            <i className="zmdi zmdi-notifications-none"></i>
                            <div className="number-of-notifications without"></div>
                        </>
                    }
                </button>
            </div>
            <Notifications />
        </header>
    );
}


export default Header;
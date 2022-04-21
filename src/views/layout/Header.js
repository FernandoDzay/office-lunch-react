import Notifications from './Notifications/Notifications';


export default function Header({
    handleToggleSideBar,
    handleOpenModal,
    handleOpenNotifications,
    showNotifications,
    handleCloseNotifications,
    loadingNotifications,
    notifications,
    refreshNotifications,
}) {

    const notificationsWithoutReadCount = notifications.filter(notification => !notification.has_been_read).length;


    return (
        <header>
            <div className="left">
                <button className="header-btn" onClick={handleToggleSideBar}>
                    <i className="zmdi zmdi-more-vert"></i>
                </button>
            </div>
            <div className="right">
                <button className="header-btn" onClick={handleOpenModal}>
                    <i className="zmdi zmdi-cutlery"></i>
                </button>
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
            <Notifications
                active={showNotifications}
                handleCloseNotifications={handleCloseNotifications}
                loadingNotifications={loadingNotifications}
                notifications={notifications}
                refreshNotifications={refreshNotifications}
            />
        </header>
    );
}
import Notifications from './Notifications';


export default function Header({
    handleToggleSideBar,
    handleOpenModal,
    handleOpenNotifications,
    showNotifications,
    handleCloseNotifications,
}) {

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
                <button className="header-btn" onClick={handleOpenNotifications}>
                    <i className="zmdi zmdi-notifications-none"></i>
                </button>
            </div>
            <Notifications active={showNotifications} handleCloseNotifications={handleCloseNotifications} />
        </header>
    );
}
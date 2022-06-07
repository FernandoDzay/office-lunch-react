import "../../../styles/layout/notifications.scss";
import FullScreenShadow from '../../../components/globals/FullScreenShadow/FullScreenShadow';
import Loader from '../../../components/globals/Loader/Loader';
import Notification from './Notification';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotifications, getNotifications, markReadAllNotifications } from '../../../store/slices/layoutSlice';
import API from '../../../class/API';
import { useEffect } from "react";


const Notifications = () => {
    const { notifications, loadingNotifications, activeNotifications } = useSelector(state => state.layout);
    const dispatch = useDispatch();
    let titleText = 'Cargando notificaciones';
    const notificationsWithoutReadCount = notifications.filter(notification => !notification.has_been_read).length;
    if(!loadingNotifications) titleText = notifications.length > 0 ? 'Notificaciones' : 'Sin notificaciones';

    const markReadAllNotificationsRequest = () => {
        notifications.forEach(async notification => {
            API('PATCH', `/notifications/mark-read/${notification.id}`);
        });
    }

    const handleCloseNotifications = () => {
        dispatch(closeNotifications());

        if(notificationsWithoutReadCount > 0) {
            markReadAllNotificationsRequest();
            dispatch(markReadAllNotifications());
        }
    }

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);


    return (
        <>
            <div className={`notifications${activeNotifications ? ' active' : ''}`}>
                <div className="top">
                    <p>{ titleText }</p>
                    <button onClick={handleCloseNotifications}>
                        <i className="zmdi zmdi-close btn-Notifications-area"></i>
                    </button>
                </div>
                <div className="content">
                    <div className="notifications-container">{
                        loadingNotifications ?
                            <Loader color="blue" size="3" />
                        :
                            notifications.map(notification =>
                            <Notification
                                key={notification.id}
                                title={notification.title}
                                text={notification.description}
                                type={notification.type}
                                hasBeenRead={notification.has_been_read}
                                time={notification.time}
                            />)
                    }</div>
                </div>
            </div>
            <FullScreenShadow active={activeNotifications} onClick={handleCloseNotifications} />
        </>
    );
}


export default Notifications;
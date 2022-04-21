import {Component} from 'react';
import "../../../styles/layout/notifications.scss";
import Animation from "../../../class/Animation";
import FullScreenShadow from '../../../components/globals/FullScreenShadow/FullScreenShadow';
import Loader from '../../../components/globals/Loader/Loader';
import Notification from './Notification';


class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            styles: {
                opacity: 0,
                transform: "300"
            }
        }

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.config = [
            {
                style: 'opacity',
                from: 0,
                to: 1
            },
            {
                style: 'transform',
                from: 300,
                to: 0
            }
        ];
        this.Animation = new Animation(this.config, .2, true);
    }

    componentDidUpdate = async (prevProps) => {

        if(this.props.active !== prevProps.active || this.Animation.isRuning()) {
            if(this.props.active !== prevProps.active) {
                if(this.Animation.isRuning()) this.Animation.setClockwise(false);
                else this.Animation = new Animation(this.config, .2, this.props.active);
            }
    
            if( !this.Animation.hasEnd() ) {
                this.Animation.run()
                    .then(styles => this.setState({styles}))
            }
        }

        if(this.props.active !== prevProps.active && !this.props.active) {
            const notificationsWithoutReadCount = this.props.notifications.filter(notification => !notification.has_been_read).length;
            if(notificationsWithoutReadCount > 0) {
                await this.markReadAllNotifications();
                await this.props.refreshNotifications();
            }
        }
    }

    markReadAllNotifications = async () => {
        this.props.notifications.forEach(async notification => {
            fetch(`${this.api_url}/notifications/mark-read/${notification.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `bearer ${this.token}`
                }
            });
        });
    }

    render() {
        const {active, handleCloseNotifications, loadingNotifications, notifications} = this.props;
        const display = this.state.styles.opacity === '0' ? 'none' : 'block';
        let styles = {};
        styles.display = display;
        styles.opacity = this.state.styles.opacity;
        styles.transform = `translateX(${this.state.styles.transform}px)`;

        let titleText = 'Cargando notificaciones';
        if(!loadingNotifications) titleText = notifications.length > 0 ? 'Notificaciones' : 'Sin notificaciones';


        return (
            <>
                <div className="notifications" style={styles}>
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
                <FullScreenShadow active={active} onClick={handleCloseNotifications} />
            </>
        );
    }
}

export default Notifications;
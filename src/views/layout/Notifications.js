import {Component} from 'react';
import "../../styles/layout/notifications.scss";
import Animation from "../../class/Animation";

import FullScreenShadow from '../../components/globals/FullScreenShadow/FullScreenShadow';

class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            styles: {
                opacity: 0,
                transform: "300"
            }
        }

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

    componentDidUpdate(prevProps) {

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

    }

    render() {
        const {active, handleCloseNotifications} = this.props;
        const display = this.state.styles.opacity === '0' ? 'none' : 'block';
        let styles = {};
        styles.display = display;
        styles.opacity = this.state.styles.opacity;
        styles.transform = `translateX(${this.state.styles.transform}px)`;

        return (
            <>
                <div className="notifications" style={styles}>
                    <div className="top">
                        <p>Sin Notificaciones {this.state.time}</p>
                        <button onClick={handleCloseNotifications}>
                            <i className="zmdi zmdi-close btn-Notifications-area"></i>
                        </button>
                    </div>
                    <div className="content">
                        <Notification title="Prueba" text="Esta es una prueba" time="15m" />
                        <Notification title="Prueba" text="Esta es una prueba" time="15m" />
                        <Notification title="Prueba" text="Esta es una prueba" time="15m" />
                    </div>
                </div>
                <FullScreenShadow active={active} onClick={handleCloseNotifications} />
            </>
        );
    }
}

function Notification({title, text, time}) {

    return (
        <div className="notification">
            <div className="left">
                <div className="icon-container">
                    <i className="zmdi zmdi-alert-octagon red"></i>
                </div>
            </div>
            <div className="right">
                <h4 className="title">{ title }</h4>
                <p className="text">{ text }</p>
                <span className="time">{ time }</span>
            </div>
        </div>
    );
}

export default Notifications;
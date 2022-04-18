import {Component} from 'react';
import Mid from './Mid';
import Bot from './Bot';
import Animation from "../../../class/Animation";
import "../../../styles/layout/side-bar.scss";


class SideBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                opacity: 1,
                transform: "0",
                paddingRight: "270"
            }
        }

        this.config = [
            {
                style: 'opacity',
                from: 1,
                to: 0
            },
            {
                style: 'transform',
                from: 0,
                to: -300
            },
            {
                style: 'paddingRight',
                from: 270,
                to: 0
            }
        ];
        this.Animation = new Animation(this.config, .2, true);
    }

    componentDidUpdate(prevProps) {
        if(this.props.active !== prevProps.active || this.Animation.isRuning()) {
            if(this.props.active !== prevProps.active) {
                if(this.Animation.isRuning()) this.Animation.setClockwise(false);
                else this.Animation = new Animation(this.config, .2, !this.props.active);
            }
    
            if( !this.Animation.hasEnd() ) {
                this.Animation.run()
                .then(styles => this.setState({styles}));
            }
        }
    }
    
    render() {
        const display = this.state.styles.opacity === 0 ? 'none' : 'block';
        let sideBarStyles = {};
        let paddingRightStyles = {};

        sideBarStyles.display = display;
        sideBarStyles.opacity = this.state.styles.opacity;
        sideBarStyles.transform = `translateX(${this.state.styles.transform}px)`;
        
        paddingRightStyles.display = display;
        paddingRightStyles.paddingRight = this.state.styles.paddingRight;
        
        return (
            <>
                <div className="side-bar" style={sideBarStyles}>
                    <div className="top">
                        <h1>COMPANY</h1>
                    </div>
                    <Mid />
                    <Bot />
                </div>
                <div className="padding-right" style={paddingRightStyles}></div>
            </>
        );
    }
}

export default SideBar;
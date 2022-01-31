import {Component} from "react";
import "./FullScreenShadow.scss";

class FullScreenShadow extends Component {

    constructor(props) {
        super(props);
        this.state = { styles: {display: 'none'} }
    }

    /* componentDidMount() {
        document.getElementById("layout").classList.add("blocked");
    } */

    handleAnimationEnd = () => this.setState( (state, props) => {
        return { styles: {display: props.active ? "block" : "none"} };
    });

    componentDidUpdate (prevProps) {
        if(this.props.active !== prevProps.active) {
            if(this.props.active) {
                this.setState({
                    styles: {display: "block"}
                });
            }
        }
    }


    render() {
        const {active, onClick} = this.props;
        const {styles} = this.state;
        const className = active ? " active" : "";


        return (
            <div onAnimationEnd={ this.handleAnimationEnd }
                className={"full-screen-shadow" + className}
                style={styles}
                onClick={onClick}>
            </div>
        );
    }



}

export default FullScreenShadow;
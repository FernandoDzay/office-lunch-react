import { Component } from "react";



class TabContent extends Component {

    constructor(props) {
        super(props);

        this.state = {display: 'none', opacity: 0};
    }

    componentDidMount() {
        if(this.props.active) this.setState({display: 'block', opacity: 1});
    }

    

    componentDidUpdate(prevProps, prevState) {
        const opacity = this.props.active ? 1 : 0;
        if(this.props.active !== prevProps.active) {
            if(this.props.active) {
                setTimeout(() => {
                    this.setState({display: 'block'});
                }, 150);   
            }
            else {
                this.setState({opacity});
                setTimeout(() => {
                    this.setState({display: 'none'});
                }, 150); 
            }
        }
        if(this.state.display !== prevState.display) {
            if(this.state.display === 'block') {
                setTimeout(() => {
                    this.setState({opacity: 1});
                }, 10);
            }
        }
    }

    componentWillUnmount() {
        this.props.handleUnmountContent();
    }

    render() {
        const {component} = this.props;

        return (
            <div className="tab-content" style={this.state} >
                {component}
            </div>
        );
    }
}


export default TabContent;
import {Component} from 'react';
import "../../styles/layout/nav-item.scss";
import {Link} from 'react-router-dom';


class NavItem extends Component {

    constructor(props) {
        super(props);
        this.state = {active: false};
    }

    onClickHandler = () => this.setState({active: !this.state.active});

    render() {
        const {active} = this.state;
        const {children, icon, text, href} = this.props;
        const {onClickHandler} = this;
        const isDropDown = children == null ? false : true;
        const rotate = active ? " rotate" : "";
        const hidden = active ? "" : " hidden";
        
        return (
    
            <div className="nav-item">
                <MainItem isDropDown={isDropDown}
                    className={rotate}
                    icon={icon}
                    href={href}
                    onClick={onClickHandler}
                >
                    <p>{text}</p>
                </MainItem>
                { isDropDown && <div className={"dropdown-container" + hidden}>{ children }</div> }
            </div>
        );
    }
}


function MainItem({isDropDown, href, icon, children, className, onClick}) {
    
    if(isDropDown) {
        return (
            <div className={"main-item icon-container" + className} onClick={onClick}>
                <i className={"zmdi zmdi-hc-fw " + icon}></i>
                <i className="zmdi zmdi-caret-down pull-right dropdown-icon"></i>
                { children }
            </div>
        );
    }
    else {
        return (
            <Link className="main-item icon-container" to={href}>
                <i className={"zmdi zmdi-hc-fw " + icon}></i>
                { children }
            </Link>
        );
    }
}


export default NavItem;
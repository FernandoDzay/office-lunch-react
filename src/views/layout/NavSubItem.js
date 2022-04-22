import "../../styles/layout/nav-sub-item.scss";
import {Link} from 'react-router-dom';

export default function NavSubItem({icon, text, href}) {

    return (
        <Link className="nav-sub-item" to={href}>
            <i className={"zmdi zmdi-hc-fw " + icon}></i>
            <p>{ text }</p>
        </Link>
    );
}
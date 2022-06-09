import "../../styles/layout/nav-sub-item.scss";
import {Link} from 'react-router-dom';
import { closeSideBar } from "../../store/slices/layoutSlice";
import { useDispatch } from "react-redux";

export default function NavSubItem({icon, text, href}) {
    const dispatch = useDispatch();

    const handleClick = () => {
        if(window.innerWidth < 800) dispatch(closeSideBar());
    }

    return (
        <Link className="nav-sub-item" to={href} onClick={handleClick}>
            <i className={"zmdi zmdi-hc-fw " + icon}></i>
            <p>{ text }</p>
        </Link>
    );
}
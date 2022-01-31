import "../../styles/layout/nav-sub-item.scss";

export default function NavSubItem({icon, text, href}) {

    return (
        <a className="nav-sub-item" href={href}>
            <i className={"zmdi zmdi-hc-fw " + icon}></i>
            <p>{ text }</p>
        </a>
    );
}
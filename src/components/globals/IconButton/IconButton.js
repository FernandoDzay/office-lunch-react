import "./icon-button.scss";
import Loader from "../Loader/Loader";

export default function IconButton({color, icon, onClick, loading}) {

    const classes = ['icon-button', color].join(' ');

    if(loading) {
        return (
            <button className={classes + " loading"}>
                <Loader />
            </button>
        );
    }

    return (
        <button className={classes} onClick={onClick} >
            <i className={`zmdi zmdi-${icon}`}></i>
        </button>
    );

}
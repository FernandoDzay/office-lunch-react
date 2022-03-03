import "./button.scss";
import Loader from "../Loader/Loader";

export default function Button({color, icon, text, onClick, loading}) {

    const classes = ['button', color].join(' ');

    if(loading) {
        return (
            <button className={classes + " loading"}>
                <Loader />
            </button>
        );
    }

    return (
        <button className={classes} onClick={onClick} >
            {text}
            <i className={`zmdi zmdi-${icon}`}></i>
        </button>
    );

}
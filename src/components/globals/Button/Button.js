import "./button.scss";
import Loader from "../Loader/Loader";

export default function Button({color, icon, adjustIcon, children, onClick, loading}) {
    const classes = ['button', color];

    if(loading) {
        return (
            <button className={classes.join(' ') + " loading"}>
                <Loader />
            </button>
        );
    }

    if(adjustIcon) classes.push('adjust-icon');
    return (
        <button className={classes.join(' ')} onClick={onClick} >
            {children}
            <i className={`zmdi zmdi-${icon}`}></i>
        </button>
    );
}
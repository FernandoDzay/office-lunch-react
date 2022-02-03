import "./button.scss";

export default function Button({color, icon, text, onClick}) {

    const classes = ['button', color].join(' ');

    return (


        <button className={classes} onClick={onClick} >
            {text}
            <i className={`zmdi zmdi-${icon}`}></i>
        </button>

    );

}
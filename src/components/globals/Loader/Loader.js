import "./loader.scss";

export default function Loader({color, size, withContainer}) {

    const classes = ['loader'];
    const sizeClass = size ? `x${size}` : 'x1';
    
    if(color) classes.push(color);
    classes.push(sizeClass);


    return (
        withContainer ? 
            <div className={`loader-container ${sizeClass}`} >
                <div className={classes.join(' ')}></div>
            </div>
        :
            <div className={classes.join(' ')}></div>
    );
}
import "./loader.scss";

export default function Loader({color, size}) {

    const classes = ['loader'];
    const sizeClass = size ? `x${size}` : 'x1';
    
    if(color) classes.push(color);
    classes.push(sizeClass);


    return <div className={classes.join(' ')}></div>;
}
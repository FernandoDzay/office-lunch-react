export default function Notification({title, text, time, type, hasBeenRead}) {

    const classes = ['notification'];

    classes.push(type);
    if(!hasBeenRead) classes.push('has-not-been-read');
    
    return (
        <div className={classes.join(' ')}>
            <div className="left">
                <div className={`icon-container ${type}`}>
                    <i className="zmdi zmdi-alert-octagon red"></i>
                </div>
            </div>
            <div className="right">
                <h4 className="title">{ title }</h4>
                <p className="text">{ text }</p>
                <span className="time">{ time }</span>
            </div>
        </div>
    );
}
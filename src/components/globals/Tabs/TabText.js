
export default function TabText({id, handleClick, text, active, hasEventClick}) {

    const onClick = () => {
        handleClick(id);
    }

    const className = active ? "active" : "";


    if(hasEventClick) return <div className="tab-text">{ text }</div>;

    return (
        <div onClick={onClick} className={`tab-text with-onclick ${className}`}>
            {text}
        </div>
    );
}
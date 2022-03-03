import Loader from "../Loader/Loader";

export default function Button({onClick, text, loading}) {

    if(loading) {
        return (
            <button className="submit-button loading" onClick={onClick}>
                <Loader />
            </button>
        );
    }

    return (
        <button className="submit-button" onClick={onClick}>
            <span>{text}</span>
        </button>
    );
}
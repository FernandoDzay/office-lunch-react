import Loader from "../../Loader/Loader";

export default function Button({onClick, text, loading}) {

    return (
        loading ? 
            <button className="submit-button loading" onClick={onClick}>
                <Loader />
            </button>
        :
            <button className="submit-button" onClick={onClick}>
                <span>{text}</span>
            </button>
    );
}